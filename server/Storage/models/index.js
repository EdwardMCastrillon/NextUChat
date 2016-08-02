var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var allSchemas = {
  MessageSchema: new Schema({
    sender: { type: String, required: true },
    text: { type: String, required: true }
  }),

  UserSchema: new Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String }
  })
}

var allModels = {
  Mensaje: mongoose.model('Mensajes', allSchemas.MessageSchema),
  Usuario: mongoose.model('Usuarios', allSchemas.UserSchema)
}

module.exports = allModels
