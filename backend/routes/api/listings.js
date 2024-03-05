const express = require('express')
const { Listing } = require('../../db/models');
const { authAgent, authOwner } = require('../../utils/auth');

const router = express.Router();

router.get('/feed', authAgent, async (req, res) => {
    const query = {};

    query.limit = req.query.size || 20
    query.size = req.query.size * (req.query.page - 1) || 20

    const listings = await Listing.findAll({ where: { open: true } })

    res.json(listings)
})


/// Retrieves all a users past listings

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

router.get('/:listingId/bids', authOwner, async (req, res) => {
    const listingId = req.params;
    const listingWithBids = await Listing.findByPk(listingId, {
        include: [
            {
                model: Bid,
            }
        ]
    })
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
