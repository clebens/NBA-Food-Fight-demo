define(function(require) {
	var Backbone = require('backbone');
	var $ = require('jquery');
	require('jquery-cookie');
	
	var Router = Backbone.Router.extend({

		routes: {
			'': 'initPage',
			'team': 'showTeam',
			'schedule': 'showCurrentSchedule',
			'user-signin': 'showUserSignin',
			'user-view': 'showUser',
			'user-signup': 'showSignup',
			'user-food': 'showUserFood'
		},

		initialize: function(options) {	
			// Assign passed User Objects 
			this.userSignoutView = options.userSignoutView;
		    this.userSigninView = options.userSigninView;
		    this.userSignupView = options.userSignupView;
		    this.userView = options.userView;
		    this.currentScheduleView = options.currentScheduleView;
		    this.userFoodView = options.userFoodView;
		    
		},

		initPage: function() {
			console.log('here');
			console.log($.cookie('user-name'));
			if ($.cookie('user-name')) {
				this.showUser();
			} else {
				this.showUserSignin();
			}
			this.showCurrentSchedule();
		},

		showCurrentSchedule: function() {
			this.currentScheduleView.$el.show();
		},

		showUserSignin: function () {

			this.showUserElement('signIn');

		 //    this.userSigninView.$el.show();
		 //    this.userSignupView.$el.hide();
		 //    this.userView.$el.hide();
		 //    this.userFoodView.$el.hide();
			// this.currentScheduleView.$el.show();
			// $("#most-recent-result").show();
			// $("#contact-info").show();
			// $(".col-xs-6").last().show();
		},

		showUser: function (options) {
			this.showUserElement('userDisplay');
		 //    this.userSigninView.$el.hide();
		 //    this.userSignupView.$el.hide();
		 //    this.userView.$el.show();
		 //    this.userFoodView.$el.hide();
			// this.currentScheduleView.$el.show();
			// $("#most-recent-result").show();
			// $("#contact-info").show();
			// $(".col-xs-6").last().show();
		},

		showSignup: function () {
		 //    this.userSigninView.$el.hide();
		 //    this.userView.$el.hide();
		 //    this.userSignupView.$el.show();
		 //    this.userFoodView.$el.hide();
			// this.currentScheduleView.$el.show();
			// $("#most-recent-result").show();
			// $("#contact-info").show();
			// $(".col-xs-6").last().show();
		},

		showUserFood: function () {
		 //    this.userView.$el.hide();
		 //    this.userSignupView.$el.hide();
		 //    this.userFoodView.$el.show();
			// this.currentScheduleView.$el.hide();
		},

		showUserElement: function(element) {

	      if (element === 'signIn') {
	        this.userSigninView.$el.show();
	      } else {
	        this.userSigninView.$el.hide();
	      }

	      if (element === 'userDisplay') {
		    this.userView.$el.show();
	      } else {
		    this.userView.$el.hide();
	      }
		  
		}


	});

	return Router;
});