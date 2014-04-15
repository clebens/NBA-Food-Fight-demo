define(function(require) {

  var $ = require('jquery');
  var backbone = require('backbone');
  var Router = require('router');
  var app = {};
  var UserView = require('./views/user-view');
  var UserModel = require('./models/user')

	var foodFightRouter = new Router();


  // var userModel = new UserModel();
  // var userView = new UserView({model: userModel});
  // userView.render();

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

  var Schedule           = require('collections/schedule-collection');
  var ScheduleView = require('views/schedule-view');
  var Router             = require('router');

  var currentSchedule  = new Schedule();

  currentSchedule.fetch();

  console.log(currentSchedule);
  
  var scheduleView = new ScheduleView(currentSchedule);

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