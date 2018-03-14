var socket = io();

function scrollToBottom () {
  // selectors
  const messages = $('#messageList');
  const newMessage = messages.children('li:last-child');
  // heights
  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();
  const totalHeight = clientHeight+scrollTop+newMessageHeight+lastMessageHeight;

  if(totalHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }

}

socket.on('connect',function (){
  console.log('connected to server');

});

socket.on('disconnect',function(){
  console.log('disconnected from server')
});

socket.on('newMessage',function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $("#message-template").html();
  var html = Mustache.render(template,{
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  $('#messageList').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $("#location-message-template").html();
  var html = Mustache.render(template,{
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  $('#messageList').append(html);
  scrollToBottom();
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
