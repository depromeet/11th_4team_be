const catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (e) {
      console.log(e)
      next(e)
    }
  }
}
const generateRandomString = (length) => {
  let result = []
  let characters = '0123456789'
  let charactersLength = characters.length
  for (let i = 0; i < length; i++)
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
  return result.join('')
}

module.exports = {
  catchAsync,
  generateRandomString,
}
