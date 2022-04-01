const { locationService } = require("../services");

module.exports = {
  postNewLocation: async (req, res, next) => {
    try {
      const { name, category, radius, lng, lat } = req.body;
      await locationService.postNewLocation({
        name,
        category,
        radius,
        lng,
        lat,
      });
    } catch (err) {
      // 에러 핸들러에서 잡게 됨
      // 400 번대 커스텀 에러는 에러로던지고 캐치못한 에러는 500번대로
      // console.log(err);
      if (err instanceof CustomError) {
        return next(err);
      }
      return next(new ServerCommonError(err));
    }
  },
};
