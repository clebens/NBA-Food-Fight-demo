var UserModel = Backbone.Model.extend({

  defaults: {
    userName: '',
    foodAwards: '',
    record: {},
    previousResult: {},
    dailySelection: {}
  }

});

module.exports = UserModel;