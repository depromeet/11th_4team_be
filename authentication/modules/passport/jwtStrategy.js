const passportJWT = require('passport-jwt')
const ExtractJWT = passportJWT.ExtractJwt
const JWTStrategy = passportJWT.Strategy

module.exports = (passport, secretAccess, secretRefresh) => {
  const opts = {}
  opts.jwtFromRequest = ExtractJWT.fromHeader('authorization')

  const verifyJWT = (payload, done) => {
    try {
      delete payload.iat
      delete payload.exp
      if (payload) done(null, payload, {message: '인증 성공'})
      else done(null, false, {message: '인증 실패'})
    } catch (e) {
      done(e)
    }
  }
  passport.use(
    'access',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromHeader('authorization'),
        secretOrKey: secretAccess,
      },
      verifyJWT,
    ),
  )
  passport.use(
    'refresh',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromHeader('refresh'),
        secretOrKey: secretRefresh,
      },
      verifyJWT,
    ),
  )
}
