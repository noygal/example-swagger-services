module.exports = {
  middleWare: {
    error: require('./src/middleware/errors')
  },
  utils: {
    swagger: require('./src/utils/swagger')
  },
}