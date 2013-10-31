
//Build a photo object from multiple current photo
function build_photo() {

	var template_path = $("#photo_strip")[0].src;
	var photos = new Object();
	
	for (var i = 1; i <= g_nb_photo; i++) {
		var photo = get_photo_json($("#result_photo_" + i.toString()));
		photos["photo"  + i.toString()] = photo;
	}
	
	var url = $("#photo_strip").css('content').replace('url(','').replace(')','');
	photos["template"] = $('<a>', { href:url } )[0].pathname;
	photos["nb_photo"] = g_nb_photo;

	$.post( "buildPhotos", {photos : JSON.stringify(photos)})
		.done(function(data) {
			gallery_show();
			gallery_add($(data));	//Add the photo to the gallery
		})
		.fail(function(data) {
			console.log('Echec de la compilation des photos');
		});
}

//This function create a JSON object containing all information about a specific photo
function get_photo_json(photo) {
	//Disable transformation that change offset

	var matrix = photo.parent().css("-webkit-transform");
	photo.parent().css("-webkit-transform", "none");
	
	var photo_strip_offset = $("#photo_strip").offset();
	var photo_offset = photo.parent().offset();
	
	var x = ((photo_offset.left - photo_strip_offset.left) * 100.0) / $("#photo_strip").width();
	var y = ((photo_offset.top - photo_strip_offset.top) * 100.0) / $("#photo_strip").height();
	var width = photo.parent().width() * 100.0 / $("#photo_strip").width();
	var height = photo.parent().height() * 100.0 / $("#photo_strip").height();
	var rotation = getRotationDegrees(matrix);
	var photo_base64 = photo[0].src;
	var photo_blank_base64 = photo[0].src_blank;
	
	var result = {
					"photo_base64" : photo_base64,
					"photo_blank_base64" : photo_blank_base64,
					"x" : x,
					"y" : y,
					"width" : width,
					"height" : height,
					"rotation" : rotation
				
	};
	//Restore display matrix
	photo.parent().css("-webkit-transform", "");
	return result;
}

//Function that return rotation degree
function getRotationDegrees(matrix) {
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
	
    return (angle < 0) ? angle +=360 : angle;
}