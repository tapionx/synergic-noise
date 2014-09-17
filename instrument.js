
var socket = io(window.location.host+'/noisers');

function play(sound) {
    socket.emit('sound', {'sound': sound});        
}

$(document).ready(function() {
    $('.beat').on('mousedown touchstart', function(e){
        sound = $(this).attr('id');
        play(sound);
        $(this).addClass('pressed');
        e.preventDefault();
        return false;
    });
    $('.beat').on('mouseup touchend', function(e) {
        $(this).removeClass('pressed');
        e.preventDefault();
        return false;
    });
});
