const swagger = require('swagger-tools')
const express = require('express')

// pepper packages
const settings = require('settings').default
const endpoints = require('endpoints')
const core = require('core')

let app = express()

let swaggerObject = core.utils.swagger.merge(
  endpoints.example.swagger, {
    'title': 'Example Server',
    'description': 'description',
    'version': '1.0.0'
  }, '/api', `${settings.host}:${settings.port}`, ['http']
)

let controllerObject = endpoints.example.mocks.map(controller => controller.create())
  .reduce((prev, curr) => Object.assign(prev, curr), {})
  // require('./node_modules/endpoints/src/endpoint-a/enpoint-a.controller').create(db),
  // require('./node_modules/endpoints/src/endpoint-b/enpoint-b.controller').create(db)

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
