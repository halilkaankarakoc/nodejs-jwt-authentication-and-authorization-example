const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/not-authorized-error');

const requireAuthentication = (req, res, next) => {
    if (!req.session || !req.session.jwt) {
        throw new NotAuthorizedError('You must login!');
    }

    try {
        const payload = jwt.verify(
            req.session.jwt,
            process.env.JWT_KEY
        );
        req.currentUser = payload;
    } catch (err) { 
        next(new Error('Internal Error'));
    }

    next();
};

module.exports = requireAuthentication;