define(function(require) {

	var Backbone = require('backbone');
	var Game = require('models/game-model');
 

	var Schedule = Backbone.Collection.extend({

		model: Game,

		comparator: 'eventTime',

		initialize: function() {
			this.url = '/Events/Date/' + this.getDate();
		}, 

		getDate: function() {
			var date = new Date();
			var year = date.getFullYear().toString();
			var month = (date.getMonth() + 1).toString();
			if(parseInt(month, 10) < 10) {
				month = '0' + month;
			}
	
			var day = date.getDate().toString();
			
			if(parseInt(day, 10) < 10) {
				day = '0' + day;
			}
			return year + month + day;
		}

	});

	return Schedule;
});