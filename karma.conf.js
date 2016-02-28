//karma.conf.js

// This is the file that karma will parse when the service is started
module.exports = function(config) {
  config.set({
    autoWatch: false,
	browserNoActivityTimeout: 120000,
	browserify:{
	  transform:[ 
	    'babelify'
	  ]
	},
	browsers: ['PhantomJS'],
	captureTimeout: 30000,
	files: [
	  { 
	    pattern: './www/js/**/*.js', 
		watched: false
	  },
	  { 
	    pattern: './test/**/*.js', 
	    watched: false
	  }
	],
	frameworks: ['browserify', 'mocha', 'es6-shim'],
	port: 8001,
	preprocessors:{
	  './test/**/*.js': ['browserify'],
	  './www/js/**/*.js': ['browserify']
	},
	// TODO: add the coverage reporter in
	//reporters:
	retryLimit: 1,
	singleRun: true
  });
};