const express = require('express');
const { authAgent } = require('../../utils/auth');
const router = express.Router();
const { Listing, Bid, Agent, sequelize } = require('../../db/models')
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
    res.json({msg: "Successfully deleted"})
})
module.exports = router;
