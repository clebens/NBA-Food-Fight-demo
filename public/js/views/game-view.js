define(function(require) {

	var Backbone = require('backbone');
	var template = require('hbs!templates/game-in-schedule');

	var GameView = Backbone.View.extend({

			tagName: 'div',
			className: 'gameContainer',
			template: template,

		initialize: function() {
			this.setReadableDate();
		},

		setReadableDate: function() {
			var unreadableDate = new Date(this.model.get('eventTime'));
			this.model.set('readableDate', unreadableDate.toLocaleDateString());
			this.model.set('readableTime', unreadableDate.toLocaleTimeString());

		},

		render: function () {
			this.$el.html( this.template(this.model.toJSON()));
			return this;
		},

		events: {
		}

	});

	return GameView;
});