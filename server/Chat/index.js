var express = require('express')
var Storage = require('../Storage')

var Router = express.Router()

Router.get('/users', function(req, res) {
  Storage.getData('users')
          .then(function(users) {
            res.json(users)
          }).catch(function(error) {
            res.sendStatus(500).json(error)
          })
})

Router.get('/messages', function(req, res) {
  Storage.getData('messages')
          .then(function(messages) {
            res.json(messages)
          }).catch(function(error) {
            res.sendStatus(500).json(error)
          })
})

Router.post('/users', function(req, res) {
  var user = req.body.user
  var oldUsers = require('../Storage/data/users.json')
  Storage.saveData('users', user, oldUsers)
      .then(function(message) {
        res.json(message)
      }).catch(function(error) {
        res.sendStatus(500).json(error)
      })
})

Router.post('/messages', function(req, res) {
  var message = req.body.message
  var oldMessages = require('../Storage/data/messages.json')
  Storage.saveData('messages', message, oldMessages)
      .then(function(message) {
        res.json(message)
      }).catch(function(error) {
        res.sendStatus(500).json(error)
      })
})

module.exports = Router
