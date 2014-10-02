
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
