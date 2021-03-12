const NotAuthorizedError = require('../errors/not-authorized-error');
const constants = require('../constants');

const levelAuthorization = level => (req, res, next) => {
    const { role: userRole, level: userLevel } = req.currentUser;
    if (userRole === constants.roles.ADMIN) {
        return next();
    }
    if (userLevel >= level) {
        return next();
    }

    throw new NotAuthorizedError(`Your level must be greater than '${level}' to access this route`);
}

module.exports = levelAuthorization;