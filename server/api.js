'use strict'

const db = require('APP/db')
const api = module.exports = require('express').Router()

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  // DELETE THIS CODE BEFORE MERGE
  // .get('/testDate', (req, res) => {
  //   db.model('interviews').findAll({})
  //   .then(interview => interview[0].date)
  //   .then(date => res.send(date));
  // })
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))

// No routes matched? 404.
api.use((req, res) => res.status(404).end())