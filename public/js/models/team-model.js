define(function(require) {
	var Backbone = require('backbone');

	var Team = Backbone.Model.extend({
		defaults: {
			'teamName': '',
			'teamLogo': '',
			'foodRules': [{
				'foodId': 'chalupa',
				'foodRule': '100pts',
				'ruleDescription': 'Completely Random; 50% chance'
			}]
		},

		initialize: function() {
			console.log('This model has been initialized');
			this.on('change', function() {
				console.log('- Values for this model have changed.');
			});
		}

	});


	return Team;
});

