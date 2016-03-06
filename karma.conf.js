/*global module*/
module.exports = function( config ) {
  config.set( {
    frameworks: [ 'browserify', 'jquery-2.1.0', 'mocha', 'es6-shim' ],
    port: 8001,
    browserify: {
      transform: [
        'babelify'
      ]
    },
    files: [
      'test/**/*.js',
      'www/css/**/*.css'
    ],
    preprocessors: {
      'test/**/*.js': [ 'browserify' ]
    },
    browsers: [ 'PhantomJS' ],
    reporters: ['mocha'],
    retryLimit: 1,
    singleRun: true
  } );
};
