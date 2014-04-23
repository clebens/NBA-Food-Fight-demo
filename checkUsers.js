function checkUsers() {
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

	// Search Query: -dailySelection:"{}"

	// db.newSearchBuilder()
	// .collection('Users')
	// .limit(100)
	// .query('*:*')
	// .then(function(result) {
	// 	result.body.results.forEach( function(item) {
	// 		console.log(item);
	// 	});
	// }); 

	// });
	var i =0;
	db.list('Users', {limit:100})
	.then(function(result) {
		result.body.results.forEach( function(item) {
				if(item.value.dailySelection) evaluateWhetherWon(item.value)
			});
	})
	.fail(function(err) {
		console.log(err);
	});

	function evaluateWhetherWon(user) {
		console.log(user.dailySelection);
		db.get('Events', user.dailySelection)
		.then(function(dailySelection){
			dailySelection = dailySelection.body;
			
			if (dailySelection.eventStatus == 'completed') {
				dailySelection.homeTeam.foodRules.forEach(function(foodRule) {
					
				// FOOD RULE DATA AVAILABLE
				user.previousResult = dailySelection;
				user.dailySelection = null;
				if (!user.foodAwards.length) {
					user.foodAwards = [];
				}

				if (!user.record.wins) {
					user.record.wins = 0;
				}

				if (!user.record.losses) {
					user.record.losses = 0;
				}

				if (foodRule.foodWon === true) {
					user.record.wins++;
					user.foodAwards.push(foodRule.foodId);
				} else {
					user.record.losses++;
				}

				db.put('Users', user.id, user);

				console.log("Written to DB");
				console.log("-------------");
				console.log(user);


				});
			}

		})
		.fail(function(err) {
			// console.log(err);
		});
	}

}

checkUsers();