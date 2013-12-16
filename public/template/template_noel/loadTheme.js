function loadTheme() {
	g_photo_theme = [];
	g_photo_theme.push(loadPhotoTheme1);
	g_photo_theme.push(loadPhotoTheme2);
	g_photo_theme.push(loadPhotoTheme3);
	g_photo_theme_id = 0;
	g_photo_theme[g_photo_theme_id]();
}

var loadPhotoTheme1 = function() {
	g_nb_photo = 4;
	g_photo_cut = true;
	$( "#current_photo_style" ).remove();
	var stylesheet = document.createElement('link');
	stylesheet.href = './template/template_noel/template1.css';
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
	stylesheet.href = './template/template_noel/template2.css';
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
	stylesheet.href = './template/template_noel/template3.css';
	stylesheet.rel = 'stylesheet';
	stylesheet.type = 'text/css';
	stylesheet.id = 'current_photo_style';
	document.getElementsByTagName('head')[0].appendChild(stylesheet);
}

loadTheme();