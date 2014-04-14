var UserModel = Backbone.Model.extend({

  defaults: {
    userName: '',
    foodAwards: '',
    record: {},
    previousResult: {},
    dailySelection: {}
  },
    initialize: function() {
    console.log("A model has been initialized.");
  },

});

module.exports = UserModel;