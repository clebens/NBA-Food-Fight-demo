define(function(require) {

	var Backbone = require('backbone');

	var User = Backbone.Model.extend({
	
		defaults: {
		    userName: '',
		    foodAwards: '',
		    record: {},
		    previousResult: {},
		    dailySelection: {}
		}, 

		initialize: function() {

		},

		validate: function() {

		}



	});

	return User;
});

