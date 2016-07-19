var fs = require('fs')
var path = require('path')

function deleteUser(user, callback) {
  var Users = require('../Storage/data/users.json').current
  var resultUsers = Users.map(function(MapUser) {
    return MapUser.nombre !== user.nombre
  })
  console.log(resultUsers)
  var usersDataPath = path.join(__dirname, '../') + '/Storage/data/users.json'
  // fs.writeFile(usersDataPath, JSON.stringify(Users), function(error) {
  //   if (error) callback(error)
  //   callback(null, 'OK')
  // })
}

module.exports = deleteUser
