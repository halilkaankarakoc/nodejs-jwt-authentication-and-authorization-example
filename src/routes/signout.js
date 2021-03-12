const router = require('express').Router();

router.post('/api/user/signout', (req, res) => {
    req.session = null;
    res.send({});
});

module.exports = router;