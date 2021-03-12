const router = require('express').Router();
const currentUser = require('../middlewares/current-user');

router.get('/api/user/currentuser', currentUser, (req, res) => {
    res.send({ currentUser: req.currentUser || {} });
});

module.exports = router;