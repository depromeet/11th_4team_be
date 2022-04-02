global.base = __dirname
const express = require('express')
const app = express()
const passport = require('passport')
const cors = require('cors')

const errorHandler = require(`${base}/errors/errorHandler`)
const AppError = require(`${base}/errors/appError`)
const logger = require(`${base}/modules/logger`)

require('dotenv').config()
const {
  PORT,
  MONGO_ENDPOINT,
  MONGO_PORT,
  REDIS_ENDPOINT,
  REDIS_PORT,
  SECRET_ACCESS,
  SECRET_REFRESH,
} = process.env

require('./modules/mongoose').initialize(MONGO_ENDPOINT, MONGO_PORT)
require('./modules/redis').initialize(REDIS_ENDPOINT, REDIS_PORT)
require('./modules/passport')(passport, SECRET_ACCESS, SECRET_REFRESH)

const indexRouter = require('./routes/index')

app.use(require('./modules/cors')(cors))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(passport.initialize())

// Swagger
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerDefinition = {
  info: {
    title: 'Authentication',
    version: '0.0.1',
    description: '권한 인증 API',
  },
  host: 'localhost',
  basePath: '/',
  securityDefinitions: {
    api_key: {
      type: 'apiKey',
      in: 'header',
      name: 'Refresh',
    },
  },
}
const options = {
  swaggerDefinition,
  apis: ['./modules/swagger/*'],
}
const swaggerSpec = swaggerJSDoc(options)
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/', indexRouter)
app.use((req, res, next) => next(AppError.notFoundError(`NOT FOUND ${req.originalUrl}`)))
app.use(errorHandler)
app.listen(PORT, () =>
  logger.info({label: 'Server', message: `Server is running on port ${PORT}`}),
)
