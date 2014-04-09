requirejs.config({
	urlRoot: '/js',

	paths: {
		'jquery': 'lib/jquery',
		'backbone': 'lib/backbone',
		'underscore': 'lib/underscore',
		'hbs' : 'require-handlebars-plugin/hbs',
		'templates': '../templates'
	}
});

require(['app']);
