const CustomError = require('./custom-error');

class NotAuthorizedError extends CustomError {
    statusCode = 401;

    constructor(message) {
        super('Not Authorized');
        this.message = message;
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message || 'Not Authorized' }];
    }
}

module.exports = NotAuthorizedError;