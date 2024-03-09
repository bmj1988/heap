const express = require('express')
const { Shop, User, ShopReview, Owner, Message, Listing, sequelize } = require('../../db/models')
const { requireAuth, authShop, authOwner } = require('../../utils/auth')

const router = express.Router()

router.get('/home', authOwner, async (req, res) => {
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
        group: ['Shop.id']
    })
    const listings = await owner.getListings()
    const messages = await Message.findAll({
        where: {
            toId: user.id
        }
    })
    res.json({shops, listings, messages})
})


module.exports = router;
