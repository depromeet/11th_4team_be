const AppError = require(`${base}/errors/appError`)

function errorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
    return
  }
  res.status(err.statusCode).json({
    status: `BAD_REQUEST (${err.status})`,
    message: err.message,
  })
}

module.exports = errorHandler
