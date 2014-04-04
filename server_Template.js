 var fs = require('fs');
 var fs = require('fs-extra');

var base_path = './public/template/template_default/img/';
var blank_path = './public/template/template_default/img/blank/';

var saveTemplate = function(template, socket) {
	var img = template.data.replace(/^data:image\/png;base64,/, "");
	var buf = new Buffer(img, 'base64');

	fs.writeFileSync(base_path + template.filename, buf, "binary");
}

var resetTemplate = function(socket) {
	var files = fs.readdirSync(blank_path);
	for (var i = 0; i < files.length; i++) {
		fs.copy(blank_path + files[i], base_path + files[i], function(err) {
			if (err) {
				console.log('errors');
			}
		});
	}
}

exports.saveTemplate = saveTemplate;
exports.resetTemplate = resetTemplate;