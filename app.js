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

var player;

io.on('connection', function (socket) {

    var s = socket;

    //socket.emit('news', { hello: 'world' });

    socket.on('player', function (data) {
        player = s;
        console.log('player logged in: '+s.id);
    });

    socket.on('sound', function (data) {
        if(player) {
            player.emit('sound', data);
            console.log(data.sound);
        } else {
            console.log('player not connected yet, visit /player.html');
        }
    });
});

