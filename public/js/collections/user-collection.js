define(function(require) {

  var Backbone = require('backbone');
  var User = require('models/user-model');
 

  var Users = Backbone.Collection.extend({

    model: User,

    initialize: function() {

    }, 

    url: '/User'

  });

  return Users;
});