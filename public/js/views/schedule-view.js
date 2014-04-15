define(function(require) {

	var Backbone = require('backbone');
	var Schedule = require('collections/schedule-collection');
	var GameView = require('views/game-view')
	var $ = require('jquery');
	var Schedule = Backbone.View.extend({

		el: '#main',		


		initialize: function (initialSchedule) {
		console.log(initialSchedule);
		this.collection = initialSchedule;
		this.listenTo (this.collection, 'add', this.render);
		},

		render: function() {
			
			this.collection.each(function(item) {
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