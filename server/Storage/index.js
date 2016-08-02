var fs = require('fs'),
    path = require('path')
    Models = require('./models')

var Mensajes = Models.Mensaje
var Usuarios = Models.Usuario

module.exports = {
  findUsers: function() {
    return new Promise(function(resolve, reject) {
      Usuarios.find().exec(function(err, docs) {
        if (err) reject(err)
        resolve(docs)
      })
    })
  },

  findMessages: function() {
    return new Promise(function(resolve, reject) {
      Mensajes.find().exec(function(err, docs) {
        if (err) reject(err)
        resolve(docs)
      })
    })
  },

  saveUser: function(user) {
    return new Promise(function(resolve, reject) {
      var newUser = new Usuarios(user)
      newUser.save()
      resolve({message: 'user created'})
    })
  },

  saveMessage: function(message) {
    return new Promise(function(resolve, reject) {
      var newMessage = new Mensajes(message)
      newMessage.save(function(err) {
        if (err) reject(err)
        resolve('Message Create')
      })
    })
  }
}
