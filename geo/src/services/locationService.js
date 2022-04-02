const { Location } = require("../models");
const { ServerCommonError, CustomError } = require("../errors");

module.exports = {
  /**
   * POST :  geo/location
   * @param {lng} 경도
   * @param {lat} 위도
   * @param {radius} 채팅에 들어갈 수 있는 반경 정보
   * @param {name} 이름정보
   * @param {category} 카테고리 정보
   * @returns 생성한 위치 정보의 object
   */
  postNewLocation: async ({ name, category, radius, lng, lat }) => {
    try {
      // 연번
      const locationCounts = await Location.find().countDocuments();

      // 위치 관련 documents
      const newLocation = Location({
        properties: {
          name,
          category,
          radius,
          nubmer: locationCounts + 1,
        },
        geometry: {
          // 점은 Point 로 저장
          type: "Point",
          // geojson lng lat 순임  ( 126 , 37)
          coordinates: [Number(lng), Number(lat)],
        },
      });

      await newLocation.save();

      return newLocation;
    } catch (err) {
      throw err;
    }
  },

  /**
   * GET :  geo/location
   * 원형 중심으로 내주변 좌표 불러오는 것.
   * @param {lng} 경도
   * @param {lat} 위도
   * @param {radius} 불러올 반경
   * @returns 내주변 장소 목록의 배열
   */
  getLocation: async ({ lng, lat, radius }) => {
    try {
      const locationArray = await Location.aggregate([
        {
          $geoNear: {
            spherical: true,
            near: { type: "Point", coordinates: [Number(lng), Number(lat)] },
            maxDistance: radius,
            distanceField: "properties.distance",
            key: "geometry",
          },
        },
        // 몽고디비 디폴트 100개임 최대 100개를 뽑아올수있는데 여기서 조정을 해야함
        //   { $limit: 1 },
      ]);
      return locationArray;
    } catch (err) {
      throw err;
    }
  },
};
