const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Owner, Agent } = require('../../db/models');

const router = express.Router();

// Sign up
router.post('/', async (req, res) => {

    const { email, password, firstName, lastName, owner, agent } = req.body;

    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, hashedPassword, firstName, lastName });

    if (owner) {
        owner = await Owner.create({userId: user.id})
        await user.update({owner: true})
    }
    else if (agent) {
        agent = await Agent.create({userId: user.id, city: '', state: ''})
        await user.update({agent: true})
    }

    const safeUser = {
        id: user.id,
        email: user.email,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
});

// Restore session user
router.get('/', (req, res) => {
    const { user } = req;
    if (user) {
        const safeUser = {
            id: user.id,
            email: user.email,
        };
        return res.json({
            user: safeUser
        });
    } else return res.json({ user: null });
});


module.exports = router;
