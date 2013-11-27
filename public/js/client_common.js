var g_basic_video_x = 0;
var g_basic_video_y = 0;
var g_is_streaming = false;

var g_gl_canvas = "";
var g_gl_texture = "";

var g_refresh_rate = 10;

var g_photo_initial_delay = 2;
var g_photo_delay = 1;

var g_parameter = "";

//Internal change

var g_socket = 0;
var g_server_address = 'https://localhost:1443';

var g_chroma_key = [0, 0, 0]; //chroma key R G B
var g_chroma_key_tolerence = 20;
var g_current_effect = function() {};

var g_nb_photo = 1;
var g_photo_cut = false;

var	g_count_sound = new Audio("./sound/bip.ogg");
var	g_photo_sound =  new Audio("./sound/photo.ogg");

var g_photo_in_progress = false;

