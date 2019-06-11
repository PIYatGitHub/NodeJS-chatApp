const express = require('express'),
      path = require('path'),
      http = require('http'),
      socketIo = require('socket.io'),
      Filter = require('bad-words'),
      {generateMsg, generateURL} = require('./utils/messages'),
      {addUser,removeUser,getUser,getUsersInRoom} = require('./utils/users');

const app = express(),
      server = http.createServer(app),
      io =socketIo(server);// <-- this is why we created the server - to have it support web sockets

io.on('connection',(socket)=>{

  socket.on('join',({nickname, room}, cb)=>{
    const {error, user} = addUser({id:socket.id, nickname, room});
    if (error) return cb(error);
    socket.join(user.room);
    socket.emit('message', generateMsg('app_bot','Hey you! Welcome to the chatApp!'));
    socket.broadcast.to(user.room).emit('message', generateMsg('app_bot',`Ladies and Gents, please welcome ${user.nickname}!`));
    cb();
  });

  socket.on('sendMessage',(msg, cb)=>{
    const user = getUser(socket.id);
    const filter = new Filter();
    if (filter.isProfane(msg)) return cb(generateMsg('app_bot','Sorry! No profanity allowed...'));
    io.to(user.room).emit('message', generateMsg(user.nickname, msg));
    cb();
  });

  socket.on('sendLocation',(coords, cb)=>{
    const user = getUser(socket.id);
    io.to(user.room).emit('locationMessage', generateURL(user.nickname,`https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
    cb();
  });

  socket.on('disconnect', ()=>{
    const user = removeUser(socket.id);
    if (user) io.to(user.room).emit('message', generateMsg('app_bot',`${user.nickname} has left the building...`));
  })
});

app.use(express.static(path.join(__dirname, '../public')));
module.exports = {app, server};