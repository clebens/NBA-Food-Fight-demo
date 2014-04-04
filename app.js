// Includes
var $ = require('jquery');
var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var superagent = require('superagent');
var exphbs = require('express3-handlebars');

//Global Variable Declarations

//Grab Orchestrate.io API key from local file 
//(to support easy key shielding)
var orcKey = fs.readFileSync('./orcKey', {encoding: 'utf8'}).replace('\n', '');

//Grab xmlstats API key from local file
var xmlstatsKey = fs.readFileSync('./xmlstatsKey', {encoding: 'utf8'}).replace('\n', '');
var xmlstatsRoot = 'https://erikberg.com/';
var db = require('orchestrate')(orcKey);

var app = express();

var port = Number(process.env.PORT || 5000);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.logger('dev'));
app.use(express.bodyParser());


app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/Teams', function(req, res) {
	db.list('Teams', {limit: 100})
	.then(function(result) {
		console.log(result.body.results);
		res.send(result.body.results);
	});
});


app.get('*', function(req, res) {
	console.log('[' + req.ip + '] ' + req.url  + ': Request from World.');
	res.send(404);
});

app.listen(port, function() {
 	console.log('Listening on port: ' + port);
});

// Put Routes
// Andrew


// End Put Routes



// Get Routes
// Ian


// End Get Routes

// Database Updates
// Colin

function addEventToDB(eventObject) {

}



// End Database Updates
