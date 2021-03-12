const router = require('express').Router();
const constants = require('../constants');
const levelAuthorization = require('../middlewares/level-authorization');
const requireAuthentication = require('../middlewares/require-authentication');

router.post('/api/protectedRoute1',
    requireAuthentication,
    (req, res) => {
        res.send({ message: 'You accessed to protectedRoute1.' });
    });

module.exports = router;