const express = require('express')
const router = express.Router()
const {authController} = require(`${base}/controllers`)

// curl localhost/verification/generate -d '{"phoneNumber":"01029153142"}' -H 'Content-Type: application/json'
router.post(
  '/verification/generate',
  authController.isNotVerified,
  authController.generateCode,
)
// curl localhost/verification/check -d '{"phoneNumber":"01029153142", "verificationCode": ""}' -H 'Content-Type: application/json'
router.post('/verification/check', authController.isNotVerified, authController.checkCode)
router.get('/logout', authController.isVerified, authController.logout)

router.get('/test', authController.isVerified, (req, res) => {
  res.json({message: '인증된 사람만 볼 수 있는 데이터'})
})

module.exports = router
