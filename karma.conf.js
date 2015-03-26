// Karma configuration
// Generated on Mon Mar 16 2015 18:44:59 GMT+0100 (Central European Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
      'src-test/test-main.js',
      {pattern: 'src/*.js', included: false},
      {pattern: 'src/util/*.js', included: false},
      {pattern: 'src-test/*.js', included: false},
      {pattern: 'src-test/lib/*.js', included: false},
      {pattern: 'src/lib/*.js', included: false},
      {pattern: 'src/view-templates/*.*', included: false},
      {pattern: 'src/request-templates/*.*', included: false},
      {pattern: 'src-test/fixtures/*', included: false},
      {pattern: 'node_modules/validator/validator.js', included: false}
    ],


    // list of files to exclude
    exclude: [
      'src/SabreDevStudioSDK.js',
      'src/lib/commWrapperSrc.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'PhantomJS', 'IE', 'Firefox', 'Safari'], // 'IE8', 'IE9',

    customLaunchers: {
      IE9: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE9'
      },
      IE8: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE8'
      }
    },


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};