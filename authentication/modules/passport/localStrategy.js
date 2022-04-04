const { User } = require(`${base}/models/User`)

const LocalStrategy = require('passport-local').Strategy
const {redisClient} = require(`${base}/modules/redis`)

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      {usernameField: 'phoneNumber', passwordField: 'verificationCode', session: false},
      async (phoneNumber, verificationCode, done) => {
        try {
          const _verificationCode = await redisClient.get(phoneNumber)
          if (_verificationCode === verificationCode) {
            let user = (await User.findOne({phoneNumber}))
            if (!user) {
              user = await (new User({
                nickname: "Undefined",
                phoneNumber: phoneNumber, 
              })).save()
            }
            done(null, {id: user._id}, {message: '인증 성공'})
          }
          else done(null, false, {message: '인증 실패'})
          await redisClient.del(phoneNumber)
        } catch (e) {
          done(e)
        }
      },
    ),
  )
}
