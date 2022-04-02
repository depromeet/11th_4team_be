class AppError extends Error {
  constructor(statusCode, message) {
    super(message)
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? `FAILED` : 'ERROR'
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
  static redisError(message) {
    return new AppError(500, message)
  }
  static JWTError(message) {
    return new AppError(500, message)
  }
  static verificationError(message) {
    return new AppError(401, message)
  }
  static sessionError(message) {
    return new AppError(500, message)
  }
  static verifiedError(message) {
    return new AppError(403, message)
  }
  static unverifiedError(message) {
    return new AppError(401, message)
  }
  static notFoundError(message) {
    return new AppError(404, message)
  }
}

module.exports = AppError
