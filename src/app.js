const express = require('express'),
      path = require('path'),
      http = require('http');
const app = express(),
      server = http.createServer(app);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
module.exports = {app, server};