//npm install express
//npm install static
//npm install socket.io --msvs_version=2013
//npm install johnny-five --msvs_version=2013
//npm install canvas
//npm install usb-detection
//set PATH=c:\GTK\bin;%PATH%

var fs = require('fs');
var ctr = require('./server_arduino');

var express = require('express'),
//http = require('http'),
https = require('https');
privateKey  = fs.readFileSync(__dirname + '/sslcert/privatekey.pem'),
certificate = fs.readFileSync(__dirname + '/sslcert/certificate.pem'),
credentials = {key: privateKey, cert: certificate};

//On créer un server express
var app = express();
//var server = http.createServer(app);

var server = https.createServer(credentials, app);

//Tout les élements public sont dans le répertoire public.
//Des que le navigateur va demander du css ou du js, ca ira le chercher dans la partie public

app.configure(function () {
    app.use(express.static(__dirname + "/public"));
    app.use(express.bodyParser({
          keepExtensions: true,
          limit: 30000000, // 30M limit
          defer: true              
    }));
})

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
	var param = require('./server_parameter').getAllParameters();
	
	res.contentType('text/html');
	res.send(param);
});

app.post('/saveParameters', function(req, res) {
	var param = require('./server_parameter').saveParametersClient(req.body.param);
	
	res.contentType('text/html');
	res.send('');
});

// Chargement de socket.io pour les échanges avec la partie client
var io = require('socket.io').listen(server); 

// Quand on client se connecte, on écoute les différents évenements
io.sockets.on('connection', function (socket) {
	ctr.setSocket(socket);
	global.g_socket = socket;
    console.log('Un client est connecté !');
});

//On lance le server sur le port 8080
server.listen(1443);

//On initialise l'arduino

ctr.init();