module.exports = function(config) {
    console.log("----------------------");
    console.log("Running tests for time");
    console.log("----------------------");

    config.set({
        plugins: [
            'karma-chrome-launcher',
            'karma-junit-reporter',
            'karma-mocha',
            'karma-phantomjs-launcher'
        ],

        // base path, that will be used to resolve files and exclude
        basePath: './',

        frameworks: ['mocha'],

        files: [
            "public/javascripts/jquery.js",
            "public/javascripts/faye-browser-min.js",
            "public/javascripts/application.js",
            "test/**.js",

            {pattern: "public/stylesheets/**", watched: false, included: false, served: true},
            {pattern: "public/images/**", watched: false, included: false, served: true}
        ],

        exclude: [],

        reporters: ['progress', 'junit'],

        port: 9876,
        runnerPort: 9100,

        colors: true,

        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        captureTimeout: 60000,
        singleRun: false
    });
};
