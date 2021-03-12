const jwt = require('jsonwebtoken');

const syncUserSession = (req, user) => {
    const userJwt = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
            level: user.level
        },
        process.env.JWT_KEY
    );

    req.session = {
        jwt: userJwt
    };
};

module.exports = syncUserSession;