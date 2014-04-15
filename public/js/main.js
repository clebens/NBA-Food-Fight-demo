requirejs.config({
	urlRoot: '/js',

	paths: {
		'jquery': 'lib/jquery',
		'backbone': 'lib/backbone',
		'underscore': 'lib/underscore',
		'hbs' : 'lib/require-handlebars-plugin/hbs',
		'templates': 'templates'
	}
});

require(['app']);
