const express = require('express')
const { ShopReview, Message, ClosedListing, sequelize } = require('../../db/models')
const { authOwner } = require('../../utils/auth')

const router = express.Router()
router.use(authOwner)
router.get('/home', async (req, res) => {
    const owner = req.owner
    const user = req.user

    const shops = await owner.getShops({
        include:
        {
            model: ShopReview,
            attributes: []
        },
        attributes: {
            include: [
                [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('ShopReviews.rating')), 2), 'avgRating'],
            ]
        },
        group: ['Shop.id'],
        raw: true
    })
    const listings = await owner.getListings({raw : true})
    const messages = await Message.findAll({
        where: {
            toId: user.id
        },
    })
    res.json({ shops, listings, messages })
})

router.get('/history', async (req, res) => {
    const owner = req.owner;
    const listings = await ClosedListing.findAll({
        where: {
            ownerId: owner.id
        },
        raw: true
    })

    res.json({ History: listings })
})


module.exports = router;
