const create = () => ({
  controllerB_getExample: (req, res, next) => res.send({id: req.params.paramA, value: 62})
})

module.exports = { create }