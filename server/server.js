const path = require('path');
const publicPath = path.join(__dirname,'../public');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/geolocation');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  socket.on('disconnect',()=>{
    // console.log('disconnected from client');
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('ADMIN',`${user.name} has left the room.`));
    }
  });


  socket.on('join',(params,callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback("your name and a room name are required.")
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);
    io.to(params.room).emit('updateUserList',users.getUserList(params.room));

    // socket.leave(params.room);

    // io.to(params.room).emit()  send to everyone in a Room
    // socket.broadcast.to(params.room).emit()  send to everyone in a room execpt message sender

    // io.emit()  this emits to every connected users
    // socket.broadcast.emit() this emits to everyone execpt message sender
    // socket.emit() this emits to one user

    socket.emit('newMessage',generateMessage("admin","Welcome to the Chatter."));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage("Admin",`${params.name} has joined the Chatter.`));

    callback();
  });

  socket.on('createMessage',(newMessage,callback)=>{
    io.emit('newMessage',generateMessage(newMessage.from,newMessage.text));
    callback();
  });

  socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage', generateLocationMessage('system',coords.latitude, coords.longitude))
  });

}); // end of io.on connection


server.listen(port,()=>{
  console.log(`started on port ${port}`);
});
module.exports = {app};
