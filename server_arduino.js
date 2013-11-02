var current_money = 0;

var five = require("johnny-five");

var PIN_BUTTON_PHOTO 	= 1;
var PIN_BUTTON_NEXT 	= 2;
var PIN_BUTTON_PREV 	= 3;
var PIN_PHOTO_TEMPLATE 	= 4;
var PIN_PHOTO_GALLERY 	= 5;
var PIN_PHOTO_PRINT 	= 6;
var PIN_PHOTO_DELETE 	= 7;
var PIN_PHOTO_USB 		= 8;
var PIN_MONEY 			= 12;
var photo_pulse 		= 1;			//Define how many photo we can take with 1 pulse

var g_socket;

function init() {	
	new five.Board().on("ready", function() {
	  //Money management
	  this.pinMode(PIN_MONEY, five.Pin.INPUT);
	  this.digitalRead(PIN_MONEY, function(value) {
		if (value === this.HIGH) {
			add_photo();
		}
	  });
	});
}

/**
  * Add one photo credit
  */
function add_photo() {
	current_money += photo_pulse;
	console.log("Ajout d'une piece. Valeur " + current_money);
	var socket = require('./server').socket;
	g_socket.emit('coin');	//Send 1 new coin client
}

function setSocket(socket) {
	g_socket = socket;
}

exports.init = init;
exports.setSocket = setSocket;