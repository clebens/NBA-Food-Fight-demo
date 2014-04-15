define(function(require) {
	var Backbone = require('backbone');

	var Router = Backbone.Router.extend({
		

		routes: {
			'team': 'showTeam',
			'schedule': 'showDailySchedule',
			'sign-up': 'showUserSignin',
			'user-main': 'showUser',
			'user-signup': 'showSignup',
			'user-food': 'showUserFood'
		},

		initialize: function(options) {
					},

		showTeam: function() {
		//	this.teamView
		},

		showDailySchedule: function() {
			

		},

		showUserSignin: function () {
      this.userSignedOut.$el.hide();
      this.userSignedIn.$el.hide();
      this.userSignUp.$el.show();
      this.userFood.$el.hide();
		},

		showUser: function () {
			//
		},

		showSignup: function () {
			//
		},
		showUserFood: function () {

		}


	});

	return Router;
});