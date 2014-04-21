define(function(require) {
	var Backbone = require('backbone');
	var $ = require('jquery');
	
	var Router = Backbone.Router.extend({

		routes: {
			'/': 'initPage',
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

		},

		initPage: function(options) {
			this.showUserSignin();
			this.showCurrentSchedule();
		},

		showCurrentSchedule: function() {
			this.currentScheduleView.$el.show();
		},

		showUserSignin: function () {
	    this.userSigninView.$el.show();
	    this.userSignupView.$el.hide();
	    this.userView.$el.hide();
		},

		showUser: function (options) {
			console.log(options.attributes);
			this.model.set('userName', 'user-name');

			this.Model.set('password', this.userView.$el.attr("password"));
			
			this.model.save();
			alert(this.model.attributes);
	    this.userSigninView.$el.hide();
	    this.userSignupView.$el.hide();
	    this.userView.$el.show();
			//
		},

		showSignup: function () {
	    this.userSigninView.$el.hide();
	    this.userSignupView.$el.show();
		},

		showUserFood: function () {

		}


	});

	return Router;
});