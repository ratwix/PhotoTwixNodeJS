function init_photomaton() {
	initTemplates();
	initSocket();
	getParameter();
	initCamera();
	init_copy_socket();
	initControl();
	requestAllPhoto();
}

//Initialise la connexion avec le server node.js avec https
function initSocket() {
	g_socket = io.connect(g_server_address, {secure: true});
}

function initTemplates(callback) {
	$.post( "getTemplates")
		.done(function(data) {
			console.log('Get template OK');
			$("#templates_edit").html("<div class=\"choose choose_large\">\n" + data);
			if (typeof(callback) == "function") {
				callback();
			}
		})
		.fail(function(data) {
			console.log('Echec de récupération des templates');
			if (typeof(callback) == "function") {
				callback();
			}			
		});
}

//Initialise la webcam
function initCamera() {
	var onFaild = function(e) {
		alert('Sorry, the browser you are using doesn\'t support getUserMedia');
	};

	function hasGetUserMedia() {
		return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia || navigator.msGetUserMedia);
	}

	if (hasGetUserMedia()) {
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
		window.URL = window.URL || window.webkitURL;
		//On récupère la camera
		navigator.getUserMedia({video: {
										mandatory: {
											minWidth: 1024
										}}}, 
		
							function(localMediaStream) {
								var video = $("#basic_video")[0];
								
								var url = window.URL || window.webkitURL;
								video.src = url ? url.createObjectURL(localMediaStream) : localMediaStream;
								video.play();
							}, onFaild
		);
	}
	
	var basic_video = $("#basic_video")[0];
	
	//On initialise la video
	basic_video.addEventListener('canplay', function(e) {
	   if (!g_is_streaming) {
		  // videoWidth isn't always set correctly in all browsers
		  if (basic_video.videoWidth > 0) {
			g_basic_video_x = basic_video.videoWidth;
			g_basic_video_y = basic_video.videoHeight;
			g_is_streaming = true;
			
			//initialisation canvas
			init_canvas_size();
			init_canvas_effect();
		  }
	   }
	}, false);
	
	//On met a jour les differents canvas
	basic_video.addEventListener('play', function(e) {
	   setInterval(function() {
		  if (basic_video.paused || basic_video.ended) return;
		  draw_canvas_effect();
		  draw_canvas();
	   }, g_refresh_rate);
	}, false);
}