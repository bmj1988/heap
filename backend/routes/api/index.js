const router = require('express').Router();
const { restoreUser, requireAuth, setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const shopsRouter = require('./shops.js')
const listingRouter = require('./listings.js')
const messageRouter = require('./messages.js')
const bidsRouter = require('./bids.js')


//You can use requireAuth as middleware for routes that require sign in
//You can use setTokenCookie as a func to set cookie for user

router.use(restoreUser);

/// This is the first point at which we can parse a User.owner or User.agent
/// All routes that differentiate between the two should diverge here.


router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/shops', shopsRouter);
router.use('/listings', listingRouter)
router.use('/messages', messageRouter)
router.use('/bids', bidsRouter)


// Restore user
router.get('/restore-user', (req, res) => {
    return res.json(req.user);
});

module.exports = router;
