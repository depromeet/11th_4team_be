const LocalStrategy = require('passport-local').Strategy
const {redisClient} = require(`${base}/modules/redis`)

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      {usernameField: 'phoneNumber', passwordField: 'verificationCode', session: false},
      async (phoneNumber, verificationCode, done) => {
        try {
          const _verificationCode = await redisClient.get(phoneNumber)
          if (_verificationCode === verificationCode) done(null, phoneNumber, '인증 성공')
          else done(null, false, '인증 실패')
          await redisClient.del(phoneNumber)
        } catch (e) {
          done(e)
        }
      },
    ),
  )
}
