 var fs = require('fs');
 var fs = require('fs-extra');
 var path = require('path');

var base_path = './public/template/template_default/img/';
var blank_path = './public/template/template_default/img/blank/';

var base_thumb_path = './public/template/template_default/img/thumb/';
var blank_thumb_path = './public/template/template_default/img/thumbblank/';

var saveTemplate = function(template, socket) {
	//Save template
	var img = template.data.replace(/^data:image\/png;base64,/, "");
	var buf = new Buffer(img, 'base64');

	fs.writeFileSync(base_path + template.filename, buf, "binary");
	
	//Save json modif
	buf = new Buffer(template.json);
	fs.writeFileSync(base_path + template.filename + ".json", buf);
}

var resetTemplate = function(socket) {
	//Replace all files with blank files
	var files = fs.readdirSync(blank_path);
	for (var i = 0; i < files.length; i++) {
		fs.copy(blank_path + files[i], base_path + files[i], function(err) {
			if (err) {
				console.log('errors');
			}
		});
	}
	
	//Replace all thumbs with normal thumbs
	files = fs.readdirSync(blank_thumb_path);
	for (var i = 0; i < files.length; i++) {
		fs.copy(blank_thumb_path + files[i], base_thumb_path + files[i], function(err) {
			if (err) {
				console.log('errors');
			}
		});
	}
	
	//Delete json files
	files = fs.readdirSync(base_path);
	for (var i = 0; i < files.length; i++) {
		if (path.extname(files[i]) == ".json") {
			fs.unlink(base_path + files[i], function (err) {
			  console.log('Unable to detele ' + files[i]);
			});
		}
	}
}

/****
	* Get all templates html
	*/

var getTemplates = function(socket) {
	var result = "";

	var tmp_html = "<div class=\"template_item\">\n" +
					"<img class=\"template_item_img\" src=\"./template/template_default/img/thumb/___0____high.jpg\"></img>\n" +
						"<br/>\n" +
						"<input class=\"template_item_check\" type=\"checkbox\"\n" +
							"name=\"___0___\"\n" +
							"id=\"___0___\"\n" + 
							"template_css=\"template___2___.css\"\n" +
							"nb_photos=\"___4___\"\n" +
							"img_path=\"./template/template_default/img/___0___.png\"\n" +
							"img_cut=\"___1___\"\n" +
							"value=\"true\"\n" +
							"onChange=\"modTemplate()\"/>\n" +
							"<label for=\"___0___\"></label>\n" +
							"<br/>\n" +
							"<button type=\"button\" class=\"___3___\" onclick=\"show_template_edit('___0___.png')\">Edit</button>\n" +
							"</div>\n\n";
	
	var files = fs.readdirSync(base_path);
	for (var i = 0; i < files.length; i++) {
		if (path.extname(files[i]) == ".png") {
			var tmp = tmp_html;
			
			var filename = path.basename(files[i], path.extname(files[i]));
			
			var reg = new RegExp('___0___', 'g');
			tmp = tmp.replace(reg, filename);
			
			reg = new RegExp('___2___', 'g');
			tmp = tmp.replace(reg, filename.slice(-1));
			
			
			reg = new RegExp('___1___', 'g');
			if (filename.slice(-1) == "1" || filename.slice(-1) == "4") {
				tmp = tmp.replace(reg, "true");
			} else {
				tmp = tmp.replace(reg, "false");
			}
			
			reg = new RegExp('___4___', 'g');
			var nb_take_photo = 4;
			if (filename.slice(-1) == "3") {
				nb_take_photo = 1;
			}
			if (filename.slice(-1) == "4") {
				nb_take_photo = 5;
			}
			if (filename.slice(-1) == "5") {
				nb_take_photo = 6;
			}
			tmp = tmp.replace(reg, "" + nb_take_photo);
			
			//If file already edited, add button_reedit class
			reg = new RegExp('___3___', 'g');
			if (fs.existsSync(base_path + files[i] + ".json")) {
				tmp = tmp.replace(reg, "button_reedit");
			} else {
				tmp = tmp.replace(reg, "");			
			}
			
			result += tmp;
		}
	}
	
	return result;
}

var getTemplateJson = function(template, socket) {
	try {
		var result = fs.readFileSync(base_path + template + ".json");
		return result;
	} catch (e) {
		return "";
	}
}

exports.getTemplates = getTemplates;
exports.saveTemplate = saveTemplate;
exports.resetTemplate = resetTemplate;
exports.getTemplateJson = getTemplateJson;