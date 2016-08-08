const bodyParser = require('body-parser'),
      http       = require('http'),
      express    = require('express'),
      socketio   = require('socket.io'),
      mongoose   = require('mongoose'),
      chat       = require('./Chat'),
      deleteUser = require('./lib')

const port   = process.env.PORT || 3000,
      app    = express(),
      Server = http.createServer(app),
      io     = socketio(Server)

mongoose.connect('mongodb://localhost/nextuchat')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/chat', chat)
app.use(express.static('public'))

io.on('connection', (socket) => {
  console.log('new User connected, with socket: ' + socket.id)

  socket.on('userJoin', user => {
    socket.user = user
    socket.broadcast.emit('userJoin', user)
  })

  socket.on('message', message => {
    socket.broadcast.emit('message', message)
  })

  socket.on('disconnect', () => {
    if (socket.hasOwnProperty('user')) {
      let user = socket.user
      deleteUser(user, (err, confirm) => {
        if (err) throw err
        socket.broadcast.emit('leaveUser', user)
      })
    }
  })
})

Server.listen(port,() => console.log(`Server is running on port: ${port}`))
