const router = require('express').Router();
const { restoreUser, requireAuth, setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const shopsRouter = require('./shops.js')
const listingRouter = require('./listings.js')
const messageRouter = require('./messages.js')
const bidsRouter = require('./bids.js')
const vendorsRouter = require('./vendor.js')
const agentRouter = require('./agent.js')

//You can use requireAuth as middleware for routes that require sign in
//You can use setTokenCookie as a func to set cookie for user

router.use(restoreUser);

/// This is the first point at which we can parse a User.owner or User.agent
/// All routes that differentiate between the two should diverge here.


router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/shops', shopsRouter);
router.use('/listings', listingRouter);
router.use('/messages', messageRouter);
router.use('/bids', bidsRouter);
router.use('/vendor', vendorsRouter);
router.use('/agent', agentRouter);


// Restore user
router.get('/restore-user', (req, res) => {
    return res.json(req.user);
});

router.get('/agent-profile/:agentId', async (req, res) => {
    const profile = await Agent.findByPk(req.params.agentId, {
        include: [{
            model: User,
            attributes: ['profileImg']
        },
        {
            model: AgentReview,
            attributes: [],
        }],

        attributes: {
            include: [
                [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('AgentReviews.rating')), 2), 'avgRating'],
                [sequelize.fn('COUNT', sequelize.fn('AVG', sequelize.col('AgentReviews.rating'))), 'numReview']
            ]
        },
        raw: true
    })
    return res.json(profile)
})

/// Experimented with trying to get a loader function that would auto-redirect if you didn't have permissions
/// couldn't get redirect off the ground (never can) and wonder what is so strange about my setup
/// or understanding that I can't make that simple hook work.

// router.get('/agent-check', (req, res) => {
//     if (req.user.agent) res.json({ msg: "ok" })
//     else res.status(404).json({ msg: "no agent found" })
// });

// router.get('/vendor-check', (req, res) => {
//     if (req.user.owner) res.json({msg: "ok"})
//     else res.status(404).json({msg: "no vendor found"})
// })

module.exports = router;
