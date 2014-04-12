define(function(require) {

	var Backbone = require('backbone');

	var Team = Backbone.View.extend({

		el: '#main',

		render: function() {
			this.$el.html('<h1>Team!</h1>');
		}

	});

	return Team;
});