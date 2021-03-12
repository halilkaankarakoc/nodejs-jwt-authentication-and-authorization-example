const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const requireAuthentication = require('../middlewares/require-authentication');
const levelAuthorization = require('../middlewares/level-authorization');
const syncUserSession = require('../utils/syncUserSession');

router.post(
    '/api/user/:id/upgrade',
    requireAuthentication,
    levelAuthorization(10),
    async (req, res) => {
        const id = req.params.id;
        const user = await User.findOneAndUpdate({ _id: id }, { $set: { role: 'admin' } }, { new: true, useFindAndModify: false },)

        syncUserSession(req, user);
        res.status(200).send(user);
    });

module.exports = router;