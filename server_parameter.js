var fs = require('fs');
var parameter_path = "./conf/parameter.json";

//Common parameters
var g_parameters = {
	printer_rx1:true,			//True if printer is a RX1 and can cut
	use_money:false,			//Use coin 
	money_value:[0, 0.5, 1.0, 2.0],	//Possible coin value
	photo_price:0,					//Current photo price
	current_credit:0.0,
	current_template:"template_default",
	template_text1:"",
	template_text2:"",
	template_text3:"",
	photo_initial_delay:4,
	photo_delay:3,
	real_delete:false
};

function loadParameters() {
	var data = fs.readFileSync(parameter_path);
	g_parameters = JSON.parse(data);
}

function saveParameters() {
	fs.writeFile(parameter_path, JSON.stringify(g_parameters), function(err) {
		if(err) {
		  console.log(err);
		} else {
		  console.log("Parameters saved to " + parameter_path);
		}
	});
}

function saveParametersClient(data) {
	g_parameters = JSON.parse(data);
	saveParameters();	
}

function setParameter(name, value) {
	g_parameters[name] = value;
	saveParameters();
}

function getParameter(name) {
	loadParameters();
	return g_parameters[name];
}

function getAllParameters() {
	loadParameters();
	return JSON.stringify(g_parameters);
}

function resetParameters() {
	g_parameters.printer_rx1 = true;
	g_parameters.use_money = false;
	g_parameters.money_value = [0.5, 1.0, 2.0];	//Possible coin value
	g_parameters.current_credit = 0.0;
	g_parameters.current_template = "template_default";
	g_parameters.template_text1 = "";
	g_parameters.template_text2 = "";
	g_parameters.template_text3 = "";	
	g_parameters.photo_initial_delay = 4;
	g_parameters.g_photo_delay = 3;
	
	saveParameters();
}

exports.loadParameters = loadParameters;
exports.saveParameters = saveParameters;
exports.saveParametersClient = saveParametersClient;
exports.setParameter = setParameter;
exports.getParameter = getParameter;
exports.getAllParameters = getAllParameters;
exports.resetParameters = resetParameters;