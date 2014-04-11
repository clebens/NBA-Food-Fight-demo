define(function(require) {
	var Backbone = require('backbone');

	var Router = Backbone.Router.extend({
		

		routes: {
			'team': 'showTeam',
			'forecast': 'displayForecast',
			'hourly-forecast': 'displayHourlyForecast'
		},

		initialize: function(options) {
			this.teamView = options.team;
				},

		showTeam: function() {
			this.teamView
		},

		displayForecast: function() {
			this.showElement('forecast');
		},

		displayCurrentWeather: function() {
			this.showElement('current-weather');
		},

		displayHourlyForecast: function() {
			this.showElement('hourly-forecast');
		},

		showElement: function(element) {

			if (element==='forecast') {
				this.forecastView.$el.show();
			} else {
				this.forecastView.$el.hide();
			}
			
			if (element==='hourly-forecast') {
				this.hourlyForecastView.$el.show();
			} else {
				this.hourlyForecastView.$el.hide();
			}
			
			if (element==='current-weather') {
				this.currentWeatherView.$el.show();
			} else {
				this.currentWeatherView.$el.hide();
			}
			
		}
	});

	return Router;
});