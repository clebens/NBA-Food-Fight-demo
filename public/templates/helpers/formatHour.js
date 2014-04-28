define(function (require) {
  var Handlebars = require('hbs/handlebars');


  function formatHour( context, options ) {
    var newTime = context.slice(0,-6) + context.slice(-3);
    return newTime;

  }

Handlebars.registerHelper( 'formatHour', formatHour);

  return formatHour;


});