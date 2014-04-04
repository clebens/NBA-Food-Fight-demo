var fs = require('fs');
var superagent = require('superagent');

var orcKey = fs.readFileSync('./orcKey', {encoding: 'utf8'}).replace('\n', '');

//Grab xmlstats API key from local file
var xmlstatsKey = fs.readFileSync('./xmlstatsKey', {encoding: 'utf8'}).replace('\n', '');
var xmlstatsRoot = 'https://erikberg.com/';
var db = require('orchestrate')(orcKey);

function updateTeamsFromXMLStats() {
	db.deleteCollection('Teams');

	superagent
	.get(xmlstatsRoot + 'nba/teams.json')
	.set('User-Agent', 'NBA-FF v.1 (colin.lebens@gmail.com)')
	.end(function(res) {
		
		res.body.forEach(function(xmlTeamObj) {
			var teamObject={};
			var teamId;
			
			teamId = xmlTeamObj['team_id'];
			teamObject['teamName'] = xmlTeamObj['first_name'] + ' '
										xmlTeamObj['last_name'];
			teamObject['teamLogo'] = '/images/logos/' + teamId + '-logo.jpg';
			teamObject['foodRules'] = [];
			addTeamToDB(teamId, teamObject);
		});
			
	});		
}

function addTeamToDB(teamId, teamObject) {
	console.log(teamId + ': ' + JSON.stringify(teamObject));
	db.put('Teams', teamId, teamObject); 
}

updateTeamsFromXMLStats();