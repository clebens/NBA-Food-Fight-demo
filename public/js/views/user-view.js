
define(function (require) {
  var Backbone = require('backbone');
  
  var UserView = Backbone.View.extend({
   name: 'UserView',

   events: {
    // 'click #signup-button': 'signUp', 
   },

    initialize: function (options) {
      
      // Template initialization Workaround
      if (options.template) {
      	this.template = options.template;
      }

      this.render();
    },

    render: function() { 
    	this.$el.html(this.template(this.model.toJSON())); 
    },

    signUp: function () {
      alert("signed up!");

    }
    

  });

  return UserView;

})


// var app = app || {};

// app.UserView = Backbone.View.extend({

//   events: {
//     'click #user-button': 'buttonPush',
//     'click #password-logout': 'logout', 
    
//   },

//   initialize: function() {
//     this.$el = $('#user-container')
//     console.log("User View has been initialized.");
//   },

//   render: function() {
//     this.$el.html("<h1>Users are here</h1>");
//     console.log("rendering...")
//   },

//   buttonPush: function() {
//     //from home page --> goes to game selection page/view
//     //from game selection  page --> goes to food view
//     //from food view --> goes to game selection view
//   },

//   logout: function() {
//     //goes to --> home page
//   }


// });

// module.exports = UserView


