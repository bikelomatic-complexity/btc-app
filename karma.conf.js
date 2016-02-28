/*global module*/
module.exports = function( config ) {
  config.set( {
    frameworks: [ 'browserify', 'mocha', 'es6-shim' ],
    port: 8001,
    browserify: {
      transform: [
        'babelify'
      ]
    },
    files: [
      'test/**/*.js'
    ],
    preprocessors: {
      'test/**/*.js': [ 'browserify' ]
    },
    browsers: [ 'PhantomJS' ],
    retryLimit: 1,
    singleRun: true
  } );
};
