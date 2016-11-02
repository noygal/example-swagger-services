const create = () => ({
  controllerA_getExample: (req, res, next) => res.send({_id: req.swagger.params.paramA.value, value: 42})
})

module.exports = { create }