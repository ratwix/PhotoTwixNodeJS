function hideAll() {
	$("#screen_photo_take")[0].style.display = 'none';
	$("#screen_coverflow")[0].setAttribute('class', 'coverflow_hide');
	$("#parameters")[0].style.display = 'none';
	$("#usb")[0].style.display = 'none';
} 
 
 function gallery_active() {
	if ($("#screen_coverflow")[0].getAttribute('class') == 'coverflow_show') {
		return true;
	} else {
		return false;
	}
}

// On veut voir toute les photos
function gallery_show() {
	hideAll();
	$("#screen_coverflow")[0].setAttribute('class', 'coverflow_show');
}

function camera_active() {
	if ($("#screen_photo_take")[0].style.display == 'none') {
		return false;
	} else {
		return true;
	}	
}

function camera_show() {
	hideAll()
	$("#screen_photo_take")[0].style.display = 'block';
}

function show_parameter() {
	hideAll();
	$("#parameters")[0].style.display = 'block';
}

function show_usb() {
	hideAll();
	$("#usb")[0].style.display = 'block';
}

function usb_active() {
	if ($("#usb")[0].style.display == 'block') {
		return true;
	}
	return false;
}