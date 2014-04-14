define(function (require) {

  var Backbone = require('backbone');
  var Team = require('models/team-model');

  var Teams = Backbone.Collection.extend({
    model: Team

  });


  return Teams;

});


