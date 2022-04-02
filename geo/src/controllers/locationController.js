const { CustomError, ServerCommonError } = require("../errors");
const { locationService } = require("../services");

module.exports = {
  /**
   * 장소를 등록하는 api
   * POST : geo/location
   */
  postNewLocation: async (req, res, next) => {
    try {
      const { name, category, radius, lng, lat } = req.body;
      const location = await locationService.postNewLocation({
        name,
        category,
        radius,
        lng,
        lat,
      });

      res.custom200SuccessData(location);
    } catch (err) {
      // 에러 핸들러에서 잡게 됨
      // 400 번대 커스텀 에러는 에러로던지고 캐치못한 에러는 500번대로
      if (err instanceof CustomError) {
        return next(err);
      }
      return next(new ServerCommonError(err));
    }
  },

  /**
   * 내 주변 위치의 장소들을 불러오는 api
   * GET : geo/location
   */
  getLocation: async (req, res, next) => {
    try {
      const { radius, lng, lat } = req.body;
      const locationArray = await locationService.getLocation({
        radius,
        lng,
        lat,
      });

      res.custom200SuccessData(locationArray);
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
