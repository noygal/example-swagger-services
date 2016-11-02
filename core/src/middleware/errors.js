const errorsMap = {
  '123': { status: 404, massage: 'cannot find user' }
}
const swaggerDefinition = {
  'definitions': {
    'Error': {
      'type': 'object',
      'properties': {
        'code': {
          'type': 'integer',
          'format': 'int32'
        },
        'message': {
          'type': 'string'
        }
      }
    }
  }
}

const create = (logger) => (err, req, res, next) => {
  logger.log(`Got error: ${err}, ${req.headers}, ${req.body}`)
  const error = errorsMap[err.message]
  if (!error) res.status(500).send({code: '-1', message: 'unknown error'})
  res.status(error.status).send({code: err.message, message: 'error.massage'})
}

module.exports = {
  create,
  swaggerDefinition
}
