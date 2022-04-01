const express = require("express");
const router = express.Router();
const { locationController } = require("../controllers");
// const authUtil = require("../../middleware/authUtil");

// 인증 미들웨어 빠져있움
// 세부 미들웨어인 express-validator 설정부분도 여기 부분임
router.post("/", locationController.postNewLocation);

module.exports = router;
