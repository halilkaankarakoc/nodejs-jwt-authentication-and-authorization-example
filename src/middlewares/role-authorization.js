const NotAuthorizedError = require('../errors/not-authorized-error');
const constants = require('../constants');

const roleAuthorization = role => (req, res, next) => {
    const { role: userRole } = req.currentUser;
    if (userRole === constants.roles.ADMIN) {
        return next();
    }
    if (userRole === role) {
        return next();
    }

    throw new NotAuthorizedError(`Your role must be '${role}' to access this route`);
}

module.exports = roleAuthorization;