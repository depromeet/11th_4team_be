const {redisClient} = require(`${base}/modules/redis`)
const {generateRandomString} = require(`${base}/utils`)

const jwt = require('jsonwebtoken')
const {SECRET_ACCESS: secretAccess, SECRET_REFRESH: secretRefresh} = process.env

const AWS = require('aws-sdk')
AWS.config.update({region: 'ap-northeast-1'})

const sendCode = async (phoneNumber, verficiationCode) => {
  const params = {
    Message: `[티키타카]\n인증번호: ${verficiationCode}`,
    PhoneNumber: `82${phoneNumber.slice(1)}`,
  }
  const publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'})
    .publish(params)
    .promise()
  await publishTextPromise
}

const createCode = async (phoneNumber) => {
  const verficiationCode = generateRandomString(6)
  await redisClient.set(phoneNumber, verficiationCode, 'EX', 60 * 5) // seconds -> 5 minutes
  return verficiationCode
}
const createToken = (userInfo) => {
  const accessToken = jwt.sign(userInfo, secretAccess, {expiresIn: '1h'})
  const refreshToken = jwt.sign(userInfo, secretRefresh, {
    expiresIn: '7d',
  })
  return {accessToken, refreshToken}
}
const refreshToken = (
  userInfo,
  {accessToken: needAccessToken, refreshToken: needRefreshToken},
) => {
  const data = {}
  needAccessToken
    ? (data.accessToken = jwt.sign(userInfo, secretAccess, {expiresIn: '1h'}))
    : ''
  needRefreshToken
    ? (data.refreshToken = jwt.sign(userInfo, secretRefresh, {
        expiresIn: '7d',
      }))
    : ''
  return data
}

module.exports = {
  sendCode,
  createCode,
  createToken,
  refreshToken,
}
