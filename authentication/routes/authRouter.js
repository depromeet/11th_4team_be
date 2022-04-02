const express = require('express')
const router = express.Router()
const {authController} = require(`${base}/controllers`)
const {authMiddleware} = require(`${base}/middlewares`)

// curl localhost/phone/code -d '{"phoneNumber":"01029153142"}' -H 'Content-Type: application/json'
router.post('/phone/code', authController.createCode)
// curl localhost/phone/verification -d '{"phoneNumber":"01029153142", "verificationCode": ""}' -H 'Content-Type: application/json'
router.post('/phone/verification', authController.verifyCode)
// curl localhost/refresh -H 'Refresh: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjAxMDI5MTUzMTQyIiwiaWF0IjoxNjQ4ODcwMzc2LCJleHAiOjE2NDk0NzUxNzZ9.LAUd7Hh-0OIN9iSB5bIpPFVFV7GbQ7PU9Sn9NdbEjL8' -d '{"accessToken": "true", "refreshToken": "true"}' -H 'Content-type: application/json'
router.post('/refresh', authMiddleware.verifyRefreshToken, authController.refreshToken)
// curl localhost/verify -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjAxMDI5MTUzMTQyIiwiaWF0IjoxNjQ4ODcwMTQ4LCJleHAiOjE2NDg4NzM3NDh9.8BuWU3eBY3Y71j4u32PSqKy26QwcuBINJ59TTrzEDWU' -D /dev/stdout
router.get('/verify', authMiddleware.verifyAccessToken, (req, res) => {
  return res.json(req.user)
})

module.exports = router
