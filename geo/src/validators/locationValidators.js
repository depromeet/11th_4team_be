const { validationCatch } = require('../middleware/validationCatch');
const { param, query, body } = require('express-validator');

module.exports = {
  postNewLocation: [
    [
      body('name').isString().withMessage('문자열 형식이어야합니다.'),
      body('category').isString().withMessage('문자열 형식이어야합니다.'),
      body('radius').isInt().withMessage('정수형이어야합니다.'),
      body('lng')
        .exists()
        .withMessage('lng 필드가 없습니다.')
        .isFloat({ min: 124, max: 132 })
        .withMessage('경도 124-132 사이 제한입니다.'),
      body('lat')
        .exists()
        .withMessage('lat 필드가 없습니다.')
        .isFloat({ min: 33, max: 43 })
        .withMessage('위도 33-43 사이 제한입니다.')
      // .isIn(["confirm-deposit", "pending-deposit", "enter", "non-deposit"])
      // .withMessage(
      //   "confirm-deposit, pending-deposit, enter, non-deposit 중 하나의 값이 필요합니다. 필요합니다."
      // ),
    ],
    validationCatch
  ],

  getLocation: [
    [
      // 쿼리 밸리데이션
      query('radius').isInt().withMessage('정수형이어야합니다.'),
      query('lng')
        .exists()
        .withMessage('lng 필드가 없습니다.')
        .isFloat({ min: 124, max: 132 })
        .withMessage('경도 124-132 사이 제한입니다.'),
      query('lat')
        .exists()
        .withMessage('lat 필드가 없습니다.')
        .isFloat({ min: 33, max: 43 })
        .withMessage('위도 33-43 사이 제한입니다.')
      // .isIn(["confirm-deposit", "pending-deposit", "enter", "non-deposit"])
      // .withMessage(
      //   "confirm-deposit, pending-deposit, enter, non-deposit 중 하나의 값이 필요합니다. 필요합니다."
      // ),
    ],
    validationCatch
  ]
};
