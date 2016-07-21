var fs = require('fs')
var path = require('path')
var Storage = require('../Storage')

function deleteUser(user, callback) {
  Storage.getData('users')
        .then(function(users) {
          var resultUsers = users.current.filter(function(MapUser) {
            return MapUser.nombre != user.nombre
          })
          var usersDataPath = path.join(__dirname, '../') + '/Storage/data/users.json'
          fs.writeFile(usersDataPath, JSON.stringify({current: resultUsers}), function(error) {
            if (error) callback(error)
            callback(null, 'OK')
          })
        }).catch(function(err) {
          callback(err)
        })
}

module.exports = deleteUser
