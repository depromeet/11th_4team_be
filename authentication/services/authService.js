const {redisClient} = require(`${base}/modules/redis`)
const {generateRandomString} = require(`${base}/utils`)

const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')
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
  await redisClient.set(phoneNumber, verficiationCode, 'EX', 60 * 6)
  return verficiationCode
}
 const convertTime = ({ iat, exp }) => {
    const convertToISO = (time) => {
      const d = new Date(time * 1000)
      return new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString()
    }
    const convertToKST = time => {
      return `${time.slice(0, -5)}+0900`
    }
    return {
      iat: (convertToKST(convertToISO(iat))),
      exp: (convertToKST(convertToISO(exp)))
    }
  }
const createToken = (userInfo) => {
  const accessToken = jwt.sign(userInfo, secretAccess, {expiresIn: '1h'})
  const refreshToken = jwt.sign(userInfo, secretRefresh, {
    expiresIn: '7d',
  })
  return {
    accessToken: {
      token: accessToken,
      ...convertTime(jwtDecode(accessToken))
    },
    refreshToken: {
      token: refreshToken,
      ...convertTime(jwtDecode(refreshToken))
    }
  }
}
const refreshToken = (
  userInfo,
  {accessToken: needAccessToken, refreshToken: needRefreshToken},
) => {
  const data = {}
  if (needAccessToken) {
    const accessToken = jwt.sign(userInfo, secretAccess, {expiresIn: '1h'})
    data['accessToken'] = {
      token: accessToken,
      ...convertTime(jwtDecode(accessToken))
    }
  }
  if (needRefreshToken) {
    const refreshToken = jwt.sign(userInfo, secretRefresh, {
      expiresIn: '7d',
    })
    data['refreshToken'] = {
      token: refreshToken,
      ...convertTime(jwtDecode(refreshToken))
    }
  }
  return data
}

module.exports = {
  sendCode,
  createCode,
  createToken,
  refreshToken,
}
