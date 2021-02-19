const app = require('express')();
const path = require('path');
const server =require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

port = process.env.PORT || 8080;

app.use(express.static('./dist/Angular-Chat'));

app.get('/', (req, res) => res.send('hello!'));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('message', (msg) => {
    console.log(msg);
    // socket.broadcast.emit('message-broadcast', msg);
    io.emit('message-broadcast', msg);
  });

});

server.listen(port, () => {
  console.log('listening on: ' + port);
})
