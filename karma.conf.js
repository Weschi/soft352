// Karma configuration
// Generated on Wed Dec 27 2017 21:26:43 GMT+0000 (GMT Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'src/dependencies/jquery/dist/jquery.js',
        'src/dependencies/angular/angular.js',
        'src/app/*/**.js',
        'src/app/**.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'src/dependencies/angular-ui-router/release/angular-ui-router.js',
        'src/dependencies/localforage/dist/localforage.js',
        'src/dependencies/angular-localForage/dist/angular-localForage.js',
        'src/dependencies/moment/moment.js',
        'src/dependencies/lodash/lodash.js',
        'src/dependencies/angular-cookies/angular-cookies.js',
        'src/dependencies/Materialize/bin/materialize.js',
        'src/dependencies/angular-materialize/src/angular-materialize.js',
        'src/dependencies/materialize/bin/materialize.js',
        'src/assets/**.js',
        'src/assets/*/**.js',
        'src/assets/googleService/googleService.js',
        'src/assets/userService/userService.js',
        'karma-tests/**.js'
    ],


    // list of files / patterns to exclude
    exclude: [
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
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
