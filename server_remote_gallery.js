var fs = require('fs');
var request = require('request');
 
 /*
 var post_url = 'http://localhost/phototwix/upload_photo.php';
 var check_url = 'http://localhost/phototwix/photo_exist.php';
 */
 var post_url = 'http://www.phototwix.fr/upload_photo.php';
 var check_url = 'http://www.phototwix.fr/photo_exist.php';
 var path_photo = "./public/photos/result";
 
 function uploadAllPhotos(body) {
 	var g_name = require('./server_parameter').getParameter('gallery_name');
	
	if (g_name != "") {		
		console.log("Créate or modify gallery %s", g_name);
		
		var files = fs.readdirSync(path_photo);
		
		files.forEach( function (file) {
		stats = fs.lstatSync(path_photo + '/' + file);
		if (!stats.isDirectory()) { //conditing for identifying folders
			console.log('Upload ' + file);
			post_photo(file);
		}
   });
		
	}
 }
 
 function post_photo(file) {
 	var g_name = require('./server_parameter').getParameter('gallery_name');
	if (!g_name || (g_name == "")) {
		return
	}
	
	var g_pass = require('./server_parameter').getParameter('gallery_password');
	g_pass = g_pass ? g_pass : "";
	
	var g_private = require('./server_parameter').getParameter('gallery_private');
	g_private = g_private ? 1 : 0;
 
	var re = request.post(check_url, function optionalCallback (err, httpResponse, body) {
		if (err) {
			return console.error('Check photo error', err);
		}
		console.log('Req exist : ' + body);
		if (body == '0') {
			//Read the file
			fs.readFile(path_photo + '/' + file, function (err, data) {
			  if (err) {
				console.log("FATAL An error occurred trying to read in the file: " + err);
				return;
			  }
			  //If data, upload the data
			  if(data) {
				var r = request.post(post_url, function optionalCallback (err, httpResponse, body) {
					if (err) {
						return console.error('upload photo failed:', err);
					}
						console.log('Upload photo successful!  Server responded with:', body);
					})
					
					var form = r.form();
					form.append('gallery_name', g_name);
					form.append('gallery_password', g_pass);
					form.append('gallery_private', g_private);
					form.append('filename', file);
					form.append('file_content', data);
			  }
			  
			  else {
				console.log("No data to post");
				return;
			  }
			});		
		} else {
			console.log("File already present " + file);
		}
	});
	
	var form = re.form();
	form.append('gallery_name', g_name);
	form.append('filename', file);
 }
 
 
 exports.uploadAllPhotos = uploadAllPhotos;
 exports.post_photo = post_photo;