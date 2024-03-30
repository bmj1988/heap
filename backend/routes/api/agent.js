const express = require('express')
const { Shop, Listing, User, Message, Agent, Bid } = require('../../db/models')
const { authAgent } = require('../../utils/auth')

const router = express.Router();
router.use(authAgent)

router.get('/home', async (req, res) => {
    const user = req.user
    const home = await User.findByPk(user.id, {
        include: [
            {
                model: Message,
                as: 'Recipient',
            },
            {
                model: Agent,
                include: {
                    model: Bid,
                    required: false,
                    where: { accepted: true },
                    include: {
                        model: Listing,
                        include: {
                            model: Shop
                        }
                    }
                }
            }
        ]
    })

    res.json(home)

})


module.exports = router;
