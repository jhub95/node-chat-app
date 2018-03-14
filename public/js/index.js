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
  // on load put cursor in text box
  document.messageform.message.focus();

  $('#message-form').on('submit',function(e){
    e.preventDefault();
    const that = this;
    const $messageInput = $('[name=message]');
    socket.emit('createMessage',{
      from:'user',
      text: $messageInput.val()
    }, function(){
      $messageInput.val('');
      document.messageform.message.focus();
    });
  });

  var $locationButton = $('#send-location');

  $locationButton.on('click',function(){
    document.messageform.message.focus();
    if(!navigator.geolocation){
      return alert('your browswer doesnt support geolocation');
    }
    $locationButton.attr('disabled','disabled').html("fetching...");
    navigator.geolocation.getCurrentPosition(function(position){
      socket.emit('createLocationMessage',{
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      $locationButton.removeAttr('disabled').html("Send my location");
    },function(err){
      alert('Unable to fetch location');
      $locationButton.removeAttr('disabled').html("Send my location");
    });

  });
});
