const { CustomError } = require("./CustomError");
const ErrorMessage = require("./ErrorMessage");

class StopUserError extends CustomError {
  constructor(message, data) {
    super(message);
    this.statusCode = 403;
    this.clientMessage = ErrorMessage.STOP_USER_ERROR;
    this.data = data;
    Object.setPrototypeOf(this, StopUserError.prototype);
  }
  serializeErrors = function () {
    return this.clientMessage;
  };
}

module.exports = { StopUserError };
