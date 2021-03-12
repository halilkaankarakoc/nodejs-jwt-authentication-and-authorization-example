const router = require('express').Router();
const constants = require('../constants');
const roleAuthorization = require('../middlewares/role-authorization');
const requireAuthentication = require('../middlewares/require-authentication');


router.post('/api/protectedRoute2',
    requireAuthentication,
    roleAuthorization(constants.roles.ADMIN),
    (req, res) => {
        res.send({ message: 'You accessed to protectedRoute2' });
    }
);

module.exports = router;