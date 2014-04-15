define(function (require) {
  var Backbone = require('backbone');
  var template = require('hbs!templates/user/user-signup');

  var UserSignUp = Backbone.View.extend({
    el: '#'

  initialize: function() {
    this.render;
  },

  render: function() {
    this.$el.html("<h1>Users are here</h1>");
    console.log("rendering...")
  },

  buttonPush: function() {
    //from home page --> goes to game selection page/view
    //from game selection  page --> goes to food view
    //from food view --> goes to game selection view
  },

  logout: function() {
    //goes to --> home page
  }


});
