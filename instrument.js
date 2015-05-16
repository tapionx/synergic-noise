
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

    // makes it easy to define keybindings in plugins but
    // WARNING: it limits the keycodes a plugin can bind...
    var keycode_to_char = {
        87: "W",
        65: "A",
        83: "S",
        68: "D",
        70: "F",
        71: "G",
        32: " "
    };
    $(document).on('keydown', function(e) {
        var keycode = e.which;
        if (key_to_sound !== undefined) {
            var letter = keycode_to_char[keycode];
            if (letter !== undefined) {
                play(key_to_sound[letter]);
                $('#'+key_to_sound[letter]).addClass('pressed');
                e.preventDefault(); // prevent the default action (scroll / move caret)
            }
        }
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

    $(document).on('mouseup touchend keyup', function(e) {
        $('.pressed').removeClass('pressed');
        e.preventDefault();
        return false;
    });
});
