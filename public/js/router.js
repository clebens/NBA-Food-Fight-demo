define(function(require) {
	var Backbone = require('backbone');

	var Router = Backbone.Router.extend({
		

		routes: {
			'current': 'displayCurrentWeather',
			'forecast': 'displayForecast',
			'hourly-forecast': 'displayHourlyForecast'
		},

		initialize: function(options) {
			this.currentWeatherView = options.current;
			this.forecastView = options.forecast;
			this.hourlyForecastView = options.hourlyForecast;
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