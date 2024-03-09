const express = require('express')
const { Listing, Bid, Shop, Agent, sequelize } = require('../../db/models');
const { authAgent, authOwner } = require('../../utils/auth');
const { listingAuth } = require('../../utils/listingMiddleware')

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
        }]
    })

    res.json(listings)
})

/// AGENTS LISTINGS ROUTES
agentListings = Listing.scope('defaultScope', 'agentView')

/// AGENTS LISTING FEED

router.get('/feed', authAgent, async (req, res) => {
    const query = {};

    query.limit = req.query.size || 20
    query.size = req.query.size * (req.query.page - 1) || 20

    const listings = await agentListings.findAll()

    res.json(listings)
})

/// GET LISTING DETAILS

router.get('/:listingId', listingAuth, async (req, res) => {
    const user = req.user;
    if (user.agent) {
        const listing = await agentListings.findByPk(req.params.listingId)
        res.json(listing)
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

/// OWNERS LISTINGS ROUTES

router.post('/new', authOwner, async (req, res, next) => {
    const owner = req.owner
    const { shopId } = req.body
    if (shopId) {
        const newListing = await Listing.create({ ...req.body, ownerId: owner.id })
        return res.json(newListing)
    }
    else {
        const tsx = sequelize.transaction();
        try {

            const { address, city, state, image, price, description } = req.body
            const newShop = await Shop.create({ address, city, state, ownerId: owner.id }, { transaction: tsx })
            const newListing = await newShop.createListing({ image, price, description, ownerId: owner.id }, { transaction: tsx })

            await tsx.commit()

            res.json(newListing)
        }
        catch (e) {
            await tsx.rollback()
            return next(e)
        }
    }
})

router.get('/history', authOwner, async (req, res) => {
    const owner = req.owner;
    const listings = await Listing.scope("history").findAll({
        where: {
            ownerId: owner.id
        }
    })

    res.json({ History: listings })
})


///GET INFO FOR A LISTING - OWNER
router.get('/:listingId/bids', authOwner, async (req, res) => {
    const listingId = req.params.listingId;
    const listingWithBids = await Listing.findByPk(listingId, {
        include: [
            {
                model: Bid,
            }
        ]
    })
    res.json(listingWithBids)
})

router.delete('/:listingId', [authOwner, listingAuth], async (req, res) => {
    const owner = req.owner
    const listing = req.listing
    if (owner.id === listing.ownerId) await listing.destroy()
    res.json({ msg: "Successfully deleted" })

})

router.put('/:listingId', [authOwner], async (req, res, next) => {
    const owner = req.owner
    const { address, city, state, price, image, description } = req.body
    const listing = await Listing.findByPk(req.params.listingId, {
        include: {
            model: Shop,
            attributes: ['name', 'address', 'city', 'state', 'phone']
        }
    })
    if (owner.id === listing.ownerId) {
        const tsx = await sequelize.transaction();

        try {

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

                await listing.update({ shopId: newLocation.id, price, image, description }, { transaction: tsx })
                await tsx.commit()
                res.json(listing)
            }
            else {
                await listing.update({ price, image, description, seen: true })
                tsx.commit()
                res.json(listing)
            }

        }
        catch (e) {
            await tsx.rollback();
            next(e)
        }
    }

    else {
        res.status(401).json({ msg: "You are not the owner of this listing." })
    }
})

module.exports = router;
