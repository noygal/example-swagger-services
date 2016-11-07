module.exports.example = {
  swagger: [
    require('./src/endpoint-a/enpoint-a.swagger'),
    require('./src/endpoint-b/enpoint-b.swagger')
  ],
  controllers: [
    require('./src/endpoint-a/enpoint-a.controller'),
    require('./src/endpoint-b/enpoint-b.controller')
  ]
  ,
  mocks: [
    require('./src/endpoint-a/enpoint-a.mock'),
    require('./src/endpoint-b/enpoint-b.mock')
  ]
}

module.exports.exampleMock = [

]