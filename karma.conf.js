//karma.conf.js

// This is the file that karma will parse when the service is started
module.exports = function(config) {
  config.set({
    autoWatch: false,
	babelPreprocessor: {
	  options: {
		presets: ['es2015', 'react'],
        sourceMap: 'inline'		
	  },
	  filename: function (file){
		return file.originalPath.replace(/\.js$/, '.es5.js');  
	  },
	  sourceFileName: function (file) {
	    return file.originalPath;
	  }
	},
	browserNoActivityTimeout: 120000,
	browsers: ['PhantomJS'],
	captureTimeout: 30000,
	files: [
	  { pattern: './www/js/**/*.js', watched: false, included: true, served: true },
	  { pattern: './test/**/*.js', watched: false, included: true, served: true },
	  { pattern: './node_modules/babel-polyfill/dist/polyfill.js', watched: false, included: true, served: true }
	],
	frameworks: ['mocha'],
	port: 8001,
	preprocessors: {
	  './www/js/**/*.js' : ['babel'],
	  './test/**/*.js' : ['babel']
    },
	// TODO: add the coverage reporter in
	//reporters:
	retryLimit: 1,
	singleRun: true
  });
};