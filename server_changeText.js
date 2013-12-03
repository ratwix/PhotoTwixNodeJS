var fs = require('fs');
var log = console.log;

function changeText(value) {
	var text = JSON.parse(value);
	replace_text_in_all_file(text, './public/template/template_default/');
}

function replace_text_in_all_file(text, path) {
		replace_text_in_file(text, path, "change_template_base_1.jsx", "change_template_1.jsx");
		call_photoshop_transformation(path, "template1.psd", "change_template_1.jsx");
		
		setTimeout(function() {
			replace_text_in_file(text, path, "change_template_base_2.jsx", "change_template_2.jsx");
			call_photoshop_transformation(path, "template2.psd", "change_template_2.jsx");
		}, 4000);
		
		setTimeout(function() {
			replace_text_in_file(text, path, "change_template_base_3.jsx", "change_template_3.jsx");
			call_photoshop_transformation(path, "template3.psd", "change_template_3.jsx");
		}, 8000);		
}

function replace_text_in_file(text, path, base, dest) {
  try {
	  var data = fs.readFileSync(path + base, 'utf8');
	  if (data) {
		  var data = data.replace(/@TEXT1@/g, text.text1);
		  var data = data.replace(/@TEXT2@/g, text.text2);  
		  var data = data.replace(/@TEXT3@/g, text.text3);  

		  fs.writeFileSync(path + dest, data, 'utf8');
	  }
  } catch (e) {
  
  }
}

function call_photoshop_transformation(path, psd, script) {
	fs.exists(path + psd, function(exists) {
		if (exists) {
			var cmd = "photoshop.exe " + __dirname + "/" + path + psd + " " + __dirname + "/" + path + script;
	
			var exec = require('child_process').exec,
			child;

			if (require('os').platform() == 'win32') {
				cmd = cmd.replace(/\//g, "\\"); //comment if linux system
				cmd = cmd.replace(/\\\.\\/g, "\\"); //comment if linux system
			}

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
	});
}

exports.changeText = changeText;