define(function(require) {
	var Backbone = require('backbone');

	var Router = Backbone.Router.extend({
		

		routes: {
			'/': 'initPage',
			'edit-team/:team': 'editTeam',
			'team': 'showTeam',
			'schedule': 'showCurrentSchedule',
			'user-signin': 'showUserSignin',
			'user': 'showUser',
			'user-signup': 'showSignup',
			'user-food': 'showUserFood'
		},

		initialize: function(options) {	

		// Assign passed User Objects 
		this.userSignoutView = options.userSignoutView;
	    this.userSigninView = options.userSigninView;
	    this.userSignupView = options.userSignupView;
	    this.currentScheduleView = options.currentScheduleView;

		},

		initPage: function(options) {
			this.showUserSignin();
			this.showCurrentSchedule();
		},

		showCurrentSchedule: function() {
			this.editTeamView.$el.hide();
			this.currentScheduleView.$el.show();
		},

		editTeam: function() {
			this.currentScheduleView.$el.hide();

		},

		showUserSignin: function () {
	    this.userSigninView.$el.show();
	    this.userSignupView.$el.hide();
		},

		showUser: function () {
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