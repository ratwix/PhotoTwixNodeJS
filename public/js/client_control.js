/**
	Init all controls
*/

function initControl() {
	init_arduino_control();
	init_keyboard_control();
}

function init_arduino_control() {
	g_socket.on('coin', function (data) { //When receive a new coin (1coin = 1 credit. For bigger coin, receive several pulse
	   g_parameter.current_credit += 1;
	   console.log("CASH !!! Credit:" + g_parameter.current_credit);
	   saveParameters(); //save parameter if power down, not loosing credit
	});
}

function init_keyboard_control() {
	
}


