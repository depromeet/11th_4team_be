const session = require('express-session')

const logger = require(`${base}/modules/logger`)

const {redisClientLegacy} = require(`${base}/modules/redis`)

module.exports = (secret) => {
  try {
    const redisStore = require('connect-redis')(session)
    return session({
      secret,
      resave: false, // save session everytime even if there is no change
      saveUninitialized: false, // normally false https://fierycoding.tistory.com/36
      cookie: {
        httpOnly: false, // Javascript code cannot handle cookie if true. should be true to handle in frontend
        secure: false, // The cookie only works on HTTPS. If sameSite none it should be true
        sameSite: 'none', // Third party cookie: different domain from the current, Referer is different
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
      store: new redisStore({
        client: redisClientLegacy,
        ttl: 1000 * 60 * 60 * 24 * 7,
      }),
    })
  } catch (e) {
    logger.error({label: 'Session', message: `Failed to create session`})
  }
}
