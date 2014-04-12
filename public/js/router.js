define(function(require) {
	var Backbone = require('backbone');

	var Router = Backbone.Router.extend({
		

		routes: {
			'team': 'showTeam',
			'schedule': 'showDailySchedule',
			'hourly-forecast': 'displayHourlyForecast'
		},

		initialize: function(options) {
					},

		showTeam: function() {
		//	this.teamView
		},

		showDailySchedule: function() {
			
			var Schedule           = require('collections/schedule-collection');
			var Router             = require('router');

		    
		    var currentSchedule  = new Schedule();

	    	currentSchedule.fetch();
	    	
	    	var filteredSchedule = currentSchedule.chain()
	    	.map(function(item) { return item.get('homeTeamId')})
	    	.value();
		    
		    console.log(currentSchedule);
		    console.log(filteredSchedule);

		}


	});

	return Router;
});