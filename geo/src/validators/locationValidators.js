const { validationCatch } = require("../middleware/validationCatch");
const { param, query, body } = require("express-validator");

module.exports = {
  postNewLocation: [
    [
      body("status")
        .isString()
        .withMessage("문자열 형식이어야합니다.")
        .isIn(["confirm-deposit", "pending-deposit", "enter", "non-deposit"])
        .withMessage(
          "confirm-deposit, pending-deposit, enter, non-deposit 중 하나의 값이 필요합니다. 필요합니다."
        ),
    ],
    validationCatch,
  ],
};
