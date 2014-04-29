define(function(require) {

	var Backbone = require('backbone');
	var Game = require('models/game-model');
 

	var Schedule = Backbone.Collection.extend({

		model: Game,

		comparator: 'eventTime',

		initialize: function() {

		}, 

		url: '/Events/Date/20140428'

	});

	return Schedule;
});