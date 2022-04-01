const { Location } = require("../models");

module.exports = {
  // 유저가 가지고 있는 답변을 질문과 함께 연결하기
  postNewLocation: async () => {
    try {
    } catch (err) {
      // 서비스 레이어에서 캐치못한 에러는 500으로
      throw err;
    }
  },
};
