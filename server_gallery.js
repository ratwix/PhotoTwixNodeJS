 var fs = require('fs');
 var Canvas = require('canvas');
 
 var path_photo = "./public/photos/result";
 var path_public_photo = "photos/result";
 var path_public_thumb = "photos/thumbs";
 
 /**
   * Return list of all photos formated for canvas
   */   
 
 function getAllPhotos() {
	var result = "";
	
	var files = fs.readdirSync(path_photo);
	var first = true;
	files.forEach( function (file) {
		stats = fs.lstatSync(path_photo + '/' + file);
		if (!stats.isDirectory()) { //conditing for identifying folders
			if (first) {
				result = result + "<div class='thumb thumb_current'>";
			} else {
				result = result + "<div class='thumb'>";
			}
			result = result + "<img src='" + path_public_thumb + "/" + file + "' src_big='" + path_public_photo + "/" + file + "' src_small='" + path_public_thumb + "/" + file + "'/>\n</div>\n";
				
			first = false;
		}
   });		

	
	return result;
 }
 
 exports.getAllPhotos = getAllPhotos;