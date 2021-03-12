const router = require('express').Router();
const User = require('../models/user');
const requireAuthentication = require('../middlewares/require-authentication');
const syncUserSession = require('../utils/syncUserSession');

router.post(
    '/api/user/:id/level',
    requireAuthentication,
    async (req, res) => {
        const id = req.params.id;
        const { level: userLevel } = req.currentUser;
        const user = await User.findOneAndUpdate({ _id: id }, { $set: { level: userLevel + 1 } }, { new: true, useFindAndModify: false },)

        syncUserSession(req, user);
        res.status(200).send(user);
    }
);

module.exports = router;