define(function(require) {

	var Backbone = require('backbone');
	var Schedule = require('collections/schedule-collection');
	var GameView = require('views/game-view');
	var User = require('models/user-model');

	var $ = require('jquery');
	
	var Schedule = Backbone.View.extend({

		el: '#todays-schedule',		

		events: {
//    		'click #game-display': 'selectGame', 
   		},

		initialize: function(initialSchedule) {
			//console.log(initialSchedule);
			this.collection = initialSchedule;
			this.listenTo (this.collection, 'add', this.render);
		},

		render: function() {
			this.$el.html('');
			this.collection
			.each(function(item) {
				this.renderGame(item);
			}, this);

		},

		renderGame: function(item) {
			var gameView = new GameView({
				model: item
			});
			this.$el.append(gameView.render().el);
		}

	});

	return Schedule;
});