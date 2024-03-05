const express = require('express')
const { Listing } = require('../../db/models');
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
        await listing.update({ highest: incomingOffer })
    }
    res.json({ msg: `Your bid of $${newBid.offer} has been placed.` })
})

/// OWNERS LISTINGS ROUTES

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
