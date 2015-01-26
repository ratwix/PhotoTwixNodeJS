var five = require("johnny-five");

var PIN_BUTTON_PHOTO 	= 1;
var PIN_BUTTON_NEXT 	= 2;
var PIN_BUTTON_PREV 	= 3;
var PIN_BUTTON_TEMPLATE = 4;
var PIN_BUTTON_GALLERY 	= 5;
var PIN_BUTTON_PRINT 	= 8;
var PIN_BUTTON_DELETE 	= 9;
var PIN_BUTTON_USB 		= 10;
var PIN_BUTTON_GAME		= 11;
var PIN_MONEY 			= 12;
var PIN_LAMP 			= 6;

var photo_pulse 		= 1;			//Define how many photo we can take with 1 pulse

var light;

var light_value = 0;

var g_socket;

var g_isPhoto = true;

function init() {	
	g_board = new five.Board({port:"COM6"}).on("ready", function() {
	//Light management
	 light = new five.Led({
		pin: PIN_LAMP
	 });
	 
	 light.off();
	
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
		isPullup: true,
		holdtime: 3000 
	  });
	  
	  buttonNext.on("down", function(value){
		sendMessage('buttonNext');
	  });
	  
	  buttonNext.on("hold", function(value){
		plusLight();
	  });
	  
	  //Prev button
	  buttonPrev = new five.Button({
		pin: PIN_BUTTON_PREV,
		isPullup: true,
		holdtime: 3000 
	  });
	  
	  buttonPrev.on("down", function(value){
		sendMessage('buttonPrev');
	  });
	  
	  buttonPrev.on("hold", function(value){
		minLight();
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

	  //USB button	 
	  buttonUsb = new five.Button({
		pin: PIN_BUTTON_USB,
		isPullup: true,
		holdtime: 3000 //3 second hold for game to switch to properties
	  });
	  
	  buttonUsb.on("down", function(value){
		sendMessage('buttonUsb');
	  });
	  
	  buttonUsb.on("hold", function(value){
		sendMessage('buttonParameter');
	  });
	  
	  //Game button	 
	  buttonGame = new five.Button({
		pin: PIN_BUTTON_GAME,
		isPullup: true,
		holdtime: 3000 //3 second hold for game to switch to arcade
	  });
	  
	  buttonGame.on("down", function(value){
		sendMessage('buttonGame');
	  });
	  
	  buttonGame.on("hold", function(value){
		switchPhotoArcade();
	  });
	})
	.on("error", function(err) {
		
	});
}

function switchPhotoArcade() {
	if (g_isPhoto) {
		killChrome();
		launchHyperspin();
	} else {
		killHyperspin();
		launchChrome();
	}
	
	//kill Chrome
	
	//Launch Hyperspin
}

function launchChrome() {
	//On lance chrome
	var cmd = "Chrome.exe --incognito --kiosk https://localhost:1443/";

	var exec = require('child_process').exec,
				child;

	if (require('os').platform() == 'win32') {
		cmd = cmd.replace(/\//g, "\\"); //comment if linux system
		cmd = cmd.replace(/\\\.\\/g, "\\"); //comment if linux system
	}

	child = exec(cmd,
	  function (error, stdout, stderr) {
		if (error !== null) {
		  console.log('exec error: ' + error);
		}
	});
	
	g_isPhoto = true;
}

function killChrome() {
	//On lance chrome
	var cmd = "taskkill /IM chrome.exe";

	var exec = require('child_process').exec,
				child;

	child = exec(cmd,
	  function (error, stdout, stderr) {
		if (error !== null) {
		  console.log('exec error: ' + error);
		}
	});
	
	g_isPhoto = false;
}

function launchHyperspin() {
	//On lance chrome
	var cmd = "startup_hyperspin.bat";

	var exec = require('child_process').exec,
				child;

	child = exec(cmd,
	  function (error, stdout, stderr) {
		if (error !== null) {
		  console.log('exec error: ' + error);
		}
	});
	
	g_isPhoto = false;
}

function killHyperspin() {
	//On lance chrome
	var cmd = "taskkill /IM hyperspin.exe";

	var exec = require('child_process').exec,
				child;

	child = exec(cmd,
	  function (error, stdout, stderr) {
		if (error !== null) {
		  console.log('exec error: ' + error);
		}
	});
	
		//On lance chrome
	var cmd = "taskkill /IM hyperlaunch.exe";

	var exec = require('child_process').exec,
				child;

	child = exec(cmd,
	  function (error, stdout, stderr) {
		if (error !== null) {
		  console.log('exec error: ' + error);
		}
	});
	
	g_isPhoto = true;
}

/**
  * Add one photo credit
  */
function add_photo() {
	console.log("Ajout d'une piece");
	g_socket.emit('coin');	//Send 1 new coin client
}

function setSocket(socket) {
	console.log('Socket set Arduino');
	g_socket = socket;
}

function sendMessage(button) {
	console.log('Message : ' + button);
	g_socket.emit(button);	//Send a message
}

function changeLight(value) {
	light_value = value;
	if (value > 0) {
		light.on();
		light.brightness(value);
	} else {
		light.off();
	}
}

function plusLight() {
	light_value += 15;
	if (light_value > 150) {
		light_value = 150;
	}
	
	if (light_value > 0) {
		light.on();
		light.brightness(light_value);
	}
}

function minLight() {
	light_value -= 15;
	if (light_value < 0) {
		light_value = 0;
	}
	
	if (light_value > 0) {
		light.on();
		light.brightness(light_value);
	} else {
		light.off();
	}
}

exports.init = init;
exports.setSocket = setSocket;
exports.changeLight = changeLight;
exports.launchChrome = launchChrome;