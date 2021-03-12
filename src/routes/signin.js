const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validate-request');
const BadRequestError = require('../errors/bad-request-error');
const User = require('../models/user');
const Password = require('../utils/password');
const syncUserSession = require('../utils/syncUserSession');

router.post(
    '/api/user/signin/',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password'),
    ],
    validateRequest,
    async (req, res) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new BadRequestError('Invalid credentials');
        }

        const passwordsMatch = await Password.compare(
            existingUser.password,
            password
        );
        if (!passwordsMatch) {
            throw new BadRequestError('Invalid Credentials');
        }

        syncUserSession(req, existingUser);

        res.status(200).send(existingUser);
    });

module.exports = router;