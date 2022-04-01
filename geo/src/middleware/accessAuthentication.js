const { decodeToken } = require("../utils/decodeToken");
const { AuthenticationError, CustomError } = require("../errors");
const ErrorMessage = require("../errors/ErrorMessage");

const accessAuthentication = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new AuthenticationError(null, ErrorMessage.TOKEN_NOT_EXIST);
    }
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = await decodeToken(token, process.env.ADMIN_KEY);

    if (decodedToken) {
      req.body.decodedAccessToken = decodedToken;
    }
    return next();
  } catch (err) {
    if (err instanceof CustomError) {
      return next(err);
    }
    return next(new AuthenticationError(err, err));
  }
};

module.exports = { accessAuthentication };
