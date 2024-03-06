const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Owner, Agent, sequelize } = require('../../db/models');

const router = express.Router();

// Sign up
router.post('/', async (req, res, next) => {

    const { email, password, firstName, lastName, owner, agent, city, state, license } = req.body;

    const hashedPassword = bcrypt.hashSync(password);
    const tsx = await sequelize.transaction();

    const user = await User.create({ email, hashedPassword, firstName, lastName }, { transaction: tsx });

    try {
        if (owner) {
            await Owner.create({ userId: user.id }, { transaction: tsx })
            await user.update({ owner: true }, { transaction: tsx })
        }

        else if (agent) {
            await Agent.create({ userId: user.id, city, state, license }, { transaction: tsx })
            await user.update({ agent: true }, { transaction: tsx })
        }

        await tsx.commit();

        const safeUser = {
            id: user.id,
            email: user.email,
            agent: user.agent,
            owner: user.owner
        };

        await setTokenCookie(res, safeUser);

        return res.json({
            safeUser
        });
    }

    catch (e) {
        await tsx.rollback();

        return next(e)
    }


});

// Restore session user
router.get('/', (req, res) => {
    const { user } = req;
    if (user) {
        const safeUser = {
            id: user.id,
            email: user.email,
            agent: user.agent,
            owner: user.owner
        };
        return res.json({
            safeUser
        });
    } else return res.json(null);
});


module.exports = router;
