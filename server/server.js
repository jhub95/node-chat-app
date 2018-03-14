const path = require('path');
const publicPath = path.join(__dirname,'../public');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  socket.on('disconnect',()=>{
    // console.log('disconnected from client');
  });

  socket.emit('newMessage',{
    from: "johnny walker",
    text: "what's up dude",
    createdAt: new Date().getTime()
  });

  socket.on('createMessage',(newMessage)=>{
    console.log('New message arrived: ', newMessage)
  });

});


server.listen(port,()=>{
  console.log(`started on port ${port}`);
});
module.exports = {app};
