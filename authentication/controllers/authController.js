const passport = require('passport')

const {catchAsync} = require(`${base}/utils`)
const AppError = require(`${base}/errors/appError`)
const authService = require(`${base}/services/authService`)

const generateCode = catchAsync(async (req, res, next) => {
  await authService.generateCode(req.body.phoneNumber)
  return res.status(200).json({
    status: 'SUCCESS',
    message: '번호 인증코드를 생성했습니다.',
  })
})

const checkCode = (req, res, next) => {
  passport.authenticate('local', (err, info, message) => {
    if (err) next(AppError.redisError(err.message))
    else if (!info) next(AppError.verificationError(message))
    else
      return req.logIn(info, (err) => {
        if (err) next(AppError.verificationError(err.message))
        return res.status(200).json({
          status: 'SUCCESS',
          message,
        })
      })
  })(req, res, next)
}

const isVerified = (req, res, next) => {
  if (req.isAuthenticated()) next()
  else return next(AppError.unverifiedError('인증되지 않은 상태입니다'))
}

const isNotVerified = (req, res, next) => {
  if (!req.isAuthenticated()) next()
  else return next(AppError.verifiedError('인증된 상태입니다'))
}

const logout = (req, res) => {
  req.logout()
  req.session.destroy((err) => {
    if (err) next(AppError.sessionError(err.message))
    res.status(200).json({message: '로그아웃을 성공했습니다'})
  })
}

module.exports = {
  generateCode,
  checkCode,
  isVerified,
  isNotVerified,
  logout,
}
