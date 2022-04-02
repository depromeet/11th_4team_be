class ErrorMessage {
  constructor() {}
  /* 검증 관련 */ //-----------------------------------------------------

  /**
   * 검증오류
   */
  VALIDATION_ERROR = "검증오류";

  /* 토근 관련 */ //-----------------------------------------------------

  /**
   * 토큰 없음
   */
  TOKEN_NOT_EXIST = "토큰 없음";

  /**
   * 토큰 시간 만료
   */
  TOKEN_EXPIRED = "토큰 시간 만료";

  /**
   * 토큰 오류
   */
  TOKEN_INVALID = "토큰 오류";

  /* 유저 상태 관련 */ //-----------------------------------------------------

  /**
   * 가이드라인 위반으로 인해 계정이 정지되었습니다.
   */
  FORBIDDEN_ERROR = "가이드라인 위반으로 인해 계정이 정지되었습니다.";

  /**
   * 비활된유저
   */
  STOP_USER_ERROR = "비활된유저";

  /* 서버 관련  */ //-----------------------------------------------------

  /**
   * 서버내부오류
   */
  INTERNAL_SERVER_ERROR = "서버내부오류";

  /**
   * 레빗엠큐오류
   */
  RABBIT_SERVER_ERROR = "메시지큐오류";
}

module.exports = new ErrorMessage();

//const ErrorMessage = require("./ErrorMessage");
