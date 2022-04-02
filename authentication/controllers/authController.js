const passport = require('passport')

const {catchAsync} = require(`${base}/utils`)
const AppError = require(`${base}/errors/appError`)
const authService = require(`${base}/services/authService`)

const createCode = catchAsync(async (req, res, next) => {
  const phoneNumber = req.body.phoneNumber
  const verficiationCode = await authService.createCode(phoneNumber)

  await authService.sendCode(phoneNumber, verficiationCode)
  return res.status(200).json({
    status: 'SUCCESS',
    message: '인증코드를 전송했습니다',
  })
})

const verifyCode = (req, res, next) => {
  passport.authenticate('local', (err, info, {message}) => {
    if (err) next(AppError.redisError(err.message))
    else if (!info) next(AppError.verificationError(message))
    else
      return req.logIn(info, (err) => {
        if (err) next(AppError.verificationError(err.message))
        const {accessToken, refreshToken} = authService.createToken(info)
        return res.status(200).json({
          status: 'SUCCESS',
          accessToken,
          refreshToken,
        })
      })
  })(req, res, next)
}

const refreshToken = (req, res) => {
  const data = authService.refreshToken(req.user, req.body)
  return res.status(200).json({
    ...data,
    status: 'SUCCESS',
  })
}

module.exports = {
  createCode,
  verifyCode,
  refreshToken,
}
