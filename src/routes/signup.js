const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validate-request');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const syncUserSession = require('../utils/syncUserSession');

router.post(
    '/api/user/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be between 4 and 20 characters')
    ],
    validateRequest,
    async (req, res) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        const user = User.build({ email, password, role: 'standard', level: 0 });
        await user.save();

        syncUserSession(req, user);

        res.status(201).send(user);
    });

module.exports = router;