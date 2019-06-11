const socket = io();
socket.on('message', (msg)=>{
  console.log(msg);
});

document.querySelector('#msgForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  let msg = e.target.elements.message.value;
  if (msg) socket.emit('sendMessage', msg);
  msg.value = ' ';
});

