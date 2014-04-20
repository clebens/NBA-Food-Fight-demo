define(function(require) {

	var Backbone = require('backbone');

	var User = Backbone.Model.extend({
	
		defaults: {
		    userName: 'John',
		    password: '',
		    foodAwards: {},
		    record: {},
		    previousResult: {},
		    dailySelection: {},
		    id: 'John'
		    // url: this.userName
		}, 

		initialize: function() {

		},

		validate: function() {

		},

		urlRoot: 'Users/'



	});

	return User;
});

