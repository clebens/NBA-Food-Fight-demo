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
		    this.userSigninView.$el.show();
		    this.userSignupView.$el.hide();
		    this.userView.$el.hide();
  	    this.userFoodView.$el.hide();
		},

		showUser: function (options) {
			// console.log(options.attributes);
			// this.model.set('userName', 'user-name');

			// this.Model.set('password', this.userView.$el.attr("password"));
			
			// this.model.save();
			// alert(this.model.attributes);
	    this.userSigninView.$el.hide();
	    this.userSignupView.$el.hide();
	    this.userView.$el.show();
	    this.userFoodView.$el.hide();

			// var userName = $('#user-signup').html();
			// var userName = $('#user-signup').children().children().html();
			// var userName = $("#user-name");
			// var userName = $("#user-name").filter(":input")[0];
			// var userName = $('.panel').find('input[name="user-name"]').val();
			// console.log(userName);
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
	    this.userFoodView.$el.hide();
		},

		showUserFood: function () {
	    this.userSigninView.$el.hide();
	    this.userView.$el.hide();
	    this.userSignupView.$el.hide();
	    this.userFoodView.$el.show();
		}


	});

	return Router;
});