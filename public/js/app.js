define(function(require) {

  //Load jquery + add cookie funcitonality to jquery
  var $ = require('jquery');
  require('jquery-cookie');

  var Thorax = require('thorax');
  var backbone = require('backbone');
  var Router = require('router');
  var app = {};

    // initialize menu handlers
  $('#menu-about').click("about", displayMenuItem);
  $('#menu-most-recent-result').click("most-recent-result", displayMenuItem);
  $('#menu-currently-selected-game').click("currently-selected-game", displayMenuItem);
  $('#menu-user-food').click("user-food", displayMenuItem);


  displayMenuItem({data: "about"});

  function displayMenuItem(eventObject) {
      console.log("eventObject.data:" + eventObject.data);
      
      if (eventObject.data === 'about') {
        $('#about').show();
      } else {
        $('#about').hide();
      }

      if (eventObject.data === 'most-recent-result') {
       $('#most-recent-result').show();
      } else {
        $('#most-recent-result').hide();
      }

      if (eventObject.data === 'currently-selected-game') {
        $('#currently-selected-game').show();
      } else {
        $('#currently-selected-game').hide();
      }

      if (eventObject.data === 'user-food') {
        $('#user-food').show();
      } else {
        $('#user-food').hide();
      } 
  }
  
  var UserView = require('views/user-view');
  var UserModel = require('models/user-model');
  var currentUserModel = new UserModel({
    initialize:  function () {
    var curUserName = $.cookie('user-name');

      if (curUserName) {
        this.set('userName', curUserName);
        this.set('id', curUserName);
        this.fetch();
      }
    }
  });
  
  var userView = new UserView({
    el: '#user-display',
    template: require('hbs!templates/user-display'),
    menuTemplate: require('hbs!templates/user-menu'),
    show: true,
    menuTag: '#user-menu',
    model: currentUserModel
  });

  var userSigninView = new UserView({
    el: '#user-signin',
    showMenu: false,
    template: require('hbs!templates/user-signin'),
    render: function() { this.$el.html(this.template(this.model.toJSON())); },
    model: currentUserModel
  });

  // var userSignupView = new UserView({
  //   el: '#user-signup',
  //   template: require('hbs!templates/user-signup'),
  //   render: function() { this.$el.html(this.template(this.model.toJSON())); },
  //   model: currentUserModel
  // });	

  var userFoodView = new UserView({
    el: '#user-food',
    template: require('hbs!templates/user-food'),
    render: function() { this.$el.html(this.template(this.model.toJSON())); },
    model: currentUserModel
  }); 

  
  var Schedule           = require('collections/schedule-collection');
  var ScheduleView = require('views/schedule-view');
  
  var currentSchedule  = new Schedule();

  currentSchedule.fetch();


  var currentScheduleView = new ScheduleView(currentSchedule);

  userView.render();
  var router = new Router({
    // User Header Views
    'userView': userView,
    'userSigninView': userSigninView,
    // 'userSignupView': userSignupView,

    // Schedule Views
    'currentScheduleView': currentScheduleView,
    // 'userFoodView': userFoodView
    // User Awards Views
  });

  Backbone.history.start();

});