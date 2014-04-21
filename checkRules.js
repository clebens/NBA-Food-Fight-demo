// Wonky formatting because the function is basically just a giant
// switch statement; therefore formatting is designed to make
// internal logic readable and exterior wonky


var checkRules = function(dbObject) {
dbObject.homeTeam.foodRules.forEach(function(item, index) {
switch (item.ruleId){		

// Sets a "foodWon" value to ___true____ or ___false___
// Therefore -  evaluate (foodWon ==== true) on frontend 
// to test if food was won. 
// *** TO TEST IF FOOD LOST -
// 		Must test (foodWon === false) because (!foodWon)
//		may evaulate to true on either:
//			foodWon == undefined OR 
//			(foodWon == false)

// ruleId: homeTeam100pts
// if statsObject.home_totals.points >= 100, item.foodWon = true

case 'homeTeam100pts': 
	if (dbObject.statsObject) {
		if(dbObject.statsObject.home_totals.points >= 100) {
			item.foodWon = true;
		} else {
			item.foodWon = false;
		}
	}
	break;

default:
	break;




}
});
}

module.exports = checkRules;