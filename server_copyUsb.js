 var fs = require('fs');
 var fse = require('fs-extra');
 var path = require('path');
 var copysync = require('copysync');
 
 var g_socket;
 var g_current_copy = 0;
 var g_max_copy = 0;
 
 function startCopy() {
	var drive = "";
	//Find the USB key
	g_current_copy = 0;
	for (var i = 100; i <= 120; i++) {
		console.log('Test du disque ' + String.fromCharCode(i) + ':/');
		if (fs.existsSync(String.fromCharCode(i) + ':/')) {
			console.log("Key on drive " + String.fromCharCode(i));
			drive = String.fromCharCode(i) + ':/';
			if (!fs.existsSync(String.fromCharCode(i) + ':/phototwix')) {
				fs.mkdirSync(drive + 'phototwix');
			}
			break;
		}
	}
	
	if (drive == "") {
		//TODO : mettre une erreur
		return;
	}
 
	var files = fs.readdirSync('./public/photos/result');
	g_max_copy = files.length;
	for (var i in files) {
		console.log("Copy file ./public/photos/result/" + files[i] + " to " + drive + 'phototwix/' + path.basename(files[i]));
		fse.copy('./public/photos/result/' + files[i], drive + 'phototwix/' + path.basename(files[i]), function(err){
		  if (err) {
			console.error(err);
			return;
		  }
		  g_current_copy++;
		  sendMessage();
		});
	}
	
 }
 
 function setSocket(socket) {
	console.log('Socket set');
	g_socket = socket;
}

function sendMessage() {
	g_socket.emit("copyUsbProgress", {
		current:g_current_copy,
		total:g_max_copy
	});	//Send a message
}

 exports.setSocket = setSocket;	
 
exports.startCopy = startCopy;