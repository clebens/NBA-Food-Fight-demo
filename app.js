var express = require('express');
var key = 'c446cb0c-dca0-4fae-b5dc-31e296dd7f4a';

var db = require('orchestrate')(key);

var app = express();

var port = 3000;


// Put Routes
// Andrew


// End Put Routes



// Get Routes
// Ian

// Get Users

app.get('/Users/:username', function (req, res) {
	 db.get('Users', req.params.username)
	.then(function (result) {
		console.log(result.body);
		res.send(result.body)
	})
	.fail(function (err) {

		res.end('No user found.')
	})
})


app.get('/Users', function (req, res) {
	 db.list('Users')
	.then(function (result) {
		console.log(result.body);
		res.send(result.body)
	})
	.fail(function (err) {

		res.end('No users found.')
	})
})



// Get Events

app.get('/Events/:gamekey', function (req, res) {
	 db.get('Events', req.params.gamekey)
	.then(function (result) {
		console.log(result.body);
		res.send(result.body)
	})
	.fail(function (err) {

		res.end('That game does not exist.')
	})
})

app.get('/Events', function (req, res) {
	 db.list('Events')
	.then(function (result) {
		console.log(result.body);
		res.send(result.body)
	})
	.fail(function (err) {

		res.end('No games found.')
	})
})

// Get Foods

app.get('/Foods', function (req, res) {
	 db.list('Foods')
	.then(function (result) {
		console.log(result.body);
		res.send(result.body)
	})
	.fail(function (err) {

		res.end('No food found.')
	})
})


app.get('/Foods/:food', function (req, res) {
	 db.get('Foods', req.params.food)
	.then(function (result) {
		console.log(result.body);
		res.send(result.body)
	})
	.fail(function (err) {

		res.end('That food does not exist.')
	})
})


// Get Teams
app.get('/Teams', function (req, res) {
	 db.list('Teams')
	.then(function (result) {
		console.log(result.body);
		res.send(result.body)
	})
	.fail(function (err) {

		res.end('No teams found.')
	})
})


app.get('/Teams/:teamname', function (req, res) {
	 db.get('Teams', req.params.teamname)
	.then(function (result) {
		console.log(result.body);
		res.send(result.body)
	})
	.fail(function (err) {

		res.end('That team was not found.')
	})
})

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

app.listen(port, function() {
	console.log('Listening on port: ' + port);
});