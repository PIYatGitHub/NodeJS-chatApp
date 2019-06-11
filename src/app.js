const express = require('express'),
      path = require('path'),
      http = require('http'),
      socketIo = require('socket.io'),
      Filter = require('bad-words'),
      {generateMsg, generateURL} = require('./utils/messages');
const app = express(),
      server = http.createServer(app),
      io =socketIo(server);// <-- this is why we created the server - to have it support web sockets


io.on('connection',(socket)=>{
  socket.emit('message', generateMsg('Hey you! Welcome to the chatApp!'));

  socket.broadcast.emit('message', generateMsg('A new chat mate has joined!'));

  socket.on('sendMessage',(msg, cb)=>{
    const filter = new Filter();
    if (filter.isProfane(msg)) return cb(generateMsg('Sorry! No profanity allowed...'));
    io.emit('message', generateMsg(msg));
    cb();
  });

  socket.on('sendLocation',(coords, cb)=>{
      io.emit('locationMessage', generateURL(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
      cb();
  });

  socket.on('disconnect', ()=>{
    io.emit('message', generateMsg('A chat mate has left the building...'));
  })
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
module.exports = {app, server};