const express = require('express')
const { Listing, Bid, Shop, Agent, Message, Image, ClosedListing, sequelize } = require('../../db/models');
const { authAgent, authOwner } = require('../../utils/auth');
const { listingAuth } = require('../../utils/listingMiddleware')
const { Op, Sequelize } = require('sequelize');
const { singlePublicFileUpload, singleMulterUpload, multipleMulterUpload, multiplePublicFileUpload, deleteSingleFile, deleteMultipleFiles } = require('../../awsS3');

const router = express.Router();

router.get('/open', authOwner, async (req, res) => {
    const owner = req.owner;
    const listings = await owner.getListings({
        include: [{
            model: Shop,
            attributes: ['name', 'address', 'city', 'state', 'phone']
        },
        {
            model: Bid,
            include: [
                {
                    model: Agent
                }
            ]
        },
        {
            model: Image
        }]
    })

    res.json(listings)
})

/// AGENTS LISTINGS SCOPE
const agentListings = Listing.scope('agentView')

/// AGENTS LISTING FEED

router.get('/feed', authAgent, async (req, res) => {
    const agent = req.agent
    const query = {};
    query.limit = req.query.size || 5
    query.offset = req.query.size * (req.query.page - 1) || 0
    query.order = [['createdAt', 'ASC']]
    const bids = await agent.getBids({
        attributes: ['listingId'],
        raw: true
    });

    const listingIds = bids.map((bid) => bid.listingId)
    // const schema = process.env.NODE_ENV === "production" ? `"${process.env.SCHEMA}"` : ""

    // where: Sequelize.literal(`NOT EXISTS (
    //     SELECT 1
    //     FROM ${schema}."Bids" as bids
    //     WHERE
    //     bids."listingId" = ${schema}."Listing"."id"
    //     AND bids."agentId" = ${agent.id}
    // ) AND ${schema}."Listing"."open" = true`)
    // WORKS IN LOCAL BUT THROWS INVALID REFERENCE TO FROM-CLAUSE ENTRY
    // LOOK BACK AT SQL COURSE AND RE-EXAMINE

    const { count, rows } = await Listing.findAndCountAll({
        where: {
            id: { [Op.notIn]: listingIds }
        },
        include: [{
            model: Image,
            attributes: ['url'],
            required: false,
        },
        {
            model: Shop,
            attributes: ['city', 'state']
        },
        {
            model: Bid,
            attributes: []
        }],
        ...query,
        distinct: true,
        raw: true
    })

    const details = { count: count, size: query.limit, page: req.query.page || 1 }
    res.json({ listings: rows, details })
})

/// GET LISTING DETAILS

router.get('/:listingId', listingAuth, async (req, res) => {
    const user = req.user;
    if (user.agent) {
        const listing = await Listing.findByPk(req.params.listingId, {
            include: [{
                model: Bid
            }, {
                model: Shop
            }, {
                model: Image
            }]
        })

        if (listing) {
            return res.json(listing)
        }
        else return res.status(401).json({ msg: "Error" })
    }

    const owner = req.owner
    const listing = await Listing.findOne({
        where: {
            id: req.params.listingId,
            ownerId: owner.id
        },
        include: [{
            model: Bid,
            include: {
                model: Agent
            }
        }, {
            model: Shop
        }, {
            model: Image
        }]
    })
    if (listing) {
        res.json(listing)
    }
    else res.status(401).json({ msg: "Error" })
})

/// AGENTS POST A BID TO A LISTING

router.post('/:listingId/bids', [authAgent, listingAuth], async (req, res) => {
    const listing = req.listing
    const agent = req.agent
    const newBid = await agent.createBid({ ...req.body, listingId: parseInt(listing.id) }, { validate: true })
    const currentHigest = listing.highest
    const incomingOffer = newBid.offer
    if (incomingOffer > currentHigest) {
        await listing.update({ highest: parseInt(incomingOffer), seen: false })
    }
    res.json({ msg: `Your bid of $${newBid.offer} has been placed.` })
})


/// CREATE NEW LISTING

router.post('/new', [authOwner, multipleMulterUpload('images')], async (req, res, next) => {
    const owner = req.owner
    const { shopId } = req.body
    let images;
    if (req.files) {
        const response = await multiplePublicFileUpload(req.files)
        images = Object.values(response)
    }

    const tsx = await sequelize.transaction();

    try {
        if (shopId) {
            const newListing = await Listing.create({ ...req.body, ownerId: owner.id }, { transaction: tsx })
            if (images) {
                let imageArray = []
                for (let key in images) {
                    imageArray.push({ url: images[key], listingId: newListing.id })
                }
                await Image.bulkCreate(imageArray, { transaction: tsx })
            }
            await tsx.commit();
            return res.json(newListing)
        }

        else {
            const { address, city, state, price, description } = req.body
            const newShop = await Shop.create({ address, city, state, ownerId: owner.id }, { transaction: tsx, validate: true })
            const newListing = await newShop.createListing({ price, description, ownerId: owner.id }, { transaction: tsx })
            if (images) {
                let imageArray = []
                for (let key in images) {
                    imageArray.push({ url: images[key], listingId: newListing.id })
                }
                await Image.bulkCreate(imageArray, { transaction: tsx })
            }

            await tsx.commit()
            res.json(newListing)
        }

    }
    catch (e) {
        await tsx.rollback()
        if (images) deleteMultipleFiles(Object.values(images))
        return next(e)
    }
})

/// CLOSE A LISTING - OWNER
router.delete('/:listingId/close', [authOwner, listingAuth], async (req, res, next) => {
    const owner = req.owner
    const listing = req.listing
    if (owner.id === listing.ownerId) {
        const tsx = await sequelize.transaction();
        try {
            const winningBid = await Bid.findOne({
                where: {
                    [Op.and]: [{ listingId: listing.id },
                    { accepted: true }]
                }
            }, { transaction: tsx })
            await ClosedListing.create({ shopId: listing.shopId, ownerId: listing.ownerId, winningBid: winningBid.offer, agentId: winningBid.agentId, listedOn: listing.createdAt }, { transaction: tsx })
            await listing.destroy({ transaction: tsx });
            await tsx.commit()
            res.json({ msg: "Listing closed" })
        }
        catch (e) {
            await tsx.rollback();
            next(e)
        }
    }
    else res.status(401).json({ errors: "This listing does not belong to you." })
})

/// DELETE A LISTING - NO SALE
router.delete('/:listingId', [authOwner, listingAuth], async (req, res) => {
    const owner = req.owner
    const listing = req.listing
    if (owner.id === listing.ownerId) await listing.destroy()
    res.json({ msg: "Successfully deleted" })

})

/// EDIT A LISTING
router.put('/:listingId', [authOwner, multipleMulterUpload('images')], async (req, res, next) => {
    const owner = req.owner
    const { address, city, state, price, description } = req.body
    let { deletedImages } = req.body
    console.log(deletedImages)
    let images;

    if (req.files) {
        const response = await multiplePublicFileUpload(req.files)
        images = Object.values(response)
    }

    const listing = await Listing.findByPk(req.params.listingId, {
        include: {
            model: Shop,
            attributes: ['name', 'address', 'city', 'state', 'phone']
        }
    })


    if (owner.id === listing.ownerId) {
        const tsx = await sequelize.transaction();

        try {
            if (deletedImages) {
                await Image.destroy({
                    where: {
                        url: { [Op.in]: deletedImages }
                    }
                }, { transaction: tsx })
                deleteMultipleFiles(deletedImages)
            }

            if (listing.Shop.address.toLowerCase() !== address.toLowerCase()) {

                const [newLocation, created] = await Shop.findOrCreate({
                    where:
                    {
                        ownerId: owner.id,
                        address,
                        city,
                        state
                    },
                    transaction: tsx
                })

                if (images) {
                    let imageArray = []
                    for (let key in images) {
                        imageArray.push({ url: images[key], listingId: listing.id })
                    }
                    await Image.bulkCreate(imageArray, { transaction: tsx })
                }
                await listing.update({ shopId: newLocation.id, price, description }, { transaction: tsx })
                await tsx.commit()
            }
            else {
                await listing.update({ price, description, seen: true })
                if (images) {
                    let imageArray = []
                    for (let key in images) {
                        imageArray.push({ url: images[key], listingId: listing.id })
                    }
                    await Image.bulkCreate(imageArray, { transaction: tsx })
                }
                await tsx.commit()
            }

            const returnListing = await Listing.findByPk(req.params.listingId, {
                include: [{
                    model: Shop,
                    attributes: ['name', 'address', 'city', 'state', 'phone']
                },
                {
                    model: Bid,
                    include: [
                        {
                            model: Agent
                        }
                    ]
                },
                { model: Image }]
            })

            res.json(returnListing)
        }
        catch (e) {
            await tsx.rollback();
            if (images) deleteMultipleFiles(Object.values(images))
            next(e)
        }
    }

    else {
        res.status(401).json({ msg: "You are not the owner of this listing." })
    }
})

module.exports = router;
