const socket = io();
socket.on('message', (msg)=>{
  console.log(msg);
});

document.querySelector('#msgForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  let msg = e.target.elements.message.value;
  if (msg) socket.emit('sendMessage', msg, (err)=>{
    if (err) return console.log(err);
    console.log('<<< Message delivered successfully');
  });
  msg.value = ' ';
});

document.querySelector('#sendLocation').addEventListener('click', ()=>{
  if(!navigator.geolocation) return alert('Geolocation is not supported by your browser...');
  navigator.geolocation.getCurrentPosition((position)=> {
    socket.emit('sendLocation', {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    }, ()=>{ console.log('Location shared!'); })
  })
});
