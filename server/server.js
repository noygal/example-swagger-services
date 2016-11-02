const swagger = require('swagger-tools')
const express = require('express')

// pepper packages
const settings = require('settings').default
const core = require('core')

let app = express()

let swaggerObject = core.utils.swagger.merge(
  [
    require('./node_modules/endpoints/src/endpoint-a/enpoint-a.swagger'),
    require('./node_modules/endpoints/src/endpoint-b/enpoint-b.swagger')
  ], {
    'title': 'Example Server',
    'description': 'description',
    'version': '1.0.0'
  }, '/api', `${settings.host}:${settings.port}`, ['http']
)

let controllerObject = Object.assign({}, 
  // require('./node_modules/endpoints/src/endpoint-a/enpoint-a.controller').create(db),
  // require('./node_modules/endpoints/src/endpoint-b/enpoint-b.controller').create(db)
  require('./node_modules/endpoints/src/endpoint-a/enpoint-a.mock').create(),
  require('./node_modules/endpoints/src/endpoint-b/enpoint-b.mock').create()
)
console.log(swaggerObject)
console.log(controllerObject)
// app.use(core.middleware.auth.create(db))

swagger.initializeMiddleware(swaggerObject, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata())

  // Provide the security handlers
  // app.use(middleware.swaggerSecurity({
  //   oauth2: function (req, def, scopes, callback) {
  //     // Do real stuff here
  //   }
  // }))

  // Validate Swagger requests
  app.use(middleware.swaggerValidator({
    validateResponse: false
  }))

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter({useStubs: false, controllers: controllerObject}))

  app.use(core.middleWare.error.create(console))
  // Serve the Swagger documents and Swagger UI
  //   http://localhost:3000/docs => Swagger UI
  //   http://localhost:3000/api-docs => Swagger document
  app.use(middleware.swaggerUi())


  app.listen(settings.port)
})
