const swaggerMerge = require('swagger-merge')
const errorDefinition = require('../middleware/errors').swaggerDefinition

const merge = (swaggers, info, basePath, host, schemes) =>
  swaggerMerge.merge([errorDefinition].concat(swaggers), info, basePath, host, schemes)

module.exports = { merge }