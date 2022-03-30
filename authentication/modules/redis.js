const logger = require(`${base}/modules/logger`)
const redis = require('async-redis')
const redisLegacy = require('redis')

module.exports = {
  redisClient: null,
  redisClientLegacy: null,
  initialize: async function (host, port) {
    try {
      this.redisClient = redis.createClient(port, host)

      // Legacy for express-session
      this.redisClientLegacy = redisLegacy.createClient({
        url: `redis://${host}:${port}`,
        legacyMode: true,
      })
      this.redisClientLegacy.on('error', (err) => console.log('Redis Client Error', err))
      await this.redisClientLegacy.connect()

      logger.info({label: 'Redis', message: `Successfully connected to ${host}`})
    } catch (e) {
      logger.error({label: 'Redis', message: `Failed to connect ${host}`})
    }
  },
}
