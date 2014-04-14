define(function(require) {
	var Backbone = require('backbone');

	var Router = Backbone.Router.extend({
		

		routes: {
			'team': 'showTeam',
			'food': 'displayForecast',
			'hourly-forecast': 'displayHourlyForecast'
		},

		initialize: function(options) {
			this.teamView = options.team;

		},

		showTeam: function () {
			this.teamView.$el.show();
		}

		
	});

	return Router;
});