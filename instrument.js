
var socket = io(window.location.host+'/noisers');

function play(sound) {
    socket.emit('sound', {'sound': sound});        
}

$(document).ready(function() {

    window.touched = null;

    $(document).on('touchmove', function(e) {
        x = e.originalEvent.touches[0].clientX;
        y = e.originalEvent.touches[0].clientY;
        el = document.elementFromPoint(x,y).id;
        if(window.touched !== el && $('#'+el).hasClass('beat')) {
            $('#'+window.touched).removeClass('pressed');
            window.touched = el;
            play(el);
            $('#'+el).addClass('pressed');
            e.preventDefault();
            return false;
        }
    });

    $(document).on('keydown', function(e) {
        var key_to_sound = {
            87: "1-c1",
            65: "2-c1",
            83: "3-d1",
            68: "4-d1",
            70: "5-e1",
            71: "6-f1"
        }
        switch(e.which) {
            case 87: 
            case 65: 
            case 83: 
            case 68: 
            case 70: 
            case 71: 
                break;
            default: return; // exit this handler for other keys
        }
        play(key_to_sound[e.which]);
        e.preventDefault(); // prevent the default action (scroll / move caret)
        return;
    });

    $('.beat').on('mousedown touchstart', function(e){
        el = $(this).attr('id');
        window.touched = el;
        play(el);
        $(this).addClass('pressed');
        e.preventDefault();
        return false;
    });

    $('.beat').on('mouseup touchend', function(e) {
        $('.pressed').removeClass('pressed');
        e.preventDefault();
        return false;
    });
});
