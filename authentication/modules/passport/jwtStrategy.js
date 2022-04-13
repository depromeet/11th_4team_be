const passportJWT = require('passport-jwt')
const ExtractJWT = passportJWT.ExtractJwt
const JWTStrategy = passportJWT.Strategy

const { User } = require(`${base}/models/User`)

module.exports = (passport, secretAccess, secretRefresh) => {
  const opts = {}
  opts.jwtFromRequest = ExtractJWT.fromHeader('authorization')

  const verifyJWT = async (payload, done) => {
    try {
      const user = await User.findOne({_id: payload['_id']})
      // Payload에 뭘 넣을까?
      // if (payload) done(null, payload, {message: '인증 성공'})
      if (payload) done(null, {
        _id: user['_id'],
        nickname: user['nickname'],
        profileUrl: user['profileUrl']
      }, {message: '인증 성공'})
      else done(null, false, {message: '인증 실패'})
    } catch (e) {
      console.log(e)
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
