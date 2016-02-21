//karma.conf.js

// This is the file that karma will parse when the service is started
module.exports = function(config) {
  config.set({
    autoWatch: false,
	browserNoActivityTimeout: 120000,
	browserify:{
	  transform:[ 
	    ['babelify', {'presets': ['react', 'es2015']}]
	  ]
	},
	browsers: ['PhantomJS'],
	captureTimeout: 30000,
	files: [
	  { 
	    pattern: './www/js/bundle.js', 
		watched: false, 
		included: true, 
		served: true 
	  },
	  { 
	    pattern: './test/**/*.js', 
	    watched: false, 
		included: true, 
		served: true
	  }
	],
	frameworks: ['browserify', 'mocha'],
	port: 8001,
	preprocessors:{
	  './test/**/*.js': ['browserify']
	},
	// TODO: add the coverage reporter in
	//reporters:
	retryLimit: 1,
	singleRun: true
  });
};