

define(function(require) {

	var Backbone = require('backbone');

	var TeamView = Backbone.View.extend({

		el: '#main',
		events: {},

		initialize: function () {

			this.listenTo(this, "change", this.render);
			console.log('This view has been initialized');
			this.render();
	    },


		render: function () {
//			var teamsArray = this.collection.models[0].attributes.value;
			var teamsCollect = this.collection.models;
			var teamsArray = _.map(teamsCollect, function(value, key) {
				return value.attributes.value});

			this.$el
			.html('<li>' + teamsArray[3].teamName + '</li>' + '<img src="' + teamsArray[3].teamLogo + '"</img>');

}

	
	});


	return TeamView;


});
