//npm install express
//npm install static
//npm install socket.io --msvs_version=2013
//npm install johnny-five --msvs_version=2013
//npm install canvas
//npm install usb-detection
//set PATH=c:\GTK\bin;%PATH%

var fs = require('fs');
var ctr = require('./server_arduino');
var usb = require('./server_copyUsb');
var bodyParser = require('body-parser');

var express = require('express'),
//http = require('http'),
https = require('https');
privateKey  = fs.readFileSync(__dirname + '/sslcert/phototwix_private.pem'),
certificate = fs.readFileSync(__dirname + '/sslcert/phototwix_public.pem'),
credentials = {key: privateKey, cert: certificate};

//On créer un server express
var app = express();
//var server = http.createServer(app);
var events = require('events');
var eventEmitter = new events.EventEmitter();
var server = https.createServer(credentials, app);

var argv = require('optimist').argv;

//Tout les élements public sont dans le répertoire public.
//Des que le navigateur va demander du css ou du js, ca ira le chercher dans la partie public

app.use(express.static(__dirname + "/public"));
app.use(bodyParser({
	  keepExtensions: true,
	  limit: 30000000, // 30M limit
	  defer: true              
}));

//Default pages : public/index.html
app.get('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(fs.readFileSync('public/index.html', 'utf8'), 'utf8');
    res.end();
});

//Get a new photos
app.post('/buildPhotos', function(req, res) {
	var div_res = require('./server_buildPhoto').buildPhoto(JSON.parse(req.body.photos));
	
	res.contentType('text/html');
	res.send(div_res);
});

//Request list of actual photos
app.post('/getAllPhotos', function(req, res) {
	var url_res = require('./server_gallery').getAllPhotos();
	
	res.contentType('text/html');
	res.send(url_res);
});

//Request list of actual photos
app.post('/deletePhotos', function(req, res) {
	require('./server_photoDelete').deletePhoto(req.body, false);
	
	res.contentType('text/html');
	res.send('');
});

//Request list of actual photos
app.post('/printPhoto', function(req, res) {
	require('./server_photoPrint').printPhoto(req.body, false);
	
	res.contentType('text/html');
	res.send('');
});

app.get('/getParameters', function(req, res) {
	var debug = false;
	if (argv.debug) {
		debug = true;
	}

	var param = require('./server_parameter').getAllParameters(debug);
	
	res.contentType('text/html');
	res.send(param);
});

app.post('/saveParameters', function(req, res) {
	var param = require('./server_parameter').saveParametersClient(req.body.param);
	
	res.contentType('text/html');
	res.send('');
});

app.post('/resetParameters', function(req, res) {
	var param = require('./server_parameter').resetParameters();
	
	res.contentType('text/html');
	res.send('');
});

app.post('/copyUsb', function(req, res) {
	eventEmitter.emit('startUsbCopy');
	res.contentType('text/html');
	res.send('');
});

//Get a new template
app.post('/saveTemplate', function(req, res) {
	var tmp = require('./server_Template').saveTemplate(JSON.parse(req.body.template));

	res.contentType('text/html');
	res.send('');
});

app.post('/getTemplates', function(req, res) {
	var result = require('./server_Template').getTemplates();

	res.contentType('text/html');
	res.send(result);
});

app.post('/getTemplateJson', function(req, res) {
	var result = require('./server_Template').getTemplateJson(JSON.parse(req.body.template));
	
	res.contentType('text/html');
	res.send(result);
});

eventEmitter.on('startUsbCopy', function () { usb.startCopy(); });

app.post('/changeText', function(req, res) {
	require('./server_changeText').changeText(req.body.value);
	
	res.contentType('text/html');
	res.send('');
});

app.post('/deleteAll', function(req, res) {
	require('./server_photoDelete').deleteAll();
	
	res.contentType('text/html');
	res.send('');
});

app.post('/uploadAllPhotos', function(req, res) {
	require('./server_remote_gallery').uploadAllPhotos();
	
	res.contentType('text/html');
	res.send('');	
});

// Chargement de socket.io pour les échanges avec la partie client
var io = require('socket.io').listen(server, { log: false }); 

// Quand on client se connecte, on écoute les différents évenements
io.sockets.on('connection', function (socket) {
	ctr.setSocket(socket);
	usb.setSocket(socket);
	global.g_socket = socket;
    console.log('Un client est connecté !');
	//Listen for LED change
	socket.on('socket_led', function (data) {
		ctr.changeLight(data);
	});
});

//On lance le server sur le port 8080
server.listen(1443);

//On initialise l'arduino et on lance Chrome sur la photo

if (argv.debug) {
	console.log("En mode de developpement debug, pas d'init d'arduino");
} else {
	ctr.init();

	setTimeout(function() {
		ctr.launchChrome();
	}, 10000);
}


