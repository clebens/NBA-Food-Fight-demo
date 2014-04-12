var app = app || {};

app.UserView = Backbone.View.extend({

  events: {
    'click #user-button': 'buttonPush',
    'click #password-logout': 'logout', 
    
  },

  initialize: function() {
    this.$el = $('#user-container')
    console.log("User View has been initialized.");
  },

  render: function() {

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