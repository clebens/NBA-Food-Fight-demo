var app = app || {};

app.Game = Backbone.Model.extend({
	defaults: {
		eventId: '',
		homeTeamId: '',
		awayTeamId: '',
		eventStatus: '',
		statsObject: {}
	}
});