define(function(require) {

  var $ = require('jquery');
  var backbone = require('backbone');
  var Router = require('router');
  var app = {};
  var UserView = require('./views/user-view');
  var UserModel = require('./models/user')

	var foodFightRouter = new Router();



var userView = new UserView({model: UserModel});
userView.render();

/*    var currentWeatherView = new CurrentWeatherView({
      model: currentWeatherMode
    });
    
    var dailyForecastView = new ForecastView({
      el: '#daily-forecast',
      template: require('hbs!templates/forecast-7'),
      collection: dailyForecastCollection
    });

    var hourlyForecastView = new ForecastView({
      el: '#hourly-forecast',
      template: require('hbs!templates/forecast-48'),
      collection: hourlyForecastCollection
    });
  */
    var router = new Router({
      current: currentWeatherView,
      dailyForecast: dailyForecastView,
      hourlyForecast: hourlyForecastView
    });

    Backbone.history.start();

/*
    app.current = currentWeatherModel;
    app.forecast = dailyForecastCollection;
    app.views = {};
    app.views.currentWeatherView = currentWeatherView;
    app.views.dailyForecastView = dailyForecastView;
*/

  //window.app = app;


});