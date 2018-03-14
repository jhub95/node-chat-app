var socket = io();
socket.on('connect',function (){
  console.log('connected to server');

});

socket.on('disconnect',function(){
  console.log('disconnected from server')
});

socket.on('newMessage',function(message){
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messageList').append(li);
});

socket.on('newLocationMessage', function(message){
  console.log("new location from user",message);
  var li = $(`<li>${message.from}: <a target="_blank" href="${message.url}">Location Map</a></li>`);
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

  var $locationButton = $('#send-location');

  $locationButton.on('click',function(){
    console.log('Share location clicked');
    if(!navigator.geolocation){
      return alert('your browswer doesnt support geolocation');
    }
    navigator.geolocation.getCurrentPosition(function(position){
      console.log(position);
      socket.emit('createLocationMessage',{
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },function(err){
      alert('Unable to fetch location');
    });

  });
});
