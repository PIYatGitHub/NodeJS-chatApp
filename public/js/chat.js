const socket = io();
socket.on('countUpdated', (count)=>{
  console.log('the count updates!', count);
});
document.querySelector('#increment').addEventListener('click', ()=>{
  console.log('clicked');
  socket.emit('increment');
});

