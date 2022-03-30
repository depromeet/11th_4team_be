const local = require('./localStrategy')
module.exports = (passport) => {
  passport.serializeUser((phoneNumber, done) => {
    done(null, phoneNumber)
  })
  passport.deserializeUser((phoneNumber, done) => {
    // Get phoneNumber from session and gathering whole data from Mongo or Cache
    done(null, phoneNumber)
  })
  local(passport)
}
