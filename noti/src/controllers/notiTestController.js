const { CustomError, ServerCommonError } = require("../errors");
const { locationService } = require("../services");
const axios = require("axios");

module.exports = {
  /**
   * noti test
   * get : geo/noti
   */
  notiTest: async (req, res, next) => {
    try {
      // const { name, category, radius, lng, lat } = req.body;
      // const data = await axios.get("http://noti/test");
      console.log("noti enter");
      return res.custom200SuccessData({ data: "hihi" });
    } catch (err) {
      // 에러 핸들러에서 잡게 됨
      // 400 번대 커스텀 에러는 에러로던지고 캐치못한 에러는 500번대로
      if (err instanceof CustomError) {
        return next(err);
      }
      return next(new ServerCommonError(err));
    }
  },
};
