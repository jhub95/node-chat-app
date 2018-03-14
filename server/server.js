const path = require('path');
const publicPath = path.join(__dirname,'../public');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage} = require('./utils/message');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  socket.on('disconnect',()=>{
    // console.log('disconnected from client');
  });

  socket.emit('newMessage',generateMessage("admin","Welcome to the Chatter."));
  socket.broadcast.emit('newMessage',generateMessage("Admin","A new user has joined the Chatter."));

  socket.on('createMessage',(newMessage)=>{
    console.log('New message arrived: ', newMessage);
    io.emit('newMessage',generateMessage(newMessage.from,newMessage.text));

    // socket.broadcast.emit('newMessage',{
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // });
  });

});


server.listen(port,()=>{
  console.log(`started on port ${port}`);
});
module.exports = {app};
