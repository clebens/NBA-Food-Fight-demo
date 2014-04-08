var app = app || {};

app.User = Backbone.Model.extend({
	defaults: {
		eventId: '',
		homeTeamId: '',
		awayTeamId: '',
		eventStatus: '',
		statsObject: {}
	}
});