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


// use the following if you want to be able to parse the body of the request
// app.configure(function(){
//   app.use(express.bodyParser());
// });

app.get('*', function(req, res) {
	console.log('[' + req.ip + '] ' + req.url  + ': Request from World.');
	res.send(404);
});

app.listen(port, function() {
 	console.log('Listening on port: ' + port);
});

// Put Routes
// Andrew

app.put("/Users/:userId/add", function(req, res) {
  // addUserInfo(req);
  res.send("Adding profile for user: " + req.params.userId + ".");
});

app.put("/Users/:userId/edit", function(req, res) {
  // editUserInfo(req);
  res.send("Editing profile for user: " + req.params.userId + ".");
});

// function addUserInfo (info) {

//   var user = {
//     "userName": "info.params.userId"
    // foodAwards: info.params.foodAwards,
    // record: info.params.record,
    // previousResult: info.params.previousResult,
    // dailySelection: info.params.dailySelection
//   };

//   db.put('Users', info.params.userId, user);

// }


//db.put("collection", "key", obj) -->
//to change one field, need to get the complete db object, then overwrite the field and put it back


// End Put Routes



// Get Routes
// Ian


// End Get Routes

// Database Updates
// Colin

function addEventToDB(eventObject) {

}



// End Database Updates
