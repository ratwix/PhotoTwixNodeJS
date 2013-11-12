/**
	Init all controls
*/

function initControl() {
	init_arduino_control();
	init_keyboard_control();
}

function init_arduino_control() {
	//Coin management	
	g_socket.on('coin', function (data) { //When receive a new coin (1coin = 1 credit. For bigger coin, receive several pulse
	   addCredit();
	   saveParameters(); //save parameter if power down, not loosing credit
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
	
	
}

function init_keyboard_control() {
	
}

//Add a credit when coin inserted
function addCredit() {
	g_parameter.current_credit += 1;
	console.log("CASH !!! Credit:" + g_parameter.current_credit);
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
	}
}

function buttonPrev() {
	console.log('buttonPrev');
	if (camera_active()) {		//If camera active, prev effect
		prev_effect();
	} else if (gallery_active()) {
		gallery_prev();			//Else previous photo gallery
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
	//TODO
}

function buttonGame() {
	console.log('buttonGame');
	//TODO
}

