const socket = io();
//ui elements
const $messageForm =  document.querySelector('#msgForm'),
      $messageInput = $messageForm.querySelector('input'),
      $sendButton =   $messageForm.querySelector('button'),
      $sendLocationBtn = document.querySelector('#sendLocation');

socket.on('message', (msg)=>{
  console.log(msg);
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
    console.log('<<< Message delivered successfully');
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
