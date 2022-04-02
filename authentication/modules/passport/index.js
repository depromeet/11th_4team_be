const local = require('./localStrategy')
const jwt = require('./jwtStrategy')
module.exports = (passport, secretAccess, secretRefresh) => {
  passport.serializeUser((phoneNumber, done) => {
    done(null, phoneNumber)
  })
  passport.deserializeUser((phoneNumber, done) => {
    // Get phoneNumber from session and gathering whole data from Mongo or Cache
    done(null, phoneNumber)
  })
  local(passport)
  jwt(passport, secretAccess, secretRefresh)
}
