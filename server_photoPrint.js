var fs = require('fs');
var Canvas = require('canvas');
var Winreg = require('winreg');
var log = function () {};


var iv_path = '"' + __dirname + '/bin/IrfanView/i_view32.exe' + '"';

var imt_path = '';

function printPhoto(printObject) {
	
	var photo_big = '"' + __dirname + '/public/' + printObject.big + '"';
	
	log("Print photo : " + photo_big);
	
	//Determine if file has to be duplicate and cut
	var data = fs.readFileSync('./public/' + printObject.big);
	//create new image result
	var img = new Canvas.Image; // Create a new Image
	img.src = data;
	

	if (img.height / img.width > 2) {
		//Image has to be duplicate, and cutter has to be twice
		var canvas = new Canvas(img.width * 2, img.height);
		var ctx = canvas.getContext('2d');
		
		ctx.drawImage(img, 0, 0, img.width, img.height);
		ctx.drawImage(img, img.width, 0, img.width, img.height);
		require('./server_buildPhoto').saveImage(canvas.toDataURL(), './public/photos/tmp/tmp.png');
		img_path = '"' + __dirname + '/public/photos/tmp/tmp.png';
		load_printer_json('./conf/printer_cut.json', print);
	} else {
		img_path = photo_big;
		load_printer_json('./conf/printer_nocut.json', print);
		//direct print photo, no problem
	}
}

//Run print
function print() {
	var exec = require('child_process').exec,
	child;
	var cmd = iv_path + ' ' + img_path;
	//var cmd = iv_path + ' ' + img_path; //uncomment if just preview photo
	if (require('os').platform() == 'win32') {
		cmd = cmd.replace(/\//g, "\\"); //comment if linux system
	}
	//cmd = cmd + " /print";
	log("CMD : " + cmd);
	child = exec(cmd,
	  function (error, stdout, stderr) {
		log('stdout: ' + stdout);
		log('stderr: ' + stderr);
		if (error !== null) {
		  console.log('exec error: ' + error);
		}
	});
}


//Modify registry to set cutter preference for printer
function load_printer_json(filename, callback) {
	fs.readFile(filename, function (err, data) {
	  if (err) {
		console.log('Error: ' + err);
		return;
	  }
	 
		data = JSON.parse(data);
		var count = 0;
		for (var i = 0; i < data.registry.length; i++) {
			var reg = data.registry[i];
			var Winreg = require('winreg')
			,   registry = new Winreg({
				  hive: reg.hive,
				  key:  reg.key
				})
			log("HIVE : " + reg.hive + " KEY : " + reg.key + " NAME : " + reg.name + " TYPE " + reg.type);
			registry.set(reg.name, reg.type, reg.value, function (err) {
				if (err) {
					console.log('Error: ' + err);
				}
				//if all change has return success, call callback
				++count;
				if (count == data.registry.length) {
					log("I print");
					callback();
				}
			});
		}
		
	});

 }

exports.printPhoto = printPhoto;