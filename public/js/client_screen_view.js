function hideAll() {
	$("body").attr('class', 'normal');
	$("#screen_photo_take")[0].style.display = 'none';
	$("#screen_coverflow")[0].setAttribute('class', 'coverflow_hide');
	$("#parameters")[0].style.display = 'none';
	$("#usb")[0].style.display = 'none';
    $("#loading")[0].style.display='none';
	show_credit();

} 
 
function show_credit() {
	if (g_parameter.photo_price != 0) { //Si le prix est != 0 alors on affiche le credit
		$("#current_credit")[0].style.display = 'block';		
	} else {
		$("#current_credit")[0].style.display = 'none';	
	}
	
	if (g_parameter.photo_price == 1) {
		$("#current_credit")[0].innerHTML = "Impression : " + g_parameter.current_credit + " photos (0.5€)";
		$("#money_cost")[0].innerHTML = "0.5€";
	} else if (g_parameter.photo_price == 2) {
		$("#current_credit")[0].innerHTML = "Impression : " + (g_parameter.current_credit * 0.5) + " photos (1€)";
		$("#money_cost")[0].innerHTML = "1€";
	} else if (g_parameter.photo_price == 4) {
		$("#current_credit")[0].innerHTML = "Impression : " + (g_parameter.current_credit * 0.25) + " photos (2€)";
		$("#money_cost")[0].innerHTML = "2€";
	} else {
	
	}
}
 
function show_insert_money() {
	$("#screen_insert_money").show();
	
	setTimeout(function() {
		$("#screen_insert_money").hide();
	}, 3000);
}

function hide_insert_money() {
	$("#screen_insert_money").hide();
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
	parameterToForm();								//update form with current parameters
	$("body").attr('class', 'parameter');
	$("#parameters")[0].style.display = 'block';
}

function parameter_active() {
	if ($("#parameters")[0].style.display == 'block') {
		return true;
	}
	return false;
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

//Show the loading point
function showLoading() {
        $("#loading")[0].style.display='block';        
}

function hideLoading() {
        $("#loading")[0].style.display='none';        
}