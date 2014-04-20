define(function(require) {
	var Backbone = require('backbone');

	var Router = Backbone.Router.extend({
		

		routes: {
			'/': 'initPage',
			'edit-team/:team': 'editTeam',
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
    // console.log(this.userView.model);
    // console.log(this.userView);

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

		}

		showUserSignin: function () {
	    this.userSigninView.$el.show();
	    this.userSignupView.$el.hide();
	    this.userView.$el.hide();
			// var userName = $('.panel').html();
			// console.log(userName);
		},

		showUser: function (options) {
	    this.userSigninView.$el.hide();
	    this.userSignupView.$el.hide();
	    this.userView.$el.show();
			// var userName = $('#user-signup').html();
			// var userName = $('#user-signup').children().children().html();
			var userName = $("#user-name");
			// var userName = $("#user-name").filter(":input")[0];
			// var userName = $('.panel').find('input[name="user-name"]').val();
			console.log(userName);
			// this.userView.model.set('userName', userName);
			// console.log(this.userView);

			// this.model.set('password', this.userView.$el.attr("password"));
			
			// this.model.save();
			// alert(this.model.attributes);

			//
		},

		showSignup: function () {
	    this.userSigninView.$el.hide();
	    this.userView.$el.hide();
	    this.userSignupView.$el.show();
			// var userName = $('.panel').html();
			// console.log(userName);
		},

		showUserFood: function () {

		}


	});

	return Router;
});