const socket = io();
//ui elements
const $messageForm =  document.querySelector('#msgForm'),
      $messageInput = $messageForm.querySelector('input'),
      $sendButton =   $messageForm.querySelector('button'),
      $sendLocationBtn = document.querySelector('#sendLocation'),
      $messages = document.querySelector('#messages');

//ui templates
const msgTemplate       = document.querySelector('#message-template').innerHTML,
      locationTemplate  = document.querySelector('#location-template').innerHTML,
      sidebarTemplate   = document.querySelector('#sidebar-template').innerHTML;

//options
const {nickname, room} = Qs.parse(location.search, {ignoreQueryPrefix:true});

const autoscroll = ()=>{
  const $newMsg = $messages.lastElementChild,
        computedMsgStyles = getComputedStyle($newMsg),
        newMsgMargin = parseInt(computedMsgStyles.marginBottom),
        newMsgHeight = $newMsg.offsetHeight + newMsgMargin;

  const visibleHeight = $messages.offsetHeight,
        containerHeight = $messages.scrollHeight;

  const scrollOffset = $messages.scrollTop + visibleHeight;

  if (containerHeight - newMsgHeight <= scrollOffset){
    $messages.scrollTop = $messages.scrollHeight;
  }

};

socket.on('message', (msg)=>{
  const markup = Mustache.render(msgTemplate, {
    nickname: msg.nickname,
    message:msg.text,
    createdAt:moment(msg.createdAt).format('HH:mm:ss')
  });
  $messages.insertAdjacentHTML('beforeend', markup);
  autoscroll();
});

socket.on('locationMessage', (locationURL)=>{
  const markup = Mustache.render(locationTemplate, {
    nickname: locationURL.nickname,
    url:locationURL.url,
    createdAt:moment(locationURL.createdAt).format('HH:mm:ss')
  });
  $messages.insertAdjacentHTML('beforeend', markup);
  autoscroll();
});

socket.on('roomData', ({room, users})=>{
  const markup = Mustache.render(sidebarTemplate, {room, users});
  document.querySelector('#sidebar').innerHTML = markup;
});

resetForm = function(){
  $sendButton.removeAttribute('disabled');
  $messageInput.value = '';
  $messageInput.focus();
};


$messageForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  $sendButton.setAttribute('disabled', 'disabled');
  let msg = e.target.elements.message.value;
  if (msg) socket.emit('sendMessage', msg, (err)=>{
    if (err) return console.log(err);
  });
  resetForm();
});

$sendLocationBtn.addEventListener('click', ()=>{
  if(!navigator.geolocation) return alert('Geolocation is not supported by your browser...');
  $sendLocationBtn.setAttribute('disabled', 'disabled');
  navigator.geolocation.getCurrentPosition((position)=> {
    socket.emit('sendLocation', {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    }, ()=>{
      $sendLocationBtn.removeAttribute('disabled');
    })
  })
});

socket.emit('join', {nickname, room}, (error)=>{
  if (error){
    alert(error);
    location.href = '/';
  }
});