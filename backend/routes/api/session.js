const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie } = require('../../utils/auth');
const { User, Agent } = require('../../db/models');

const router = express.Router();

// Log in
router.post('/', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.unscoped().findOne({
        where: {
            email
        },
        include: {
            model: Agent,
            required: false,
            attributes: ['id']
        },
    });

    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials were invalid.' };
        return next(err);
    }

    const safeUser = {
        id: user.id,
        email,
        owner: user.owner,
        agent: user.agent,
        firstName: user.firstName,
        Agent: user.Agent,
        lastName: user.lastName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        phone: user.phone,
    };

    await setTokenCookie(res, safeUser);

    return res.json(
        safeUser
    );
});

// Log out
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
});



module.exports = router;
