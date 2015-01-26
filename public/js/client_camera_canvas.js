var g_effect_filter = [];
var g_current_effect_id = 0;
var g_photo_theme = [];
var g_photo_theme_id = 0;

var g_count_interval = 0;
var g_current_photo = 1;

var g_context_1;
var g_context_2;
var g_context_3;
var g_context_4;
var g_context_5;
var g_context_6;
var g_context_blank;

var canvas_glfx_effect = fx.canvas();
var texture_glfx_effect = canvas_glfx_effect.texture($("#basic_video")[0]);

//////////////////////////////////////////
////	Canvas management
//////////////////////////////////////////

function init_canvas_size() {
	canvas_photo_1.width = g_basic_video_x;
	canvas_photo_1.height = g_basic_video_y;
	canvas_photo_2.width = g_basic_video_x;
	canvas_photo_2.height = g_basic_video_y;
	canvas_photo_3.width = g_basic_video_x;
	canvas_photo_3.height = g_basic_video_y;
	canvas_photo_4.width = g_basic_video_x;
	canvas_photo_4.height = g_basic_video_y;
	canvas_photo_5.width = g_basic_video_x;
	canvas_photo_5.height = g_basic_video_y;
	canvas_photo_6.width = g_basic_video_x;
	canvas_photo_6.height = g_basic_video_y;	
	blank_canvas.width = g_basic_video_x;
	blank_canvas.height = g_basic_video_y;
}

function showVideo() {
	for (var i = 1; i <= g_nb_photo; i++) {
		$("#result_photo_" + i.toString())[0].style.display = 'none';
		$("#canvas_photo_" + i.toString())[0].style.display = 'block';
	}
}

//Dessiner toute les mignatures si elles sont visibles
function draw_canvas() {
	if ($("#canvas_photo_1")[0].style.display != "none") {
		g_context_1.drawImage(canvas_glfx_effect, 0, 0);
	}
	
	if ($("#canvas_photo_2")[0].style.display != "none") {
		g_context_2.drawImage(canvas_glfx_effect, 0, 0);
	}
	
	if ($("#canvas_photo_3")[0].style.display != "none") {
		g_context_3.drawImage(canvas_glfx_effect, 0, 0);
	}
	
	if ($("#canvas_photo_4")[0].style.display != "none") {
		g_context_4.drawImage(canvas_glfx_effect, 0, 0);
	}
	
	if ($("#canvas_photo_5")[0].style.display != "none") {
		g_context_5.drawImage(canvas_glfx_effect, 0, 0);
	}
	
	if ($("#canvas_photo_6")[0].style.display != "none") {
		g_context_6.drawImage(canvas_glfx_effect, 0, 0);
	}
}

//////////////////////////////////////////
////	Effect Management
//////////////////////////////////////////

function init_canvas_effect() {
	g_context_1 = $("#canvas_photo_1")[0].getContext('2d');
	g_context_2 = $("#canvas_photo_2")[0].getContext('2d');
	g_context_3 = $("#canvas_photo_3")[0].getContext('2d');
	g_context_4 = $("#canvas_photo_4")[0].getContext('2d');
	g_context_5 = $("#canvas_photo_5")[0].getContext('2d');
	g_context_6 = $("#canvas_photo_6")[0].getContext('2d');
	g_context_blank = $("#blank_canvas")[0].getContext('2d');

	//Add all effects
	g_effect_filter.push(effect_null);
	g_effect_filter.push(effect_grey);
	g_effect_filter.push(effect_sepia);
	g_effect_filter.push(effect_bright);
	g_effect_filter.push(effect_gotham);
	g_effect_filter.push(effect_bulb);
	g_effect_filter.push(effect_pinch);
	g_effect_filter.push(effect_swirl);
}

function draw_canvas_effect() {
	var basic_video = $("#basic_video")[0];

	//TEST
	texture_glfx_effect.loadContentsOf(basic_video);
	canvas_glfx_effect.draw(texture_glfx_effect).ink(0.25).update();
	//FIN TEST
	
	var blank_canvas_context = g_context_blank;
	blank_canvas_context.drawImage(basic_video, 0, 0, g_basic_video_x, g_basic_video_y);
	
	if (typeof(g_effect_filter[g_current_effect_id]) == "function") {
		g_effect_filter[g_current_effect_id]();
	}
}

function next_effect() {
	if (g_current_effect_id < g_effect_filter.length - 1) {
		g_current_effect_id++;
	} else {
		g_current_effect_id = 0;
	}
}

function prev_effect() {
	if (g_current_effect_id > 0) {
		g_current_effect_id--;
	} else {
		g_current_effect_id = g_effect_filter.length - 1;
	}
}

//////////////////////////////////////////
////	Effect Definition
//////////////////////////////////////////

var effect_null = function() {
	$("#effect_div img").removeClass("selected");
	$("#effect_blanc").addClass("selected");
	
	if (g_basic_video_x <= 0 || g_basic_video_y <= 0) return;	
	
	texture_glfx_effect.loadContentsOf($("#basic_video")[0]);
	canvas_glfx_effect.draw(texture_glfx_effect).update();
}

var effect_grey = function() {
	$("#effect_div img").removeClass("selected");
	$("#effect_bw").addClass("selected");
	
	if (g_basic_video_x <= 0 || g_basic_video_y <= 0) return;	
	
	texture_glfx_effect.loadContentsOf($("#basic_video")[0]);
	canvas_glfx_effect.draw(texture_glfx_effect).hueSaturation(0, -1).update();
}



var effect_sepia = function() {
	$("#effect_div img").removeClass("selected");
	$("#effect_sepia").addClass("selected");
	
	if (g_basic_video_x <= 0 || g_basic_video_y <= 0) return;	
	
	texture_glfx_effect.loadContentsOf($("#basic_video")[0]);
	canvas_glfx_effect.draw(texture_glfx_effect).sepia(1).update();
}

var effect_bright = function() {
	$("#effect_div img").removeClass("selected");
	$("#effect_light").addClass("selected");

	if (g_basic_video_x <= 0 || g_basic_video_y <= 0) return;

	texture_glfx_effect.loadContentsOf($("#basic_video")[0]);
	canvas_glfx_effect.draw(texture_glfx_effect).vignette(0.41, 0.32)
									.curves([ [0.00,0.00] , [0.23,0.19] , [0.47,0.53] , [0.65,0.72] , [1.00,1.00] ] , [ [0.00,0.00] , [0.20,0.23] , [0.46,0.40] , [0.76,0.78] , [1.00,1.00] ] , [ [0.00,0.00] , [0.26,0.16] , [0.54,0.50] , [0.76,0.72] , [1.00,1.00] ])
									.update();
}

var effect_swirl = function() {
	$("#effect_div img").removeClass("selected");
	$("#effect_swirl").addClass("selected");

	if (g_basic_video_x <= 0 || g_basic_video_y <= 0) return;

	texture_glfx_effect.loadContentsOf($("#basic_video")[0]);
	canvas_glfx_effect.draw(texture_glfx_effect).swirl(canvas_glfx_effect.width / 2, canvas_glfx_effect.height / 2, canvas_glfx_effect.height / 2, 2.5).update();
}

var effect_bulb = function() {
	$("#effect_div img").removeClass("selected");
	$("#effect_bulb").addClass("selected");

	if (g_basic_video_x <= 0 || g_basic_video_y <= 0) return;

	texture_glfx_effect.loadContentsOf($("#basic_video")[0]);
	canvas_glfx_effect.draw(texture_glfx_effect).bulgePinch(canvas_glfx_effect.width / 2, canvas_glfx_effect.height / 2, canvas_glfx_effect.height / 2, 0.85).update();
}

var effect_pinch = function() {
	$("#effect_div img").removeClass("selected");
	$("#effect_pinch").addClass("selected");

	if (g_basic_video_x <= 0 || g_basic_video_y <= 0) return;

	texture_glfx_effect.loadContentsOf($("#basic_video")[0]);
	canvas_glfx_effect.draw(texture_glfx_effect).bulgePinch(canvas_glfx_effect.width / 2, canvas_glfx_effect.height / 2, canvas_glfx_effect.height / 2, -0.60).update();
}

var effect_gotham = function() {
	$("#effect_div img").removeClass("selected");
	$("#effect_gotham").addClass("selected");

	if (g_basic_video_x <= 0 || g_basic_video_y <= 0) return;

	texture_glfx_effect.loadContentsOf($("#basic_video")[0]);
	canvas_glfx_effect.draw(texture_glfx_effect).vignette(0.41, 0.32)
									.unsharpMask(40, 3)
									.curves([ [0.00,0.00] , [0.06,0.01] , [0.25,0.10] , [0.36,0.16] , [0.50,0.26] , [0.55,0.33] , [0.64,0.45] , [0.75,0.65] , [0.88,0.84] , [0.94,0.92] , [1.00,1.00] ] , [ [0.00,0.00] , [0.06,0.01] , [0.25,0.07] , [0.36,0.15] , [0.50,0.28] , [0.55,0.34] , [0.64,0.47] , [0.75,0.65] , [0.88,0.83] , [0.94,0.91] , [1.00,1.00] ] , [ [0.00,0.00] , [0.06,0.00] , [0.25,0.09] , [0.36,0.19] , [0.50,0.35] , [0.55,0.39] , [0.64,0.49] , [0.75,0.59] , [0.88,0.77] , [0.94,0.89] , [1.00,1.00] ])
									.hueSaturation(0, -0.9).update();
}

//////////////////////////////////////////
////	Photo theme
//////////////////////////////////////////

function next_photo_theme() {
	showVideo();
	if (g_photo_theme_id < g_photo_theme.length - 1) {
		g_photo_theme_id++;
	} else {
		g_photo_theme_id = 0;
	}
	g_photo_theme[g_photo_theme_id]();
}

function prev_photo_theme() {
	showVideo();
	if (g_photo_theme_id > 0) {
		g_photo_theme_id--;
	} else {
		g_photo_theme_id = g_photo_theme.length - 1;
	}	
	g_photo_theme[g_photo_theme_id]();
}

//////////////////////////////////////////
////	Take photo
//////////////////////////////////////////


function startPhotoProcess() {
	g_photo_in_progress = true;
	updateLightMinOn();
	startSinglePhotoProcess(g_parameter.photo_initial_delay);
	g_current_photo = 1;
	showVideo();
}



function startSinglePhotoProcess(delay) {
	count = delay;
	$("#photo_countdown")[0].style.display = 'block';
	photoCountdown();
	g_count_interval = setInterval(photoCountdown, 1000); //on decrois toute les seconde
}

function photoCountdown() {
	camera_show();
	$("#photo_countdown")[0].innerHTML = count;
	if (count > 0) {
		g_count_sound.play();
		count--;
	} else {
		clearInterval(g_count_interval);
		$("#photo_countdown")[0].style.display = 'none';
		takePhoto(g_current_photo);
		if (g_current_photo < g_nb_photo) {
			g_current_photo++;
			setTimeout(startSinglePhotoProcess.bind(null, g_parameter.photo_delay), 1500); //Little delay between two timeout
		} else {
			showLoading();
			compileAllPhoto();
			updateLightMinOff();
		}
	}
}

function takePhoto(current_photo) {
	$("#camera_flash").show().delay(250).fadeOut(250);
	g_photo_sound.play();	
	var png_effect = canvas_glfx_effect.toDataURL('image/png');
	var png_blank = $("#blank_canvas")[0].toDataURL();
	
	var cur_img = $("#result_photo_" + current_photo.toString())[0];
	var cur_video = $("#canvas_photo_" + current_photo.toString())[0];
	
	cur_img.src = png_effect;
	cur_img.src_blank = png_blank;
	cur_img.style.display = 'block';
	cur_video.style.display = 'none';
}

function compileAllPhoto() {
	build_photo();
}