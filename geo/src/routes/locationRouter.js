const express = require("express");
const router = express.Router();
const { locationController } = require("../controllers");
const { locationValidators } = require("../validators");
// const authUtil = require("../../middleware/authUtil");

// 인증 미들웨어 빠져있움
// 세부 미들웨어인 express-validator 설정부분도 여기 부분임
router.post(
  "/",
  // validator 관련해서 tuple형인데, (...)전개 해도되고 안해도 됨
  locationValidators.postNewLocation,
  locationController.postNewLocation
);

router.get(
  "/",
  // validator 관련해서 tuple형인데, (...)전개 해도되고 안해도 됨
  locationValidators.getLocation,
  locationController.getLocation
);

module.exports = router;
