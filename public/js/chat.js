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
socket.on('message', (msg)=>{
  const markup = Mustache.render(msgTemplate, {
    nickname: msg.nickname,
    message:msg.text,
    createdAt:moment(msg.createdAt).format('HH:mm:ss')
  });
  $messages.insertAdjacentHTML('beforeend', markup);
});

socket.on('locationMessage', (locationURL)=>{
  const markup = Mustache.render(locationTemplate, {
    nickname: locationURL.nickname,
    url:locationURL.url,
    createdAt:moment(locationURL.createdAt).format('HH:mm:ss')
  });
  $messages.insertAdjacentHTML('beforeend', markup);
});

socket.on('roomData', ({room, users})=>{
  console.log('room & users data: ', room, users);
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
      console.log('Location shared!');
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