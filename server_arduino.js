var five = require("johnny-five");

var PIN_BUTTON_PHOTO 	= 2;
var PIN_BUTTON_NEXT 	= 3;
var PIN_BUTTON_PREV 	= 4;
var PIN_BUTTON_TEMPLATE 	= 5;
var PIN_BUTTON_GALLERY 	= 6;
var PIN_BUTTON_PRINT 	= 7;
var PIN_BUTTON_DELETE 	= 8;
var PIN_BUTTON_USB 		= 9;
var PIN_MONEY 			= 12;

var photo_pulse 		= 1;			//Define how many photo we can take with 1 pulse

var g_socket;

function init() {	
	g_board = new five.Board().on("ready", function() {

    //Money management
	  this.pinMode(PIN_MONEY, five.Pin.INPUT);

	  this.digitalRead(PIN_MONEY, function(value) {
		if (value === this.HIGH) {
			add_photo();
		}
	  });
	  
	  //Photo button
	  buttonPhoto = new five.Button({
		pin: PIN_BUTTON_PHOTO,
		isPullup: true
	  });
	  
	  buttonPhoto.on("down", function(value){
		sendMessage('buttonPhoto');
	  });
	  
	  //Next button
	  buttonNext = new five.Button({
		pin: PIN_BUTTON_NEXT,
		isPullup: true
	  });
	  
	  buttonNext.on("down", function(value){
		sendMessage('buttonNext');
	  });
	  
	  //Prev button
	  buttonPrev = new five.Button({
		pin: PIN_BUTTON_PREV,
		isPullup: true
	  });
	  
	  buttonPrev.on("down", function(value){
		sendMessage('buttonPrev');
	  });
	  
	  //Template button	 
	  buttonTemplate = new five.Button({
		pin: PIN_BUTTON_TEMPLATE,
		isPullup: true
	  });
	  
	  buttonTemplate.on("down", function(value){
		sendMessage('buttonTemplate');
	  });
	  
	  //Gallery button	 
	  buttonGallery = new five.Button({
		pin: PIN_BUTTON_GALLERY,
		isPullup: true
	  });
	  
	  buttonGallery.on("down", function(value){
		sendMessage('buttonGallery');
	  });	 

	  //Print button	 
	  buttonPrint = new five.Button({
		pin: PIN_BUTTON_PRINT,
		isPullup: true
	  });
	  
	  buttonPrint.on("down", function(value){
		sendMessage('buttonPrint');
	  });

	  //Delete button	 
	  buttonDelete = new five.Button({
		pin: PIN_BUTTON_DELETE,
		isPullup: true
	  });
	  
	  buttonDelete.on("down", function(value){
		sendMessage('buttonDelete');
	  });

	  //Delete usb	 
	  buttonUsb = new five.Button({
		pin: PIN_BUTTON_USB,
		isPullup: true
	  });
	  
	  buttonUsb.on("down", function(value){
		sendMessage('buttonUsb');
	  });
	});
}

/**
  * Add one photo credit
  */
function add_photo() {
	console.log("Ajout d'une piece");
	g_socket.emit('coin');	//Send 1 new coin client
}

function setSocket(socket) {
	console.log('Socket set');
	g_socket = socket;
}

function sendMessage(button) {
	console.log('Message : ' + button);
	g_socket.emit(button);	//Send a message
}

exports.init = init;
exports.setSocket = setSocket;	