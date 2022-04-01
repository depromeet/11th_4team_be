const { Location } = require("../models");
const { ServerCommonError, CustomError } = require("../errors");

module.exports = {
  // 유저가 가지고 있는 답변을 질문과 함께 연결하기
  postNewLocation: async ({ name, category, radius, lng, lat }) => {
    try {
      // 연번
      console.log(name, category, radius, lng, lat);
      const locationCounts = await Location.find().countDocuments();
      console.log(name, category, radius, lng, lat);

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
      console.log(name, category, radius, lng, lat);

      await newLocation.save();
      console.log(name, category, radius, lng, lat);
    } catch (err) {
      throw err;
    }
  },
};
