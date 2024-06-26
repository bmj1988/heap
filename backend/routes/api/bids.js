const express = require('express');
const { authAgent, authOwner } = require('../../utils/auth');
const router = express.Router();
const { Listing, Bid, Shop, Agent, Message, sequelize } = require('../../db/models')
const { Op } = require('sequelize');
const { bidAuth } = require('../../utils/bidMiddleware');


/// ALL OPEN BIDS

router.get('/open', authAgent, async (req, res) => {
    const agent = req.agent
    const openBids = await agent.getBids({
        include: {
            model: Listing.scope('agentView'),
            include: {
                model: Shop,
                attributes: ['city', 'state']
            }
        },
        raw: true

    })

    res.json(openBids)
})

/// BID HISTORY

router.get('/history', authAgent, async (req, res) => {
    const agent = req.agent
    const wonBids = await agent.getBids({
        include: {
            model: Listing.scope('agentView')
        },
        where: {
            accepted: true
        }
    })

    res.json(wonBids)
})

/// ACCEPT BID

router.patch('/:bidId', authOwner, async (req, res) => {
    /// add in security measure to authenticate this owner owns the listing
    const owner = req.owner
    const { bidId } = req.params
    const bid = await Bid.findByPk(bidId, {
        include: [{
            model: Listing,
            include: {
                model: Shop,
                attributes: ['address', 'city', 'state']
            }
        },
        {
            model: Agent
        }]
    })
    await bid.update({
        accepted: true,
        acceptedOn: new Date()
    })
    const listing = bid.Listing
    const shop = listing.Shop
    await listing.update({ open: false, highest: bid.offer })
    await Message.create({ toId: bid.Agent.userId, fromId: owner.userId, bidId: bid.id, content: `Your bid for listing ${bid.Listing.id} has been accepted. The listing is available for pickup at ${shop.address}, ${shop.city}, ${shop.state}` })
    res.json({ msg: "Bid Accepted" })
})

/// REVOKE BID

router.patch('/:bidId/revoke', authOwner, async (req, res) => {
    const bid = await Bid.findByPk(req.params.bidId)
    await bid.update({ accepted: false })
    res.json(bid)
})

/// EDIT BID

router.put('/:bidId', [authAgent, bidAuth], async (req, res) => {
    const bid = req.bid
    await bid.update(req.body)
    res.json(bid)
})

/// DELETE Bid from Listing

router.delete('/:bidId', [authAgent, bidAuth], async (req, res) => {
    const bid = req.bid
    await bid.destroy()
    res.json({ msg: "Successfully deleted" })
})
module.exports = router;
