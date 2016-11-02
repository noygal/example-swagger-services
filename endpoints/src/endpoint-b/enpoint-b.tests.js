const test = require('tape')
const Datastore = require('nedb')
const controller = require('./enpoint-b.controller')

const req = {swagger: {params: {paramA: {value: 3}}}}

test('endpoint-b getExample success', function (t) {
  t.plan(1)
  const db = new Datastore()
  db.insert({_id: 3, value: 52})
  controller.create(db).controllerB_getExample(req, {send: (res) => t.equal(res._id, 3, 'found user')})
})

test('endpoint-b getExample error', function (t) {
  t.plan(1)
  const db = new Datastore()
  controller.create(db).controllerB_getExample(req, {}, (err) => t.equal(err.message, '123', 'did not found user'))
})