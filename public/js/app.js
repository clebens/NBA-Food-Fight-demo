define(function(require) {

  var $ = require('jquery');
  var Thorax = require('thorax');
  var backbone = require('backbone');
  var Router = require('router');
  var app = {};
  var UserView = require('views/user-view');
  var UserModel = require('models/user');


  // var userSigninView = new UserView({
  //   el: '#user-signin',
  //   template: require('hbs!templates/user-signin'),
  //   model: UserModel
  // });

  var userView = new UserView({
    el: '#user-display',
    template: require('hbs!templates/user-display'),
    model: UserModel
  });

  var userSignupView = new UserView({
    el: '#user-signup',
    template: require('hbs!templates/user-signup'),
    render: function() { this.$el.html(this.template(this.model.toJSON())); },
    model: UserModel
  });	

  var userFoodView = new UserView({
    el: '#user-food',
    template: require('hbs!templates/user-food'),
    model: UserModel
  }); 

  var foodFightRouter = new Router({
    userSignin: userSigninView,
    user: userView,
    userSignup: userSignupView,
    userFood: userFoodView
  });



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
    // var router = new Router({
    //   current: currentWeatherView,
    //   dailyForecast: dailyForecastView,
    //   hourlyForecast: hourlyForecastView
    // });

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