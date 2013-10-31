var fs = require('fs');
var Canvas = require('canvas');

var thumb_height = 200;
var path_without_effect = "./public/photos/without_effects";
var path_result = "./public/photos/result";
var path_thumb = "./public/photos/thumbs";

 
 var path_public_photo = "photos/result";
 var path_public_thumb = "photos/thumbs";

var buildPhoto = function(photos_json, socket) {
	console.log('Debut build photo');
	
	var d = new Date();
	d = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + '_' + d.getHours() + 'h-' + d.getMinutes() + 'm-' + d.getSeconds() + 's';
	
	//Start to save no effect photos
	console.log('Sauvegarde des photos sans effets');
	for (var i = 1; i <= parseInt(photos_json["nb_photo"]); i++) {
		saveImage(photos_json["photo" + i.toString()].photo_blank_base64, path_without_effect + "/photo" + i.toString() + '_' + d + ".png");
	}
	
	//Load template file
	var data = fs.readFileSync(__dirname + "/public/" + photos_json["template"]);
	//create new image result
	var img = new Canvas.Image; // Create a new Image
	img.src = data;
	var canvas = new Canvas(img.width, img.height);
	var ctx = canvas.getContext('2d');
	
	//Draw Photo
	for (var i = 1; i <= parseInt(photos_json["nb_photo"]); i++) {
		var photo = new Canvas.Image;
		photo.src = photos_json["photo" + i.toString()].photo_base64;
		
		var x = Math.round(photos_json["photo" + i.toString()].x * 1.0 * img.width / 100.0);
		var y = Math.round(photos_json["photo" + i.toString()].y * 1.0 * img.height / 100.0);
		var w = Math.round(photos_json["photo" + i.toString()].width * 1.0 * img.width / 100.0);
		var h = Math.round(photos_json["photo" + i.toString()].height * 1.0 * img.height / 100.0);
		var a = photos_json["photo" + i.toString()].rotation;			

		ctx.save();
		ctx.translate(x + w / 2, y + h / 2);
		ctx.rotate(parseInt(a) * Math.PI / 180);
		ctx.drawImage(photo, -(w / 2), -(h / 2), w, h);
		ctx.restore();
	}
	
	//Draw template
	ctx.drawImage(img, 0, 0, img.width, img.height);
	
	//Save image
	saveImage(canvas.toDataURL(), path_result + "/photo" + d + ".png");
	
	//Create thumbnail
	var thumb = new Canvas(img.width / img.height * 200, 200);
	thumb.getContext('2d').drawImage(canvas, 0, 0, thumb.width, thumb.height);
	
	saveImage(thumb.toDataURL(), path_thumb + "/photo" + d + ".png");
	
	return "<div class='thumb'><img src='" + path_public_thumb + "/photo" + d + ".png" + "' src_big='" + path_public_photo + "/photo" + d + ".png" + "' src_small='" + path_public_thumb + "/photo" + d + ".png" + "'/>\n</div>\n";
}

function saveImage(img, path) {
	img = img.replace(/^data:image\/png;base64,/,"");
	var buf = new Buffer(img, 'base64');

	fs.writeFileSync(path, buf, "binary");
}

exports.buildPhoto = buildPhoto;
exports.saveImage = saveImage;