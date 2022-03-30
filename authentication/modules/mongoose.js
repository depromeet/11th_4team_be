const logger = require(`${base}/modules/logger`)
const mongoose = require('mongoose')

module.exports = {
  initialize: (host, port) => {
    mongoose
      .connect(`mongodb://${host}:${port}/`, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      })
      .then(() =>
        logger.info({label: 'MongoDB', message: `Successfully connected to ${host}`}),
      )
      .catch((e) =>
        logger.error({label: 'MongoDB', message: `Failed to connect ${host}`}),
      )
  },
}
