// Includes
var express = require('express');
var fs = require('fs');

//Global Variable Declarations

//Grab Orchestrate.io API key from local file 
//(to support easy key shielding)
var orcKey = fs.readFileSync('./orcKey', {encoding: 'utf8'}).replace('\n', '');

//Grab xmlstats API key from local file
var xmlstatsKey = fs.readFileSync('./xmlstatsKey', {encoding: 'utf8'}).replace('\n', '');

var db = require('orchestrate')(orcKey);

var app = express();

var port = 3000;


// Put Routes
// Andrew


// End Put Routes



// Get Routes
// Ian


// End Get Routes



// Database Updates
// Colin

// End Database Updates


// app.get('/api/Users/:userId', function (req, res) {
// 	console.log('[' + req.ip + '] ' + req.url  + ': Request from ' + req.params.userId + '.');
// 	res.status(200);
// 	res.set('Content-type', 'text/html');

// 	db.get('Users', req.params.userId)
// 	.then(function(result){
// 		res.send(result.body);			
// 	})
// 	.fail(function(err){
// 		console.log(err);
// 	});

// });

// app.get('/api/Users/', function (req, res) {
// 	console.log('[' + req.ip + '] ' + 'Request from ' + req.params.userId + '.');
// 	res.status(200);
// 	res.set('Content-type', 'text/html');

// 	db.list('Users')
// 	.then(function(result) {
// 		res.send(result);

// 	})
// 	.fail(function(err){
// 		res.send(err);
// 		console.log(err);
// 	});

// });


// app.post('/api/user/:userName', function(req, res) {
// 	console.log('[' + req.ip + '] ' + 'Request from ' + req.params.userName + '.');
// 	res.status(200);
// 	res.set('Content-type', 'text/html');
// 	res.send('Hello, ' + req.params.userName + '!');
// });

// function postUserHandler(req, res) {
// 	res.send('Added user!');
// }

// app.get('*', function(req, res) {
// 	console.log('[' + req.ip + '] ' + req.url  + ': Request from World.');
// 	res.end('Hello, world!');
// });

// app.listen(port, function() {
// 	console.log('Listening on port: ' + port);
// });