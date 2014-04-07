// Includes
var $ = require('jquery');
var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var superagent = require('superagent');
var exphbs = require('express3-handlebars');
var async = require('async');

//Global Variable Declarations

//Grab Orchestrate.io API key from local file 
//(to support easy key shielding)
var orcKey = fs.readFileSync('./orcKey', {encoding: 'utf8'}).replace('\n', '');

//Grab xmlstats API key from local file
var xmlstatsKey = fs.readFileSync('./xmlstatsKey', {encoding: 'utf8'}).replace('\n', '');
var xmlstatsRoot = 'https://erikberg.com/';
var db = require('orchestrate')(orcKey);



/* function updateWithTeamList() {
	function getTeamList(callback) {
		var teamList = [];
		

		db.list('Teams', {limit: 100})
		.then(function(result) {
			result.body.results.forEach(function(item) {
				teamList.push(item.path.key);
			});

			callback(teamList);	
		})
		.fail(function(err) {
			console.log(err);
		});	

	}	

	function updateEvents(teamList) {
	
	var getEventsByTeamID = function(teamId) {
		superagent
		.get('https://erikberg.com/nba/results/' + teamList + '.json')
		.set('Authorization', 'Bearer ' + xmlstatsKey)
		.set('User-Agent', 'NBA-FF v.1 (colin.lebens@gmail.com)')
		.end(function(res) {
			db
		});
	}




	getTeamList(updateEvents);
	
} */

function sendXMLToDb(collection, key, data) {
	db.put(collection, key, data);
}

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
		console.log(qty);
		var count = 0;
		var eventArray = res.body.event;

		function next() {
			if (eventArray[count]) {
				item = eventArray[count];
				// Foreach Contents
				var key = item.event_id;
				var dbObject = {
					'homeTeamId': item.home_team.team_id,
					'awayTeamId': item.away_team.team_id,
					'eventStatus': item.event_status,
					'statsObject': {}
				};

				if (dbObject['eventStatus'] == 'completed') {
					addStatsToDBObject(dbObject, key);
				} else {
					db.put('Events', item.event_id, dbObject);
				}
				// End Foreach Contents
				count++;
				setTimeout(next, 10000);
			}
		}

		next();
	});


	function addStatsToDBObject(dbObject, event_id) {
		console.log('Object: ');
		console.log(dbObject);

		superagent
		.get('https://erikberg.com/nba/boxscore/' + event_id + '.json')
		.set('Authorization', 'Bearer ' + xmlstatsKey)
		.set('User-Agent', 'NBA-FF v.1 (colin.lebens@gmail.com)')
		.end(function(res) {
			dbObject.statsObject = res.body;
			db.put('Events', event_id, dbObject);
		});
	}

} 

function addTeamToDB(teamId, teamObject) {
	console.log(teamId + ': ' + JSON.stringify(teamObject));
	db.put('Teams', teamId, teamObject); 
}

var today = new Date();
var yesterday = new Date();
yesterday.setDate(yesterday.getDate()-1);

/* Update every 20 seconds) */
function getTimelyEvents() {
	//getEvents(today);
	getEvents(yesterday);
	console.log('blah')
}

getTimelyEvents();

