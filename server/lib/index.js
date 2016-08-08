var fs = require('fs')
var path = require('path')
var Storage = require('../Storage')

function deleteUser(user, callback) {
  var username = user.nombre
  Storage.deleteUser(username)
         .then(function(confirm) {
           callback(null, confirm)
         })
         .catch(function(err) {
           callback(err, null)
         })
}

module.exports = deleteUser
