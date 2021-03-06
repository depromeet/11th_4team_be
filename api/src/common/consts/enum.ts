function getEnumToArray(enumType) {
  return Object.keys(enumType)
    .filter((value) => isNaN(Number(value)) === false)
    .map((key) => `${key} : ${enumType[key]}`);
}

function getEnumTypeValues(enumType) {
  return Object.keys(enumType)
    .map((key) => enumType[key])
    .filter((value) => typeof value === 'number');
}

enum STATUS_TYPE {
  NORMAL = 1,
  FORBIDDEN,
}

enum CATEGORY_TYPE {
  CONCERT = 1,
  UNIVERSITY,
  FITNESS,
  EXHIBITION,
  AMUSEMENT_PARK,
  HAN_RIVER_PRAk,
}

enum CHAT_TYPE {
  A = 1,
  B,
}

enum EVENT_TYPE {
  CHAT = 1,
  QUESTION,
}

enum SEX_TYPE {
  MALE = 1,
  FEMALE,
}

enum USER_TYPE {
  OPENING = 1,
  UN_OPENING,
  STUDENT,
}

enum REQ_STATE_TYPE {
  WAIT = 1,
  RETURN,
  CHECKING,
  APPROVAL,
  CANCEL,
}

enum LOGIN_ERROR_CODE {
  NOT_EXIST_ID,
  NOT_MATCH_AUTH_DATA,
  LOGIN_LOCK,
  LOGIN_UN_ACTIVE,
}

enum TOKEN_ERROR_CODE {
  NOT_EXIST_TOKEN,
  TOKEN_EXPIRED,
  NOT_VALID_TOKEN,
  NOT_ACCOUNT,
}

enum ACCOUNT_TYPE {
  USER = 1,
  OPERATOR,
}

enum CONTENT_TYPE {
  COMMENT = 1,
  VIEW,
  SCRAP,
  LIKE,
}

enum SORT_TYPE {
  POPULARITY = 1,
  LATEST,
}

enum NOTIFICATION_POST_TYPE {
  USER_NOTI = 1,
  OPERATOR_WEB_NOTI,
  OPERATOR_WEB_MAIN,
}

export {
  getEnumToArray,
  getEnumTypeValues,
  SEX_TYPE,
  USER_TYPE,
  REQ_STATE_TYPE,
  LOGIN_ERROR_CODE,
  TOKEN_ERROR_CODE,
  ACCOUNT_TYPE,
  CONTENT_TYPE,
  SORT_TYPE,
  NOTIFICATION_POST_TYPE,
  STATUS_TYPE,
  CATEGORY_TYPE,
  CHAT_TYPE,
  EVENT_TYPE,
};
