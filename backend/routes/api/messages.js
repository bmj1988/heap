const express = require('express');
const { requireAuth, restoreUser } = require('../../utils/auth');
const router = express.Router();
const Sequelize = require('sequelize')
const { User, sequelize, Agent, Message, Bid } = require('../../db/models')
const Op = Sequelize.Op;


router.get('/replies/:bidId', requireAuth, async (req, res) => {
    const replies = await Bid.findByPk(req.params.bidId, {
        include: [{
            model: Agent,
            attributes: ['id', 'userId', 'name']
        },
        {
            model: Message
        }],
        order: [['createdAt', 'ASC']]
    })
    res.json(replies)
})

/// GET ALL CURRENT USERS MESSAGES (INBOX THUNK)
router.get('/', requireAuth, async (req, res) => {
    const user = await User.findByPk(parseInt(req.user.id))
    const inbox = await Message.findAll({
        where: {
            [Op.or]: [
                { fromId: user.id },
                { toId: user.id }
            ]
        },
        include: [{
            model: User,
            as: 'sender',
            attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: User,
            as: 'recipient',
            attributes: ['id', 'firstName', 'lastName']
        }],
        attributes: {
            exclude: ['updatedAt']
        },
    })

    res.json(inbox)
})

router.post('/send', requireAuth, async (req, res) => {
    const message = await Message.create({
        fromId: req.user.id,
        ...req.body
    }, { validate: true })
    res.json(message)
})

router.delete('/:messageId', requireAuth, async (req, res) => {
    const doomedMessage = await Message.findByPk(req.params.messageId)
    if (req.user.id === doomedMessage.toId) {
        await doomedMessage.destroy();
        res.json({ message: 'Successfully deleted' })
    }
    else {
        res.status(401).json({ message: 'You are not authorized to delete this message' })
    }
})



module.exports = router;
