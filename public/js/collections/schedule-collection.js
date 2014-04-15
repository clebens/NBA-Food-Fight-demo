define(function(require) {

	var Backbone = require('backbone');
	var Game = require('models/event-model');
 

	var Schedule = Backbone.Collection.extend({

		model: Game,

		initialize: function() {

		}, 

		url: '/Schedule'

	});

	return Schedule;
});