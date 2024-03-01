const express = require('express')
const { Shop, User, ShopReview, Owner, Listing, sequelize } = require('../../db/models')
const { requireAuth, authShop } = require('../../utils/auth')

const router = express.Router()

router.get('/home', requireAuth, async (req, res) => {
    const owner = req.owner
    const shops = await owner.getShops({
        include: [
            {
                model: Listing
            },
            {
                model: ShopReview,
                attributes: []
            }
        ],
        attributes: {
            include: [
                [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('ShopReviews.rating')), 2), 'avgRating'],
            ]
        },
        group: ['Shop.id', "Listings.id"]
    })
    res.json({ Shops: shops })
})

router.get('/:shopId', authShop, async (req, res) => {
    res.json(req.shop)
})

router.put('/:shopId', authShop, async (req, res, next) => {
    const shop = req.shop

    try {
        await shop.update(req.body, { validate: true })
    }
    catch (e) {
        return next(e)
    }
    res.json(shop)
})

router.delete('/:shopId', authShop, async (req, res) => {
    const shop = req.shop
    await shop.destroy()
    res.json({message: "Successfully deleted."})
})


module.exports = router;
