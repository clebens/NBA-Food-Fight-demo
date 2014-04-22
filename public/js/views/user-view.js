
define(function (require) {
  var Backbone = require('backbone');
  var $ = require('jquery');
  require('jquery-cookie');

  var UserView = Backbone.View.extend({
   name: 'UserView',

   events: {
    'click #signup-button': 'signUp',
    'click #signin-button': 'signIn',
    'click #user-signout': 'signOut'
   },

    initialize: function (options) {
      
      // Template initialization Workaround
      if (options.template) {
      	this.template = options.template;
      }

      this.model.on('change', this.render, this);
      this.render();
    },

    render: function() { 
    	this.$el.html(this.template(this.model.toJSON())); 
    },

    signUp: function () {
      // this.$el.html(this.template(this.model.toJSON()));
      var userName = this.$el.find('#user-name-signup').val();
      var password = this.$el.find('#password-signup').val();
      this.model.set("id", userName);
      this.model.set("userName", userName)
      this.model.set("password", password);
      // console.log(this.model.id);
      this.model.save();
      $.cookie('user-name', userName, { expires: 7, path: '/' });
      // var userName = $("#user-name")[0];
      console.log('Created user: ' + userName);
      // this.model.userName = $("#user-name").attr('value');

      alert("Thanks for signing up, " + userName + "!\nYour password is: " + password);
      window.location.href = "#user-view"; 
    },

    signOut: function() {
      $.removeCookie('user-name');
      window.location.href = '/';
    },

    signIn: function() {
      $('#failed-login').html('');
      var userName = this.$el.find('#user-name-login').val();
      var password = this.$el.find('#password-login').val();
      this.model.set('id', userName);
      
      var self = this;

      this.model.fetch({
        success: function(model, response, options) {
          if(password === model.get('password')) {
            console.log('User logged in!');
            $.cookie('user-name', userName, { expires: 7, path: '/' });


            window.location.href = '#user-view';


          } else {
             //self.$el.find('#failed-login').innerHtml('<br><p class="red">Invalid username or password.</p>');
             self.$el.find('#user-name-login').addClass('has-error');
             self.$el.find('#user-name-login').append(' <span class="glyphicon glyphicon-remove form-control-feedback"></span>')
              console.log('Incorrect Password');
          }
        }, 

        error: function(model, response, options) {
          console.log(response);
          if(response.responseText === "No user found.") {
            $('#failed-login').html('<p class="red">Invalid username or password.');
          }
        },


      });
      
   },
    

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


