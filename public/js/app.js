define(function(require) {
	var Backbone = require('backbone');
	var $ = require('jquery');
	var Router = require('router');
	var TeamView = require('views/team-view');
	var TeamModel = require('models/team-model');
	var Teams = require('collections/teams');


	$.getJSON()
	.done(main)
	.fail(function () {
		$('#loading-message').text('Your data failed to load.')
	});
		
	$(function(){
		var app = {};
		window.app = app;

		
		var teamModel = new TeamModel();

		 $.get('api/teams', function(data){
		 	
		 	}).done(function (data) {
		 		var teamCollection = new Teams(data);
		 		var teamView = new TeamView({
		 			collection: teamCollection
		 			})
		 	});
		});





	var router = new Router({
	});
	Backbone.history.start();



	});




