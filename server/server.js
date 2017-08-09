const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(function (req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static(publicPath));

io.on('connection', (socket) => {

  socket.on('broadcastVideoId', (data) => {
    io.emit('newVideoId', {videoId: data.videoId});
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});

server.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
});
