var g_effect_filter = [];
var g_current_effect_id = 0;
var g_photo_theme = [];
var g_photo_theme_id = 0;

var g_count_interval = 0;
var g_current_photo = 1;

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
	var effect_canvas = $("#effect_canvas")[0];

	for (var i = 1; i <= 6; i++) {
		if ($("#canvas_photo_" + i.toString())[0].style.display != "none")
			$("#canvas_photo_" + i.toString())[0].getContext('2d').drawImage(effect_canvas, 0, 0);
	}
}

//////////////////////////////////////////
////	Effect Management
//////////////////////////////////////////

function init_canvas_effect() {
	var effect_canvas = $("#effect_canvas")[0];
	var effect_canvas_context = effect_canvas.getContext('2d');
	effect_canvas_context.translate(g_basic_video_x, 0);
    effect_canvas_context.scale(-1, 1);
	//Add all effects
	g_effect_filter.push(effect_null);
	g_effect_filter.push(effect_grey);
	g_effect_filter.push(effect_sepia);
	g_effect_filter.push(effect_bright);
	//g_effect_filter.push(effect_bright);
}

function draw_canvas_effect() {
	var basic_video = $("#basic_video")[0];
	var effect_canvas = $("#effect_canvas")[0];
	var effect_canvas_context = effect_canvas.getContext('2d');
	var blank_canvas = $("#blank_canvas")[0];
	var blank_canvas_context = blank_canvas.getContext('2d');
	effect_canvas_context.drawImage(basic_video, 0, 0, g_basic_video_x, g_basic_video_y);
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
	return 0;
}

var effect_grey = function() {

	if (g_basic_video_x <= 0 || g_basic_video_y <= 0) return;

   var effect_canvas = $("#effect_canvas")[0];
   var effect_canvas_context = effect_canvas.getContext('2d');

   var imageData = effect_canvas_context.getImageData(0, 0, g_basic_video_x, g_basic_video_y);
   var data = imageData.data;
   for (var i = 0; i < data.length; i += 4) {
      var bright = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
      data[i] = bright;
      data[i + 1] = bright;
      data[i + 2] = bright;
   }
   effect_canvas_context.putImageData(imageData, 0, 0);
}

var effect_sepia = function() {

   if (g_basic_video_x <= 0 || g_basic_video_y <= 0) return;

   var effect_canvas = $("#effect_canvas")[0];
   var effect_canvas_context = effect_canvas.getContext('2d');

   var imageData = effect_canvas_context.getImageData(0, 0, g_basic_video_x, g_basic_video_y);
   var data = imageData.data;
   for (var i = 0; i < data.length; i += 4) {	  
		var or = data[i];
		var og = data[i + 1];
		var ob = data[i + 2];
	
		var r = (or * 0.393 + og * 0.769 + ob * 0.189);
		var g = (or * 0.349 + og * 0.686 + ob * 0.168);
		var b = (or * 0.272 + og * 0.534 + ob * 0.131);
	  
		if (r < 0) r = 0; if (r > 255) r = 255;
		if (g < 0) g = 0; if (g > 255) g = 255;
		if (b < 0) b = 0; if (b > 255) b = 255;
	  
		data[i] = r;
		data[i + 1] = g;
		data[i + 2] = b;
   }
   effect_canvas_context.putImageData(imageData, 0, 0);
}


var effect_bright = function() {

	if (g_basic_video_x <= 0 || g_basic_video_y <= 0) return;

   var effect_canvas = $("#effect_canvas")[0];
   var effect_canvas_context = effect_canvas.getContext('2d');

   var imageData = effect_canvas_context.getImageData(0, 0, g_basic_video_x, g_basic_video_y);
   var data = imageData.data;


	var brightMul = 1.2;
	var contrast = 1.3;
	var p = g_basic_video_x * g_basic_video_y;
	var pix = p*4, pix1, pix2;
	
	var r, g, b;
	while (p--) {
		if ((r = data[pix-=4] * brightMul * contrast) > 255 )
			data[pix] = 255;
		else if (r < 0)
			data[pix] = 0;
		else
			data[pix] = r;

		if ((g = data[pix1=pix+1] * brightMul * contrast) > 255 ) 
			data[pix1] = 255;
		else if (g < 0)
			data[pix1] = 0;
		else
			data[pix1] = g;

		if ((b = data[pix2=pix+2] * brightMul * contrast) > 255 ) 
			data[pix2] = 255;
		else if (b < 0)
			data[pix2] = 0;
		else
			data[pix2] = b;
	}
	effect_canvas_context.putImageData(imageData, 0, 0);
	
}

//Get average chroma key
function effect_init_chroma_key() {
	g_current_effect = effect_null;
	
	if (g_basic_video_x <= 0 || g_basic_video_y <= 0) return;

	var effect_canvas = $("#effect_canvas")[0];
	var effect_canvas_context = effect_canvas.getContext('2d');
	var imageData = effect_canvas_context.getImageData(0, 0, g_basic_video_x, g_basic_video_y);
	var data = imageData.data;
	
	var mr = 0;
	var mg = 0;
	var mb = 0;
	
	for (var i = 0; i < data.length; i += 4) {	  
		mr += data[i];
		mg += data[i + 1];
		mb += data[i + 2];
	}
   
	g_chroma_key[0] = mr / (data.length / 4);
	g_chroma_key[1] = mg / (data.length / 4);
	g_chroma_key[2] = mb / (data.length / 4);
	alert(g_chroma_key[0] + " " + g_chroma_key[1] + " " + g_chroma_key[2]);
}

var effect_chroma = function chroma_key_effect() {
	if (g_basic_video_x <= 0 || g_basic_video_y <= 0) return;
	if (g_chroma_key[0] == 0 && g_chroma_key[1] == 0 && g_chroma_key[2] == 0) return;

	var effect_canvas = $("#effect_canvas")[0];
	var effect_canvas_context = effect_canvas.getContext('2d');
	var imageData = effect_canvas_context.getImageData(0, 0, g_basic_video_x, g_basic_video_y);
	var data = imageData.data;
	
	//Step 1 : define transparent pixel
	for (var i = 0; i < data.length; i += 4) {	  
		if ((data[i] - g_chroma_key_tolerence < g_chroma_key[0]) && 
			(data[i] + g_chroma_key_tolerence > g_chroma_key[0]) &&
			(data[i + 1] - g_chroma_key_tolerence < g_chroma_key[1]) && 
			(data[i + 1] + g_chroma_key_tolerence > g_chroma_key[1]) &&
			(data[i + 2] - g_chroma_key_tolerence < g_chroma_key[2]) && 
			(data[i + 2] + g_chroma_key_tolerence > g_chroma_key[2])) {
				data[i] = 0;
				data[i] = 255;
				data[i] = 0;
		}
	}
	
	//Step 3 : draw front
	effect_canvas_context.putImageData(imageData, 0, 0);
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
	startSinglePhotoProcess(g_photo_initial_delay);
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
			setTimeout(startSinglePhotoProcess.bind(null, g_photo_delay), 1500); //Little delay between two timeout
		} else {
			compileAllPhoto();
		}
		
	}
}

function takePhoto(current_photo) {
	g_photo_sound.play();
	$("#camera_flash").show().delay(250).fadeOut(250);
	var png_effect = $("#effect_canvas")[0].toDataURL();
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
	g_photo_in_progress = false;
}