global.base = __dirname
const express = require('express')
const app = express()
const passport = require('passport')
const cors = require('cors')

const errorHandler = require(`${base}/errors/errorHandler`)
const AppError = require(`${base}/errors/appError`)
const logger = require(`${base}/modules/logger`)

require('dotenv').config()
const {PORT, MONGO_ENDPOINT, MONGO_PORT, REDIS_ENDPOINT, REDIS_PORT, SECRET} = process.env

require('./modules/mongoose').initialize(MONGO_ENDPOINT, MONGO_PORT)
require('./modules/redis').initialize(REDIS_ENDPOINT, REDIS_PORT)
require('./modules/passport')(passport)

const indexRouter = require('./routes/index')

app.use(require('./modules/cors')(cors))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(require('./modules/session')(SECRET))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter)
app.use((req, res, next) => next(AppError.notFoundError(`NOT FOUND ${req.originalUrl}`)))
app.use(errorHandler)
app.listen(PORT, () =>
  logger.info({label: 'Server', message: `Server is running on port ${PORT}`}),
)
