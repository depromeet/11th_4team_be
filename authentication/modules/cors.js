// const mongoURL	=  process.env.URL_MONGODB;
module.exports = (cors) => {
  return cors({
    origin: true,
    credentials: true,
    exposedHeaders: [
      'set-cookie',
      'access-control-allow-origin',
      'access-control-expose-headers',
      'vary',
      'content-length',
      'cookie',
    ],
  })
}
