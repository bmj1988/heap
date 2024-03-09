const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User, Shop, Owner, Agent, Listing, ShopReview, sequelize } = require('../db/models');

const { secret, expiresIn } = jwtConfig;


// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    const safeUser = {
        id: user.id,
        email: user.email
    };
    const token = jwt.sign(
        { data: safeUser },
        secret,
        { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token;
};

const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.findByPk(id, {
                attributes: {
                    include: ['email', 'createdAt', 'updatedAt', 'owner', 'agent']
                }
            });

            if (req.user.owner) {
                req.owner = await Owner.findOne({
                    where: {
                        userId: req.user.id
                    }
                })
            }
            else if (req.user.agent) {
                req.agent = await Agent.findOne({
                    where: {
                        userId: req.user.id
                    }
                })
            }

        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();
    });
};

// If there is no current user, return an error
const requireAuth = function (req, _res, next) {
    if (req.user) return next();

    const err = new Error('Authentication required');
    err.title = 'Authentication required';
    err.errors = { message: 'Authentication required' };
    err.status = 401;
    return next(err);
}

const authOwner = (req, res, next) => {
    if (req.owner) return next();

    const err = new Error('User is not an owner');
    err.title = 'Authentication required';
    err.errors = { message: 'Authentication required' };
    err.status = 401;
    return next(err);
}

const authAgent = (req, res, next) => {
    if (req.agent) return next();

    const err = new Error('User is not an agent');
    err.title = 'Authentication required';
    err.errors = { message: 'Authentication required' };
    err.status = 401;
    return next(err);
}

/// SHOP AUTH


const authShop = async (req, res, next) => {
    const shop = await Shop.findByPk(req.params.shopId, {
        include: [
            {
                model: Listing
            },
            {
                model: ShopReview,

                attributes: ['rating', 'message']
            }
        ],
        attributes: {
            include: [
                [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('ShopReviews.rating')), 2), 'avgRating'],
            ]
        },
        group: ['Shop.id', "Listings.id", "ShopReviews.id"]
    })
    if (!shop) return res.status(404).json({ message: "Shop not found" })
    else if (!req.owner || req.owner.id !== shop.ownerId) {
        const err = new Error('Authorization required');
        err.title = 'Authorization required';
        err.errors = { message: 'You are not authorized to access this resource.' };
        err.status = 401;
        return next(err);
    }
    else {
        req.shop = shop
        return next()
    }


}

module.exports = { setTokenCookie, restoreUser, requireAuth, authShop, authAgent, authOwner };
