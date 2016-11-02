const swaggerMerge = require('swagger-merge')
const errorDef = require('../middleware/errors').swaggerDefinition

const merge = (swaggers, info, basePath, host, schemes) => 
  swaggerMerge.merge([errorDef].concat(swaggers), info, basePath, host, schemes)


module.exports = { merge }