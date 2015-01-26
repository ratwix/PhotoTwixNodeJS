 /**
	Get server parameters
  */
function getParameter() {
	$.get( "getParameters", function(data) {
		g_parameter = JSON.parse(data);
		parameterToForm();
		loadTheme();
		
		//Init control if in debug mode
		if (g_parameter.debug) {
			init_keyboard_control();
		}
	});
}

function saveParameters() {
	$.post( "saveParameters", {param : JSON.stringify(g_parameter)})
		.done(function(data) {
			show_credit();
			console.log('Parameter saved');
		})
		.fail(function(data) {
			console.log('Fail save parameters');
		});
}

function resetParameters() {
	$.post( "resetParameters", {})
		.done(function(data) {
			getParameter();
			$(".button_reedit").removeClass("button_reedit");
		})
		.fail(function(data) {
			console.log('Fail reset parameters');
		});
}

/**
  * Update form from g_parameter
  */
/**
  * Update form from g_parameter
  */
function parameterToForm() {
	$('#parameter_rx1').attr('checked', g_parameter.printer_rx1);
	$('#parameter_photo_initial_delay').val(g_parameter.photo_initial_delay);
	$('#parameter_photo_delay').val(g_parameter.photo_delay);
	$('#parameter_current_credit').val(g_parameter.current_credit);
	$('#parameter_real_delete').attr('checked', g_parameter.real_delete);
	$('input[name=parameter_price]').filter('[value=' + g_parameter.photo_price + ']').prop('checked', true);
	$('#parameter_gallery_name').val(g_parameter.gallery_name);
	$('#parameter_gallery_password').val(g_parameter.gallery_password);
	$('#parameter_gallery_private').attr('checked', g_parameter.gallery_private);
	$('#parameter_gallery_automatic_upload').attr('checked', g_parameter.gallery_autoupload);
	
	if (g_parameter.templates) {
		//Les templates
		for (var i = 0; i < g_parameter.templates.length; i++) {
			var o = g_parameter.templates[i];
			$('#' + o.name).attr('checked', o.checked);
		}
	}
}

/**
  * Update g_parameter from form
  */
function formToParameter() {
	var printer_rx1 = $('#parameter_rx1').is(':checked');
	var photo_initial_delay = parseInt($('#parameter_photo_initial_delay').val());
	var photo_delay = parseInt($('#parameter_photo_delay').val());
	var current_credit = parseInt($('#parameter_current_credit').val());
	var price = $('input[name=parameter_price]:checked', '#price').val()
	var real_delete = $('#parameter_real_delete').is(':checked');
	var gallery_name = $('#parameter_gallery_name').val();
	var gallery_private = $('#parameter_gallery_private').is(':checked');
	var gallery_password = $('#parameter_gallery_password').val();
	var gallery_autoupload = $('#parameter_gallery_automatic_upload').is(':checked');
	
	g_parameter.printer_rx1 = printer_rx1;
	g_parameter.use_money = (price == 0 ? false : true);
	g_parameter.photo_price = price;
	g_parameter.current_credit = current_credit;
	g_parameter.photo_initial_delay = photo_initial_delay;
	g_parameter.photo_delay = photo_delay;
	g_parameter.real_delete = real_delete;
	g_parameter.gallery_name = gallery_name;
	g_parameter.gallery_private = gallery_private;
	g_parameter.gallery_password = gallery_password;
	g_parameter.gallery_autoupload = gallery_autoupload;
	
	
	/* Save templates */
	var templates = $('.template_item_check');
	templates.each(function() {		
		var object = new Object();;
		
		object.name = this.getAttribute('name');
		object.checked = this.checked;
		object.template_css = this.getAttribute('template_css');
		object.nb_photos = this.getAttribute('nb_photos');
		object.img_path = this.getAttribute('img_path');
		object.img_cut = this.getAttribute('img_cut');
		//Ajout d'autres elements
		
		if (!g_parameter.templates) {
			g_parameter.templates = [];
		}
		
		g_parameter.templates.push(object);
	});
	
	saveParameters();
}

function modTemplate() {
	//TODO renew parameters
	loadTheme();
	formToParameter();
}

function updateLight() {
	var light = $('#parameter_light').val();
	//TODO : envoyer par socket la valeur de la lumiere pour update du teensy
	g_socket.emit('socket_led', light);
}

function updateLightMinOn() {
	var light = $('#parameter_light').val();
	
	if (light < 22) {
		g_socket.emit('socket_led', 22);
	}
}

function updateLightMinOff() {
	var light = $('#parameter_light').val();

	g_socket.emit('socket_led', light);
}

function plusLight() {
	var light = $('#parameter_light').val();
	light = parseInt(light) + 1;
	if (light <= $('#parameter_light').attr('max')) {
		$('#parameter_light').val(light);
		updateLight();
	}
}

function minLight() {
	var light = $('#parameter_light').val();
	light = parseInt(light) - 1;
	if (light >= $('#parameter_light').attr('min')) {
		$('#parameter_light').val(light);
		updateLight();
	}
}

function deleteAll() {
	$.post( "deleteAll", {})
		.done(function(data) {
			location.assign(location.href);
		})
		.fail(function(data) {
			console.log('Fail deleteAll');
		});
}

function changeText() {
	var text = {
		"text1":$("#text1").val(),
		"text2":$("#text2").val(),
		"text3":$("#text3").val()
	}
	
	var json = JSON.stringify(text);
	
	$.post( "changeText", {value : json})
		.done(function(data) {
			console.log('Text changed');
		})
		.fail(function(data) {
			console.log('Fail text change');
		});
}

function changePrivateGallery() {
	var private_gallery = $('#parameter_gallery_private').is(':checked');
	
	if (private_gallery) {
		$('#parameter_gallery_password_label').show();
		$('#parameter_gallery_password').show();
	} else {
		$('#parameter_gallery_password_label').hide();
		$('#parameter_gallery_password').hide();	
	}
	
	formToParameter();
}

function changeAutomaticUploadGallery() {
	formToParameter();
}

function uploadAllPhotosGallery() {
	$.post( "uploadAllPhotos")
		.done(function(data) {
			console.log('Photos uploaded');
		})
		.fail(function(data) {
			console.log('Fail upload photos');
		});
}
