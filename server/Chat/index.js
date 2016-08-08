const express = require('express'),
      Storage = require('../Storage')

const Router = express.Router()

Router.get('/users', (req, res) => {
  Storage.findUsers()
          .then(users => {
            res.json(users)
          }).catch(error => {
            res.sendStatus(500).json(error)
          })
})

Router.get('/messages', (req, res) => {
  Storage.findMessages()
          .then(messages => {
            res.json(messages)
          }).catch(error => {
            res.sendStatus(500).json(error)
          })
})

Router.post('/users', (req, res) => {
  let user = req.body.user
  Storage.saveUser(user)
        .then(confirmation => {
          res.json(confirmation)
        })
        .catch(err => {
          res.sendStatus(500).json(err)
        })
})

Router.post('/messages', (req, res) => {
  let message = req.body.message
  Storage.saveMessage(message)
        .then(confirmation => {
          res.json(confirmation)
        })
        .catch(err => {
          res.sendStatus(500).json(err)
        })
})

module.exports = Router
