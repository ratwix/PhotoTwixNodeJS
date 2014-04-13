/**
	Init all controls
*/

var alt_press = false;
var ctrl_press = false;

function initControl() {
	init_arduino_control();
}

function init_arduino_control() {
	//Coin management	
	g_socket.on('coin', function (data) { //When receive a new coin (1coin = 1 credit. For bigger coin, receive several pulse
	   addCredit();

	});
	
	//Keys management
	g_socket.on('buttonPhoto', function (data) { //When buttonPhoto is press
	   buttonPhoto();
	});
	
	g_socket.on('buttonNext', function (data) { //When buttonNext is press
	   buttonNext();
	});
	
	g_socket.on('buttonPrev', function (data) { //When buttonPrev is press
	   buttonPrev();
	});	
	
	g_socket.on('buttonTemplate', function (data) { //When buttonTemplate is press
	   buttonTemplate();
	});	

	g_socket.on('buttonGallery', function (data) { //When button buttonGallery is press
	   buttonGallery();
	});	

	g_socket.on('buttonPrint', function (data) { //When button buttonPrint is press
	   buttonPrint();
	});	

	g_socket.on('buttonDelete', function (data) { //When button buttonDelete is press
	   buttonDelete();
	});	

	g_socket.on('buttonUsb', function (data) { //When button buttonUsb is press
	   buttonUsb();
	});	

	g_socket.on('buttonGame', function (data) { //When button buttonGame is press
	   buttonGame();
	});	
	
	g_socket.on('buttonParameter', function (data) { //When button buttonParameter is press (hold USB button)
	   buttonParameter();
	});
}

function init_keyboard_control() {
	$("body").keypress(function(event) {	
		//if (alt_press && ctrl_press) {
			switch(event.which) {
				case "z".charCodeAt(0): 			// Z for Photo
					buttonPhoto();
					break;
				case "n".charCodeAt(0): 
					buttonNext();	// N for next
					break;
				case "p".charCodeAt(0): 			// P for prev
					buttonPrev();
					break;
				case "t".charCodeAt(0): 			//	T for template
					buttonTemplate();
					break;
				case "g".charCodeAt(0): 
					buttonGallery();//	G for Gallery
					break;
				case "i".charCodeAt(0): 
					buttonPrint(); // I for Print
					break;
				case "d".charCodeAt(0):
					buttonDelete();	// D for delete
					break;
				case "j".charCodeAt(0):
					buttonGame();	// J for game
					break;
				case "c".charCodeAt(0):			// C for credit
					addCredit();
					break;
				case "u".charCodeAt(0):			// U for USB
					buttonUsb();
					break;
				case "q".charCodeAt(0):			// Q for parameter
					buttonParameter();
					break;				
				default:
					break;
			}
		//}
	});
	
	$("body").keyup(function(event) {
		if (event.which == 18) {
			alt_press = false;
		}
		
		if (event.which == 17) {
			ctrl_press = false;
		}
	});
	
	$("body").keydown(function(event) {
		if (event.which == 16) {
			alt_press = true;
		}
		
		if (event.which == 17) {
			ctrl_press = true;
		}
	});	
}

//Add a credit when coin inserted
function addCredit() {
	g_parameter.current_credit += 1;
	saveParameters(); //save parameter if power down, not loosing credit
	//console.log("CASH !!! Credit:" + g_parameter.current_credit);
	hide_insert_money();
	show_credit();
}

/******************************
	** Workflow management
******/

function buttonPhoto() {
	console.log('buttonPhoto');
	if (g_photo_in_progress == false) { //We are not in a photo process
		if (camera_active()) {		//If on photo screen, take a photo
			startPhotoProcess();
		} else {
			showVideo();
			camera_show();			//Else go to camera
		}
	}
}

function buttonNext() {
	console.log('buttonNext');
	if (camera_active()) {		//If camera active, next effect
		next_effect();
	} else if (gallery_active()) {
		gallery_next();			//Else next photo gallery
	} else if (parameter_active()) {
		plusLight();
	}
}

function buttonPrev() {
	console.log('buttonPrev');
	if (camera_active()) {		//If camera active, prev effect
		prev_effect();
	} else if (gallery_active()) {
		gallery_prev();			//Else previous photo gallery
	} else if (parameter_active()) {
		minLight();
	}
}

function buttonTemplate() {
	console.log('buttonTemplate');
	if (g_photo_in_progress == false) { //We are not in a photo process
		if (camera_active()) {		//If camera active next photo theme
			next_photo_theme();
		}
	}
}

function buttonGallery() {
	console.log('buttonGallery');
	if (g_photo_in_progress == false) { //We are not in a photo process	
		if (camera_active()) {		//If camera active, prev effect
			gallery_show();
		}
	}
}

function buttonPrint() {
	console.log('buttonPrint');
	if (g_photo_in_progress == false) { //We are not in a photo process	
		if (gallery_active()) {
			gallery_print();			//Else previous photo gallery
		}
	}
}

function buttonDelete() {
	console.log('buttonDelete');
	if (g_photo_in_progress == false) { //We are not in a photo process
		if (gallery_active()) {
			gallery_delete();			//Else previous photo gallery
		}
	}
}

function buttonUsb() {
	console.log('buttonUsb');
	if (!usb_active()) {				//If USB screen is not set, the show USB screen
		init_first_usb_copy_screen();
	} else {
		usb_copy_start();
	}
}

function buttonGame() {
	console.log('buttonGame');
	//TODO, create games
}

function buttonParameter() {
	show_parameter();
}
