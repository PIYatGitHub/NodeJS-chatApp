const express = require('express'),
      path = require('path'),
      http = require('http'),
      socketIo = require('socket.io');
const app = express(),
      server = http.createServer(app),
      io =socketIo(server);// <-- this is why we created the server - to have it support web sockets


io.on('connection',(socket)=>{
  console.log('New web socket connection!!');

  socket.emit('message', 'Hey you! Welcome to the chatApp!');

  socket.on('sendMessage',(msg)=>{
      io.emit('message', `New msg: ${msg}`);
  });
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
module.exports = {app, server};