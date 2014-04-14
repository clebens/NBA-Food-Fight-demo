var app = app || {};

app.User = Backbone.Model.extend({
  defaults: {
    userName: '',
    foodAwards: '',
    record: {},
    previousResult: {},
    dailySelection: {}
  },
});

module.exports = app.User;