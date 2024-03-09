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
            model: Listing.scope('defaultScope', 'agentView')
        }
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
        include: {
            model: Listing,
            include: {
                model: Shop,
                attributes: ['address', 'city', 'state']
            }
        }
    })
    await bid.update({
        accepted: true
    })
    console.log(bid)
    const shop = bid.Listing.Shop
    const newMessage = await Message.create({ toId: bid.agentId, fromId: owner.id, bidId: bid.id, content: `Your bid has been accepted. The listing is available for pickup at ${shop.address}, ${shop.city}, ${shop.state}` })
    res.json({msg: "Bid Accepted"})
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
