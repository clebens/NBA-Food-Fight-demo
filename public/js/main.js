requirejs.config({
	urlRoot: '/js',

  paths: {
    'jquery': 'lib/jquery',
    'jquery-cookie': 'lib/bower_components/jquery-cookie/jquery.cookie',
    'backbone': 'lib/backbone',
    'bootstrap': 'lib/bootstrap',
    'thorax': 'lib/thorax',
    'underscore': 'lib/underscore',
    'hbs' : 'lib/require-handlebars-plugin/hbs',
    'templates': '../templates'
  },

  shim: {
    'jquery-cookie': {
      deps: ['jquery']
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    'thorax': {
      deps: [
        'underscore',
        'backbone',
        'jquery',
        'hbs'
      ],
      exports: 'Thorax'
    },
      'bootstrap': {
      deps: ['jquery']
    }

  },

  hbs: { // optional
      helpers: true,            // default: true
      i18n: false,              // default: false
      templateExtension: 'hbs', // default: 'hbs'
      partialsUrl: ''           // default: ''
  }

});

require(['bootstrap', 'app']);
