var fs = require('fs');
var superagent = require('superagent');

var orcKey = fs.readFileSync('./orcKey', {encoding: 'utf8'}).replace('\n', '');

//Grab xmlstats API key from local file
var xmlstatsKey = fs.readFileSync('./xmlstatsKey', {encoding: 'utf8'}).replace('\n', '');
var xmlstatsRoot = 'https://erikberg.com/';
var db = require('orchestrate')(orcKey);

function updateTeamsFromXMLStats() {


	superagent
	.get(xmlstatsRoot + 'nba/teams.json')
	.set('User-Agent', 'NBA-FF v.1 (colin.lebens@gmail.com)')
	.end(function(res) {
		
		res.body.forEach(function(xmlTeamObj) {
			var teamObject={};
			var teamId;
			
			teamId = xmlTeamObj['team_id'];
			teamObject['teamName'] = xmlTeamObj['first_name'] + ' ' +
										xmlTeamObj['last_name'];
			teamObject['teamLogo'] = '/images/logos/' + teamId + '-logo.jpg';
			teamObject['foodRules'] = [{
				'foodId': 'chalupa',
				'foodRule': '100pts',
				'ruleDescription': 'If the ' + teamObject['teamName'] + ' score 100 points, you win a Chalupa!',
			}];

			var foodsComplete = 0;
			
			teamObject.foodRules.forEach(function(item, index, array) {
			
			//console.log(item.foodId);
				db.get('Foods', item.foodId)
				.then(function(result) {
					item.foodId = result.body.foodId;
					item.foodIcon = result.body.foodIcon;
					item.foodDescription = result.body.foodDescription;
					item.foodDescription = result.body.foodDescription;
					foodsComplete++;
					if (foodsComplete === array.length) {
						addTeamToDB(teamId, teamObject);
					} 
				})
				.fail(function(err) {
					console.log(err);
				});
			});

			
			
		});
			
	});		
}

function addTeamToDB(teamId, teamObject) {
	console.log(teamId + ': ' + JSON.stringify(teamObject));
	db.put('Teams', teamId, teamObject); 
}

function addTeamKeyToDB(key) {
	var success = false;
	var intervalObj;

	function dbEdit() {
		db.get('Teams', 'keys')
		.then (function(result) {
			var keyList = result.body.keyList;
			var ref = result.headers.etag;
			
			keyList.push(key);
			console.log(keyList);
			db.put('Teams', 'keys', {"keyList": keyList}, ref)
			.then(function(result) {
				clearInterval(intervalObj);
				console.log(keyList);
			})
			.fail(function(err) {
				//console.log(err);
			});
		})
		.fail(function(err) {
			console.log('Cant find keys');
		});

			
	}

	intervalObj = setInterval(dbEdit, Math.floor(Math.random() * 2000) + 1000);

}


updateTeamsFromXMLStats();