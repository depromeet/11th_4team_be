// 각 라우트들을 모으는 곳
// 세부 미들웨어들은 각 라우트 파일에서 설정.

var express = require("express");
var router = express.Router();

router.use("/test", require("./notiTestRouter"));

module.exports = router;
