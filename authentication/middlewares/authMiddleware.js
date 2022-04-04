const passport = require('passport')
const AppError = require(`${base}/errors/appError`)

const authenticatePassport = (strategy, req, res, next) =>
  passport.authenticate(strategy, {session: false}, (err, info, message) => {
    if (err) next(AppError.JWTError(err.message))
    else if (!info) next(AppError.verificationError(message.message))
    else {
      req.user = info
      next()
    }
  })
const verifyAccessToken = (req, res, next) => {
  authenticatePassport('access', req, res, next)(req, res, next)
}
const verifyRefreshToken = (req, res, next) => {
  authenticatePassport('refresh', req, res, next)(req, res, next)
}

module.exports = {
  verifyAccessToken,
  verifyRefreshToken,
}
