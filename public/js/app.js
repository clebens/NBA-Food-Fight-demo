define(function(require) {

  //Load jquery + add cookie funcitonality to jquery
  var $ = require('jquery');
  require('jquery-cookie');

  var Thorax = require('thorax');
  var backbone = require('backbone');
  var Router = require('router');
  var app = {};

    // initialize menu handlers
  $('#menu-user-picks').click("user-picks", displayMenuItem);
  $('#menu-current-schedule').click("current-schedule", displayMenuItem);
  $('#menu-user-food').click("user-food", displayMenuItem);
  $('#menu-user-signout').click("user-signout", displayMenuItem);


  if ($.cookie('userName')) {
    $('#about').hide();
    displayMenuItem({data: 'user-picks'});
  } else {
    displayMenuItem({data: "current-schedule"});
  }

  function displayMenuItem(eventObject) {
      console.log("eventObject.data:" + eventObject.data);

      if (eventObject.data === 'current-schedule') {
        $('#schedule-output').show();
      } else {
        $('#schedule-output').hide();
      }

      if (eventObject.data === 'user-food') {
        $('#user-food').show();
      } else {
        $('#user-food').hide();
      } 

      if (eventObject.data === 'user-picks') {
        $('#user-picks').show();
        $('#most-recent-result').show();
        $('#currently-selected-game').show();
      } else {
        $('#user-picks').hide();
      }

      if (eventObject.data === "user-signout") {
        userView.signOut();
        $('#schedule-output').show();
        $('.active').removeClass('active');
      }
      $('#failed-login').hide();
      $('#user-name').show();
  }
  
  var UserView = require('views/user-view');
  var UserModel = require('models/user-model');
  var currentUserModel = new UserModel({
    //initialize:  function () {
        //var curUserName = $.cookie('user-name');

        //if (curUserName) {
        //   this.set('userName', curUserName);
        //this.set('id', curUserName);
        //this.fetch();
      //}
    //}
  });
  
  var userView = new UserView({
    el: '#user-display',
    template: require('hbs!templates/user-display'),
    menuTemplate: require('hbs!templates/user-menu'),
    show: false,
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
    'menuTag': '#user-menu'
  });

  Backbone.history.start();
  currentSchedule.fetch();



});
