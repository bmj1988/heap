const express = require('express')
const { Listing, sequelize } = require('../../db/models');
const { authAgent, authOwner } = require('../../utils/auth');
const { listingAuth } = require('../../utils/listingMiddleware')

const router = express.Router();

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

/// AGENTS GET LISTING INFO

router.get('/:listingId', [authAgent, listingAuth], async (req, res) => {
    const listing = await agentListings.findByPk(req.params.listingId)

    res.json(listing)
})

/// AGENTS POST A BID TO A LISTING

router.post('/:listingId/bids', [authAgent, listingAuth], async (req, res) => {
    const listing = req.listing
    const agent = req.agent
    const newBid = await agent.createBid(req.body, { validate: true })
    const currentHigest = listing.highest
    const incomingOffer = newBid.offer
    if (incomingOffer > currentHigest) {
        await listing.update({ highest: incomingOffer, seen: false })
    }
    res.json({ msg: `Your bid of $${newBid.offer} has been placed.` })
})

/// OWNERS LISTINGS ROUTES

router.post('/new', authOwner, async (req, res, next) => {
    const owner = req.owner
    const { shopId } = req.body
    if (shopId) {
        const newListing = await Listing.create(req.body)
        return res.json(newListing)
    }
    else {
        const tsx = sequelize.transaction();
        try {

            const { address, city, state, image, price, description } = req.body
            const newShop = await Shop.create({ address, city, state, ownerId: owner.id }, { transaction: tsx })
            const newListing = await newShop.createListing({ image, price, description }, { transaction: tsx })

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
    const history = []
    const listings = await owner.getShops({
        attributes: [],
        include: [{
            model: Listing.scope("history"),
        }]
    })
    for (let x of listings) {
        for (let listing of x.Listings) {
            history.push(listing)
        }
    }
    res.json({ History: history })
})


///GET INFO FOR A LISTING - OWNER
router.get('/:listingId/bids', authOwner, async (req, res) => {
    const listingId = req.params;
    const listingWithBids = await Listing.findByPk(listingId, {
        include: [
            {
                model: Bid,
            }
        ]
    })
    res.json(listingWithBids)
})


/// I don't know that I will need this, as it is rather inelegant
/// And at first glance I can imagine solving this problem in the
/// front end using the shops/home route, which returns all open
/// listings

router.get('/open', authOwner, async (req, res) => {
    const owner = req.owner;
    const open_listings = []
    const listings = await owner.getShops({
        attributes: [],
        include: [{
            model: Listing,
        }]
    })
    for (let x of listings) {
        for (let listing of x.Listings) {
            history.push(listing)
        }
    }
})

module.exports = router;
