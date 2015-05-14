var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var player = require('play-sound')(opts = {})
var port = 8080;

var play_from_terminal = true;

sounds = {
    // DRUM
    'beat':"drum/beat.wav",
    "clap":"drum/clap.wav",
    "clhat":"drum/clhat.wav",
    "click":"drum/click.wav",
    "drum":"drum/drum.wav",
    "ludwig":"drum/ludwig.wav",
    "piccolo":"drum/piccolo.wav",
    "tom":"drum/tom.wav",
    "tom2":"drum/tom2.wav",
    // PIANO
    "1-c1":"piano/1-c1.wav",
    "2-c1s":"piano/2-c1s.wav",
    "3-d1":"piano/3-d1.wav",
    "4-d1s":"piano/4-d1s.wav",
    "5-e1":"piano/5-e1.wav",
    "6-f1":"piano/6-f1.wav",
    "7-f1s":"piano/7-f1s.wav",
    "8-g1":"piano/8-g1.wav",
    "9-g1s":"piano/9-g1s.wav",
    "10-a1":"piano/10-a1.wav",
    "11-a1s":"piano/11-a1s.wav",
    "12-b1":"piano/12-b1.wav",
    "13-c2":"piano/13-c2.wav",
    // XYLO
    "a1x":"xylophone/A0.wav",
    "c1x":"xylophone/C0.wav",
    "d1x":"xylophone/D0.wav",
    "e1x":"xylophone/E0.wav",
    "g1x":"xylophone/G0.wav",
    "a2x":"xylophone/A.wav",
    "c2x":"xylophone/C.wav",
    "d2x":"xylophone/D.wav",
    "e2x":"xylophone/E.wav",
    "g2x":"xylophone/G.wav",
    "a3x":"xylophone/A1.wav",
    "c3x":"xylophone/C1.wav",
    "d3x":"xylophone/D1.wav",
    "e3x":"xylophone/E1.wav",
    "g3x":"xylophone/G1.wav",
    // MALLET
    "ma1x":"mallet/A0.wav",
    "mc1x":"mallet/C0.wav",
    "md1x":"mallet/D0.wav",
    "me1x":"mallet/E0.wav",
    "mg1x":"mallet/G0.wav",
    "ma2x":"mallet/A.wav",
    "mc2x":"mallet/C.wav",
    "md2x":"mallet/D.wav",
    "me2x":"mallet/E.wav",
    "mg2x":"mallet/G.wav",
    "ma3x":"mallet/A1.wav",
    "mc3x":"mallet/C1.wav",
    "md3x":"mallet/D1.wav",
    "me3x":"mallet/E1.wav",
    "mg3x":"mallet/G1.wav",
}

function synergicLoop(){
	els = Object.keys(sounds)
	s = Math.floor(Math.random()*els.length)
	sound = els[s]
	if(loop)
		player.play('sounds/'+sounds[sound])
	max_repeat_time = 2;
	min_repeat_time = 1;
	repeat_time = Math.random() * ( (max_repeat_time - min_repeat_time) + min_repeat_time ) * 1000;
	setTimeout(synergicLoop, repeat_time);
}

loop = false;

synergicLoop();

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
        io.of('/players').emit('sound', data);
        if(play_from_terminal)
            player.play('sounds/'+sounds[data.sound])
        console.log(data.sound);
    });
    socket.on('loop', function(data) {
	loop = data;
    });
});


