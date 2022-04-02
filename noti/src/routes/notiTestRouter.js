const express = require("express");
const router = express.Router();
const { notiTestController } = require("../controllers");
// const authUtil = require("../../middleware/authUtil");

router.get(
  "/",
  // validator 관련해서 tuple형인데, (...)전개 해도되고 안해도 됨
  notiTestController.notiTest
);

module.exports = router;
