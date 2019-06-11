const express = require('express'),
      path = require('path'),
      http = require('http'),
      socketIo = require('socket.io');
const app = express(),
      server = http.createServer(app),
      io =socketIo(server);// <-- this is why we created the server - to have it support web sockets

io.on('connection',()=>{
  console.log('New web socket connection!!')
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
module.exports = {app, server};