var socket = io();
socket.on('connect',function (){
  console.log('connected to server');

});

socket.on('disconnect',function(){
  console.log('disconnected from server')
});

socket.on('newMessage',function(message){
  console.log("new message from server",message);
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messageList').append(li);
});


$(document).ready(function(){
  $('#message-form').on('submit',function(e){
    e.preventDefault();
    that = this;
    socket.emit('createMessage',{
      from:'user',
      text: $('[name=message]').val()
    }, function(){
      $(that).find('[name=message]').val('');
    });

  });

});
