 var fs = require('fs');
 var Winreg = require('winreg');
 var log = console.log;
 
 load_json('./conf/printer_cut.json');
 
 function load_json(filename) {
	fs.readFile(filename, function (err, data) {
	  if (err) {
		console.log('Error: ' + err);
		return;
	  }
	 
		data = JSON.parse(data);
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
			});
		}
	});
 }