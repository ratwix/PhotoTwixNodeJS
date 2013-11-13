var falseDeletePath = __dirname + "/public/photos/deleted/";

var fs = require('fs');
var param = require('./server_parameter');



function deletePhoto(deleteObject, trueDelete) {
	var photo_small = deleteObject.small;
	var photo_big = deleteObject.big;
	
	console.log("Suppression de la photo big : " + photo_big + " small : " + photo_small);
	
	//Suppression de la photo small (thumbnail)
	fs.unlink(__dirname + "/public/" + photo_small, function (err) {
	  if (err) {
		console.log("unable to delete small " + err);
	  }
	});
	
	//Suppression de toute les mignatures
	var reg = new RegExp("photos/result/photo(.*)", "g");
	for (var i = 1; i <= 6; i++) {
		var tmp = photo_big.replace(reg, __dirname + "/public/photos/without_effects/photo" + i + "_$1");
		
		fs.unlink(tmp, function (err) {
		  if (err) {
			console.log("unable to delete without effect " + err);
		  }
		});
	}
	
	if (param.getParameter('real_delete') == true) {
		fs.unlink(__dirname + "/public/" + photo_big, function (err) {
		  if (err) {
			console.log("unable to delete big : " + err);
		  }
		});	
	} else {
		//Else move it to deleted folder
		
		var tmp = photo_big.replace(reg, __dirname + "/public/photos/deleted/photo$1");
		
		fs.rename(__dirname + "/public/" + photo_big, tmp, function (err) {
			if (err) {
				console.log("unable to move : " + err);
			}
		});
	}
}


 
 exports.deletePhoto = deletePhoto;
