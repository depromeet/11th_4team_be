const {redisClient} = require(`${base}/modules/redis`)
const {generateRandomString} = require(`${base}/utils`)

const generateCode = async (phoneNumber) => {
  const verficiationCode = generateRandomString(6)
  await redisClient.set(phoneNumber, verficiationCode, 'EX', 60 * 5) // seconds -> 5 minutes
}

module.exports = {
  generateCode,
}
