const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;
var app = express();

app.use(express.static(publicPath));

app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
});
