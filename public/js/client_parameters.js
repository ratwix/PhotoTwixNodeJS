 /**
	Get server parameters
  */
function getParameter() {
	$.get( "getParameters", function(data) {
		g_parameter = JSON.parse(data);
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
		})
		.fail(function(data) {
			console.log('Fail reset parameters');
		});
}

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
	
	
	g_parameter.printer_rx1 = printer_rx1;
	g_parameter.use_money = (price == 0 ? false : true);
	g_parameter.photo_price = price;
	g_parameter.current_credit = current_credit;
	g_parameter.photo_initial_delay = photo_initial_delay;
	g_parameter.photo_delay = photo_delay;
	g_parameter.real_delete = real_delete;
	
	saveParameters();
}

function updateLight() {
	var light = $('#parameter_light').val();
	//TODO : envoyer par socket la valeur de la lumiere pour update du teensy
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
