define(function(require) {

	var Backbone = require('backbone');
	var template = require('hbs!templates/game-in-schedule');
	var User = require('models/user-model');

	var GameView = Backbone.View.extend({

			tagName: 'div',
			className: 'gameContainer',
			template: template,
		events: {
			"click": "selectGame"
		},

		initialize: function() {
			this.setReadableDate();
		},

		setReadableDate: function() {
			var unreadableDate = new Date(this.model.get('eventTime'));
			this.model.set('readableDate', unreadableDate.toLocaleDateString());
			this.model.set('readableTime', unreadableDate.toLocaleTimeString());

		},

		render: function () {
			$(this.el).data('event_id', this.model.get('id'));
			this.$el.html( this.template(this.model.toJSON()));
			return this;
		},

		selectGame: function() {
			// $.cookie('user-name', 'doggy');
			var curUser = new User({id: $.cookie('user-name') });
			curUser.fetch();
			curUser.set('dailySelection', this.model.get('id'));
			console.log(curUser.get('id') + " selected " + curUser.get('dailySelection'));
			curUser.save();
		}

	});

	return GameView;
});