requirejs.config({
	urlRoot: '/js',

  shim: {
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
	paths: {
		'jquery': 'lib/jquery',
		'backbone': 'lib/backbone',
    'bootstrap': 'lib/bootstrap',
    'thorax': 'lib/thorax',
		'underscore': 'lib/underscore',
    'hbs' : 'lib/require-handlebars-plugin/hbs',
    // 'handlebars': 'lib/require-handlebars-plugin/hbs/handlebars',
		'templates': '../templates'
	},

  hbs: { // optional
      helpers: true,            // default: true
      i18n: false,              // default: false
      templateExtension: 'hbs', // default: 'hbs'
      partialsUrl: ''           // default: ''
  }
});

require(['bootstrap', 'app']);
