const { Bid } = require('../db/models')
const { Op } = require('sequelize')

const bidAuth = async (req, res, next) => {
    const agent = req.agent

    const bid = await Bid.findOne({
        where: {
            [Op.and]: {
                agentId: agent.id,
                id: req.params.bidId
            }
        }
    })
    if (bid) {
        req.bid = bid
        return next()
    }

    const err = new Error('Bid could not be found')
    err.title = "Bid not found"
    err.message = { msg: "Bid not found" }
    err.status = 404;
    return next(err)

}

module.exports = { bidAuth }
