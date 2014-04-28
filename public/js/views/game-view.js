define(function(require) {

	var Backbone = require('backbone');
	var template = require('hbs!templates/game-in-schedule');
	var User = require('models/user-model');
	var GameModel = require('models/game-model');

	var GameView = Backbone.View.extend({

			tagName: 'div',
			className: 'gameContainer',
			template: template,
		events: {
			"click .game-panel": "selectGame",
			"click #switch-games": "switchGames"
		},

		initialize: function() {
			this.setReadableDate();

			this.listenTo(this.model, 'manualRerender', this.render);
		},


		setReadableDate: function() {
			var unreadableDate = new Date(this.model.get('eventTime'));
		
			this.model.set('readableDate', unreadableDate.toLocaleDateString());
			this.model.set('readableTime', unreadableDate.toLocaleTimeString());


		},

		switchGames: function() {

			var curUser = new User({
				id: $.cookie('user-name')
			});

			var self = this;

			curUser.fetch({
				success: function(model, response, options) {

	
				model.set('switchGame', true);
				model.save();
				// console.log(curUser);
				self.gameBorder();
				}
			});
		},

		gameBorder: function() {

			$('.active').removeClass('active');
			$(this.el).find('.panel').addClass('active');

			var gameModel = new GameModel({'id': this.model.get('dailySelection')});
			// console.log(gameModel);

			gameModel.fetch({
				success: function() {
					var gameSelect = gameModel.get('homeTeamId');
					// console.log(gameSelect);
					$('#most-recent-result').replaceWith(gameSelect);
				}
			});

			$(this.el).find('.panel').addClass("active");

			var curUser = new User({
				id: $.cookie('user-name')
			});

			curUser.fetch({
				success: function(model, response, options) {

						console.log(curUser);
					if (curUser.attributes.switchGame === false) {
						$('.modal-title').removeClass('red').addClass('green');
						this.showModal('Game Selected', 'You have chosen the ' + this.model.attributes.homeTeam.teamName + ' vs. the ' + this.model.attributes.awayTeam.teamName
						+ '<p> ' + this.model.attributes.homeTeam.foodRules[0].ruleDescription + '</p>' );
						this.model.set('switchGame', false);
						console.log(this.model);
						model.set('dailySelection', curEventId);
						model.save();
					}
				}
			});
		},

		currentGameDisplay: function() {
			var userGameSelect = new User();


			userGameSelect.fetch({
				success: function (model, response, options) {
					var todayPick = model.get('dailySelection').homeTeam.teamName;
					$('#today-picks').html('<div class="col-xs-6"><h5>Your pick today is: ' + todayPick  + '. Good luck!</h5></div>');

				}
			});

			var gameModel = new GameModel({'id': this.model.get('dailySelection')});
			var gameSelect = (this.model.attributes.homeTeam.teamName);
			
			gameModel.fetch({
				success: function() {
					$('#today-picks').html('<div class="col-xs-6"><h5>Your pick today is: ' + gameSelect + '. Good luck!</h5></div>');
					console.log("Game Display was succesful.");
				}
			});
		},


		render: function () {
			$(this.el).data('event_id', this.model.get('id'));
			this.$el.html( this.template(this.model.toJSON()));
			return this;
		},

		showModal: function (header, description) {
			$('#alert-modal').find('.modal-body').empty();
			$('#alert-modal').find('.alert-title').empty();
			$('#alert-modal').find('.modal-body').html('<p>'+description+'</p>');
			$('#alert-modal').find('.alert-title').html('<p>'+header+'</p>');
			$('#alert-modal').modal('show');
		},

		showSwitchModal: function (header, description, curUser) {
			$('#pick-new-game').find('.switch-game-body').empty();
			$('#pick-new-game').find('.switch-game-title').empty();
			$('#pick-new-game').find('.switch-game-body').html('<p>'+description+'</p>');
			$('#pick-new-game').find('.switch-game-title').html('<p>'+header+'</p>');
			$('#pick-new-game').modal('show');
		},

		// verifySelection: function (curUser) {
		// 	if (curUser.attributes.dailySelection !== {} ) {
		// 		console.log ("You already got a game, dude")
		// 	} else if (curUser.attributes.dailySelection !== {} ) {
		// 		console.log("no games selected");
		// 	}
		// },

		selectGame: function() {
			// $.cookie('user-name', 'doggy');

			if (!($.cookie('user-name'))) {
				// showModal.call(this, 'Blah Title', 'Blah Description');
				$('.modal-title').removeClass('green').addClass('red');
				this.showModal('Not Signed In', 'Sign up or sign in to select a game.');				
				return;
			}
		

			var curUser = new User({
				id: $.cookie('user-name')
			});

			var self = this;

			curUser.fetch({
				success: function(model, response, options) {

					var curEventId = self.model.toJSON();
					var unreadableGametime = Date.parse(self.model.get('eventTime'));
					console.log(curUser.attributes.dailySelection.id);
					if (curUser.attributes.dailySelection.id === self.model.id) {
						$('.modal-title').removeClass('red').addClass('green');
						self.showModal('This Game Already Selected', 'You have already chosen this game.');				
						return;
					}			
					else if (Date.now() >= unreadableGametime) {
						// 	$('#pick-new-game').modal('toggle');
						//	$('.modal-backdrop').remove();
						$('.modal-title').removeClass('green').addClass('red');
						self.showModal('Invalid Game', 'This game has already started. Please pick another game.');				
						return;
					
					} else if (curUser.attributes.dailySelection.id !== undefined ) {

						// console.log(curUser);
						console.log(curUser.attributes.dailySelection);
						// console.log(self.model.id);
						$('.modal-title').removeClass('green').addClass('red');
						self.showSwitchModal('Other Game Already Selected', 'You have already chosen the ' + curUser.attributes.dailySelection.homeTeam.teamName + ' vs. the ' + curUser.attributes.dailySelection.awayTeam.teamName
													 + '<p>Would you like to switch games or cancel and keep the previously selected game?', curUser);				
						return;
						// console.log(curUser);
						
					} else {
					
						self.gameBorder();
						model.set('dailySelection', curEventId);
						model.save();

					}

				}
			});

		}

	});

	return GameView;
});




// 	$(".gameContainer").addClass("active");
// 			}, function () {
// 				$(".gameContainer").removeClass("active");
// 			});
// });
