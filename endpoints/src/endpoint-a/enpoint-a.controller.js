const create = (collection) => ({
  controllerA_getExample: (req, res, next) => {
    collection.findOne({_id: req.swagger.params.paramA.value}, (err, doc) => {
      if (doc === null) return next(new Error('123'))
      res.send(doc)
    })
  }
})

module.exports = { create }
