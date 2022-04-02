const { CustomError } = require("./CustomError");
const ErrorMessage = require("./ErrorMessage");

class ForbiddenError extends CustomError {
  constructor(message, data) {
    super(message);
    this.statusCode = 403;
    this.clientMessage = ErrorMessage.FORBIDDEN_ERROR;
    this.data = data;
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
  serializeErrors = function () {
    return this.clientMessage;
  };
}

module.exports = { ForbiddenError };
