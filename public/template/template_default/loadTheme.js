function loadTheme() {
	g_photo_theme = [];
	
	var templates = $('.template_item_check');
	templates.each(function() {		
		var name = this.getAttribute('name');
		var checked = this.checked;
		var template_css = this.getAttribute('template_css');
		var nb_photos = this.getAttribute('nb_photos');
		var img_path = this.getAttribute('img_path');
		var img_cut = this.getAttribute('img_cut');
		//Ajout d'autres elements
		if (checked === true) {
			addPhotoTheme(parseInt(nb_photos), template_css, 'url(' + img_path + ')', img_cut == "true");
		}
	});
	
	/*
	addPhotoTheme(4, 'template1.css', 'url(./template/template_default/img/template_paper1_1.png)', true);
	addPhotoTheme(4, 'template2.css', 'url(./template/template_default/img/template_paper1_2.png)', false);
	addPhotoTheme(1, 'template3.css', 'url(./template/template_default/img/template_paper1_3.png)', false);
	addPhotoTheme(5, 'template4.css', 'url(./template/template_default/img/template_paper1_4.png)', true);
	addPhotoTheme(6, 'template5.css', 'url(./template/template_default/img/template_paper1_5.png)', false);
	
	addPhotoTheme(4, 'template1.css', 'url(./template/template_default/img/template_bluepoint_1.png)', true);
	addPhotoTheme(4, 'template2.css', 'url(./template/template_default/img/template_bluepoint_2.png)', false);
	addPhotoTheme(1, 'template3.css', 'url(./template/template_default/img/template_bluepoint_3.png)', false);
	addPhotoTheme(5, 'template4.css', 'url(./template/template_default/img/template_bluepoint_4.png)', true);
	addPhotoTheme(6, 'template5.css', 'url(./template/template_default/img/template_bluepoint_5.png)', false);
	*/
	g_photo_theme_id = 0;
	g_photo_theme[g_photo_theme_id]();
}

function addPhotoTheme(nb_photo, css_template_id, template_name, photocut) {
	var tmp = function() {
		g_nb_photo = nb_photo;
		g_photo_cut = photocut;
		$( "#current_photo_style" ).remove();
		var stylesheet = document.createElement('link');
		stylesheet.href = './template/template_default/' + css_template_id;
		stylesheet.rel = 'stylesheet';
		stylesheet.type = 'text/css';
		stylesheet.id = 'current_photo_style';	
		document.getElementsByTagName('head')[0].appendChild(stylesheet);
		$('#photo_strip').css('content', template_name);
	}
	
	g_photo_theme.push(tmp);
}

/*

var loadPhotoTheme1 = function() {
	g_nb_photo = 4;
	g_photo_cut = true;
	$( "#current_photo_style" ).remove();
	var stylesheet = document.createElement('link');
	stylesheet.href = './template/template_default/template1.css';
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
	stylesheet.href = './template/template_default/template2.css';
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
	stylesheet.href = './template/template_default/template3.css';
	stylesheet.rel = 'stylesheet';
	stylesheet.type = 'text/css';
	stylesheet.id = 'current_photo_style';
	document.getElementsByTagName('head')[0].appendChild(stylesheet);
}

loadTheme();

*/