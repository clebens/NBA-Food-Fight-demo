
// Includes
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



function getEvents(date) {
	//Format the date string: yyyyMMdd

	var year = date.getFullYear().toString();
	var month = (date.getMonth() + 1).toString();
	if(parseInt(month, 10) < 10) {
		month = '0' + month;
	}
	var day = date.getDate().toString();
	if(parseInt(day, 10) < 10) {
		day = '0' + day;
	}
	
	var dateString = year + month + day;
	
	superagent
	.get('https://erikberg.com/events.json?date=' + dateString + '&sport=nba')
	.set('Authorization', 'Bearer ' + xmlstatsKey)
	.set('User-Agent', 'NBA-FF v.1 (colin.lebens@gmail.com)')
	.end(function(res) {
		
		var qty = res.body.event.length;
		var count = 0;
		var eventArray = res.body.event;

		function next() {
			if (eventArray[count]) {
				var item = eventArray[count];
				// Foreach Contents
				var key = item.event_id;
				var dbObject = {
					'homeTeamId': item.home_team.team_id,
					'awayTeamId': item.away_team.team_id,
					'eventStatus': item.event_status,
					'eventTime': new Date(item.start_date_time),
					'statsObject': {}
				};
				if (dbObject['eventStatus'] === 'completed') {
					addStatsToDBObject(dbObject, key);
				} else {
					addHomeTeamToDBObject(dbObject, key);
				}
				// End Foreach Contents
				count++;

				// Delay between accesses (in ms)
				setTimeout(next, 10000);
			}
		}

		next();
	
	});


	function addStatsToDBObject(dbObject, event_id) {
		superagent
		.get('https://erikberg.com/nba/boxscore/' + event_id + '.json')
		.set('Authorization', 'Bearer ' + xmlstatsKey)
		.set('User-Agent', 'NBA-FF v.1 (colin.lebens@gmail.com)')
		.end(function(res) {
			dbObject.statsObject = res.body;
			addHomeTeamToDBObject(dbObject, event_id);
		});
	}

	function addHomeTeamToDBObject(dbObject, event_id) {
		db.get('Teams', dbObject.homeTeamId)
		.then(function(result) {
			dbObject.homeTeam = result.body;
			addAwayTeamToDBObject(dbObject, event_id);

		})
		.fail(function(err){
			console.log(err);
		})
	}

	function addAwayTeamToDBObject(dbObject, event_id) {
		db.get('Teams', dbObject.awayTeamId)
		.then(function(result) {

			dbObject.awayTeam = result.body;

			db.put('Events', event_id, dbObject)
			.then(function(result) {
				console.log(event_id + ' added to Events collection.')
			})
			.fail(function(err) {
				console.error(err);
			}); 

		})
		.fail(function(err){
			console.log(err);
		})
	}

} 

function addTeamToDB(teamId, teamObject) {
	console.log(teamId + ': ' + JSON.stringify(teamObject));
	db.put('Teams', teamId, teamObject); 
}

var today = new Date();
var yesterday = new Date();
var tomorrow = new Date();
yesterday.setDate(yesterday.getDate()-1);
tomorrow.setDate(tomorrow.getDate()+1);

/* Update every 20 seconds) */
exports.getTimelyEvents = function() {
	getEvents(tomorrow);
	getEvents(today);
	getEvents(yesterday);
}

// Uncomment next line to clear database before updating
db.deleteCollection('Events');

// Uncomment next line to execute database update from
// command line (rather than in dependent source);
exports.getTimelyEvents();

//set to update events every two hours
//setInterval(getTimelyEvents, 7200000);

