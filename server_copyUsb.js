 var fs = require('fs');
 var fs = require('fs-extra');
 var path = require('path');
 var copysync = require('copysync');
 
 var g_files;
 var g_socket;
 var g_current_copy = 0;
 var g_max_copy = 0;
 var drive = "";
 
 var startCopy = function() {
	drive = "";
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
 
	g_files = fs.readdirSync('./public/photos/result');
	g_max_copy = g_files.length;
	g_current_copy = 0;
	copy_next();
 }
 
 function copy_next() {
	console.log("Copy file ./public/photos/result/" + g_files[g_current_copy] + " to " + drive + 'phototwix/' + path.basename(g_files[g_current_copy]));
	if (g_current_copy < g_max_copy) {
		fs.copy('./public/photos/result/' + g_files[g_current_copy], drive + 'phototwix/' + path.basename(g_files[g_current_copy]), function(err) {
			if (err) {
				g_socket.emit('copyUsbError');
			} else {		
				sendMessage();
				g_current_copy++;
				if (g_current_copy < g_max_copy) {
					copy_next();
				}
			}
		});
	}
 }
 
 function setSocket(socket) {
	console.log('Socket set USB ');
	g_socket = socket;
}

function sendMessage() {
	g_socket.emit('copyUsbProgress', {
		current:g_current_copy + 1,
		total:g_max_copy
	});	//Send a message
}

exports.setSocket = setSocket;	
 
exports.startCopy = startCopy;