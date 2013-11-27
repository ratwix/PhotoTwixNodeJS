function loadTheme() {
	g_photo_theme = [];
	g_photo_theme.push(loadPhotoTheme1);
	g_photo_theme.push(loadPhotoTheme2);
	g_photo_theme.push(loadPhotoTheme3);
	/*
	g_photo_theme.push(loadPhotoThemeVideo);
	*/
	loadGeneralTheme();
	g_photo_theme_id = 0;
	g_photo_theme[g_photo_theme_id]();
}

function loadGeneralTheme() {
	$( "#current_theme_style" ).remove();
	var stylesheet = document.createElement('link');
	stylesheet.href = './template/template_default/theme.css';
	stylesheet.rel = 'stylesheet';
	stylesheet.type = 'text/css';
	stylesheet.id = 'current_theme_style';
	document.getElementsByTagName('head')[0].appendChild(stylesheet);
}

var loadPhotoTheme1 = function() {
	g_nb_photo = 4;
	g_photo_cut = true;
	$( "#current_photo_style" ).remove();
	var stylesheet = document.createElement('link');
	stylesheet.href = './template/template_default/photo_template_1.css';
	stylesheet.rel = 'stylesheet';
	stylesheet.type = 'text/css';
	stylesheet.id = 'current_photo_style';
	document.getElementsByTagName('head')[0].appendChild(stylesheet);
}

var loadPhotoTheme2 = function () {
	g_nb_photo = 4;
	g_photo_cut = false;

	$( "#current_photo_style" ).remove();
	var stylesheet = document.createElement('link');
	stylesheet.href = './template/template_default/photo_template_2.css';
	stylesheet.rel = 'stylesheet';
	stylesheet.type = 'text/css';
	stylesheet.id = 'current_photo_style';
	document.getElementsByTagName('head')[0].appendChild(stylesheet);
}

var loadPhotoTheme3 = function () {
	g_nb_photo = 1;
	g_photo_cut = false;

	$( "#current_photo_style" ).remove();
	var stylesheet = document.createElement('link');
	stylesheet.href = './template/template_default/photo_template_3.css';
	stylesheet.rel = 'stylesheet';
	stylesheet.type = 'text/css';
	stylesheet.id = 'current_photo_style';
	document.getElementsByTagName('head')[0].appendChild(stylesheet);
}

var loadPhotoThemeVideo = function () {
	g_nb_photo = 1;
	g_photo_cut = false;

	$( "#current_photo_style" ).remove();
	var stylesheet = document.createElement('link');
	stylesheet.href = './template/template_default/video_template.css';
	stylesheet.rel = 'stylesheet';
	stylesheet.type = 'text/css';
	stylesheet.id = 'current_photo_style';
	document.getElementsByTagName('head')[0].appendChild(stylesheet);
}

loadTheme();