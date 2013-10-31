var fs = require('fs');

var log = function () {}

var Winreg = require('winreg')
,   devMode2 = new Winreg({
      hive: Winreg.HKCU,                                          // HKEY_CURRENT_USER
      key:  '\\Printers\\DevModes2' // key containing autostart programs
    })
,	devModePerUser = new Winreg({
      hive: Winreg.HKCU,                                          // HKEY_CURRENT_USER
      key:  '\\Printers\\DevModePerUser' // key containing autostart programs
    })

devMode2.get('DS-RX1', function (err, result1) {
	if (err)
		console.log('DS-RX1 not found: ' + err)
	else {
		log('ITEM: '+ result1.name + '\t' + result1.type + '\t' + result1.value);
		devModePerUser.get('DS-RX1', function (err, result2) {
		if (err)
			console.log('DS-RX1 not found: ' + err)
		else {
			log('ITEM: '+ result2.name + '\t' + result2.type + '\t' + result2.value);
			var outputFilename = './conf/printer_nocut.json';
			fs.writeFile(outputFilename, JSON.stringify({"registry" : [result1, result2]}), function(err) {
				if(err) {
				  console.log(err);
				} else {
				  console.log("JSON saved to ./conf/printer_nocut.json");
				}
			}); 
		}
	});
	}
});



