define(function(require) {

	var Backbone = require('backbone');

	var User = Backbone.Model.extend({
	
		defaults: {
		    userName: '',
		    password: '',
		    foodAwards: {},
		    record: {},
		    previousResult: {},
		    dailySelection: {},
		    // id: ''
		    // url: 'Users/'
		}, 

		urlRoot: 'Users/'



	});

	return User;
});

