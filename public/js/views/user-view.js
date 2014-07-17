
define(function (require) {
  var Backbone = require('backbone');
  var $ = require('jquery');
  require('jquery-cookie');

  var UserView = Backbone.View.extend({
   name: 'UserView',

   events: {
    'click #signup-button': 'signUp',
    'click #signin-button': 'signIn',
    'keypress :input': 'loginKeypressHandler',
    'keypress :input': 'loginKeypressHandler',
    'click #user-signout': 'signOut',
    'click #food': 'removeGreeting',
    'click #home': 'addHello',
    'click #create-account-button': 'removeTransparency',
    'click #cancel-button': 'makeTransparent'

   },

    loginKeypressHandler: function(key) {
      if (key.charCode  === 13) {
        this.signIn();
      }
    }, 

    initialize: function (options) {
      
      // Template initialization Workaround
      if (options.template) {
      	this.template = options.template;
        this.menuTemplate = options.menuTemplate;
        this.menu = options.menu;
        this.menuTag = options.menuTag;
      }

      // if (this.menu === true) {
      //   this.showMenu();
      //   $('#user-menu').show();
      // }

      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'manualRerender', this.render);
      
      this.render();
    },

    addHello: function() {
      $('#user-name').show();
    },

    loginTest: function() {
    },

    removeGreeting: function() {
      $('#failed-login').hide();
    },

    render: function() { 
      this.$el.html(this.template(this.model.toJSON())); 
      if (this.model.get('userName')) {

         this.showLastResult(); 
         this.dailyPick();
     

      }

    },

    removeTransparency: function () {
      $('.container').removeClass('transparent');
    },

    makeTransparent: function () {
      $('.container').addClass('transparent');
    },

    signUp: function () {
      // this.$el.html(this.template(this.model.toJSON()));
      $('.container').addClass('transparent');
      var UserModel = require('models/user-model');
      var userName = this.$el.find('#user-name-signup').val();
      var password = this.$el.find('#password-signup').val();
      var checkUser = new UserModel({'id': userName});
      var self = this;
      checkUser.fetch({

        success: function(model, response, options) {
          $('user-name-signup').val('');
          $('password-signup').val('');
          $('.modal-backdrop').remove();
          window.location.href = "#user-signin";

          $('#failed-login').html('<p class="text-danger">Sorry, user \'' + userName + '\' already exists');
          $('#failed-login').show();
          $('#user-name').hide();

        },

        error: function(model, response, options) {
          if (response.responseText === "No user found.") {
            self.model.set("id", userName);
            self.model.set("userName", userName)
            self.model.set("password", password);
            self.model.save();
            self.render();
            $.cookie('user-name', userName, { expires: 7, path: '/' });
            $('.modal-backdrop').remove();
            $('#failed-login').html('<p class="text-success">Thanks for signing up, ' + userName + '!');
            $('#failed-login').show();
            window.location.href = "#user-view";
            $('#user-name').hide();
          }
        }
      });

      $('body').removeClass("modal-open");

    },

    signOut: function() {
      this.$el.hide();
      $.removeCookie('user-name');
      this.model.clear();
      $('#most-recent-result').html('');
      this.removeGreeting();

      window.location.href = '#user-signin';
    },

    signIn: function() {
      this.$el.hide();
      $('#failed-login').html('');
      $('#user-loading').html('<br /><img src="/images/login-loader.gif" />');
      var userName = this.$el.find('#user-name-login').val();
      var password = this.$el.find('#password-login').val();

      this.model.set('id', userName);      
      
      var self = this;

      this.model.fetch({
        success: function(model, response, options) {
          $('#user-loading').html('');
          if(password === model.get('password')) {
            self.model.trigger('manualRerender');
            $.cookie('user-name', userName, { expires: 7, path: '/' });
            window.location.href = '#user-view';


          } else {
            failedLogin();
          }
        }, 

        error: function(model, response, options) {
          $('#user-loading').html('');
          failedLogin();
        },

      });

      function failedLogin() {
            console.log('here');
            self.$el.show();
            $('#failed-login').html('<p class="text-danger">Invalid username or password.</p>');
            $('#failed-login').show();
      }
      
     },

     showLastResult: function() {

      var previousResult = $.extend(true, {}, this.model.get('previousResult'));

        if (typeof previousResult === 'object' && previousResult != null) {
          if(Object.keys(previousResult).length) {
              previousResult.title = "Previous Result";

              if (previousResult.homeTeam.foodRules[0].foodWon === true) {
                previousResult.result = "WINNER";
              } else {
                previousResult.result = "LOSER";
              }

              var recentTemplate = require('hbs!templates/recent-game');
              console.log(previousResult);
            $('#most-recent-result').html(recentTemplate(previousResult));

          } else {

            noRecentResults();
          

          }
        } else {
          noRecentResults();
        }


        function noRecentResults() {
          $('#most-recent-result').html('   <div class="panel game-panel panel-default"><h3 style="text-align:center;">You have no previous picks.</h3></div>');
        }
              
     },

     dailyPick: function() {
      var dailySelection = $.extend(true, {}, this.model.get('dailySelection'));
      
      var dailyPickTemplate = require('hbs!templates/recent-game');

    
        if (typeof dailySelection === 'object' && dailySelection != null) {

          if (Object.keys(dailySelection).length) {
             dailySelection.title = "Current Selection";
             // $('#today-picks').html('<div class="col-xs-6"><h5>Your pick today is: ' + dailySelection.homeTeam.teamName  + '. Good luck!</h5></div>');
             $('#today-picks').html(dailyPickTemplate(dailySelection));
             dailySelection.title
           } else {
            noDailySelection();
           } 
         } else {
          noDailySelection();
        }
        function noDailySelection() {
          $('#today-picks').html('    <div class="panel game-panel panel-default"><h3 style="text-align:center;">You have not made a pick today.</h3></div>');
        }
      }
     //            if (typeof currentSelection == null) {
     //              $('#today-picks').html('<div class="col-xs-6"><h5>You have not made a pick today. Select below.</h5></div>');
     //            } else {
     //              $('#today-picks').html('<div class="col-xs-6"><h5>Your pick today is: ' + currentSelection  + '. Good luck!</h5></div>');
     //            }
     //        console.log("currentSElection function has been run.");
     // }



  });
    



  return UserView;

})
