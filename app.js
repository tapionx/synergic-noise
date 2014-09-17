var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 8080;

server.listen(port, function () {
      console.log('Server listening at port %d', port);
});

// serve static files 
app.use(express.static(__dirname + '/'));

// namespace for players
var players = io.of('/players');
// namespace for noisers
var noisers = io.of('/noisers');

// when a player connects
players.on('connection', function (socket) {
    console.log('player logged in: '+socket.id);
});
    
//when a noiser connects
noisers.on('connection', function(socket) {
    console.log('noiser logged in: '+socket.id);
    //when a noiser send a sound
    socket.on('sound', function(data) {
        //io.to('players').emit('sound', data);
        //noisers.emit('sound', data);
        io.of('/players').emit('sound', data);
        console.log(data.sound);
    });
});


