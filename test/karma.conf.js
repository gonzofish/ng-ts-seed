/// <reference path="../typings/tsd.d.ts" />
'use strict';

var _ = require('lodash');
var gulpConfig = require('../gulp.config');
var webpackConfig = require('../webpack.config');

module.exports = function karmaConfig(config) {
    var karmaWebpack = _.merge({}, webpackConfig);
    var preprocessors = {};

    // add the istanbul loader to the webpack config
    _.merge(karmaWebpack.module, gulpConfig.test.istanbulLoader);

    // setup preprocessors on
    // app files
    preprocessors[gulpConfig.app.tsFiles] = ['webpack', 'sourcemap'];
    // component HTML files
    preprocessors[gulpConfig.app.componentHtml] = ['ng-html2js'];

    config.set({
        autoWatch: false,
        basePath: gulpConfig.dir,
        browsers: ['PhantomJS'],
        coverageReporter: {
            type: 'html',
            dir: gulpConfig.test.coverageDir,
            subdir: function modifyCoverageSubDir(browserName) {
                // makes sure we get a nice folder name like "phantomjs"
                // and not "PhantomJS (Windows 7 x86)"
                return browserName.toLowerCase().split(' ')[0];
            }
        },
        files: gulpConfig.library.app
                    .concat(gulpConfig.library.karma)
                    // thanks to the beauty of webpack & imports
                    // we don't need to specify every app file
                    // just the entry point
                    .concat(gulpConfig.app.entry)
                    .concat(gulpConfig.app.components.html)
                    .concat(gulpConfig.test.specs),
        frameworks: ['jasmine'],
        // using config.LOG_DEBUG will give you more information
        logLevel: config.LOG_INFO,
        // this converts our component HTML files -> JavaScript
        // this way there aren't any GET HTTP calls when testing
        // components
        ngHtml2JsPreprocessor: {
            moduleName: 'app.templates',
            stripPrefix: 'app/'
        },
        plugins: [
            'karma-coverage',
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-ng-html2js-preprocessor',
            'karma-phantomjs-launcher',
            'karma-sourcemap-loader',
            'karma-webpack'
        ],
        preprocessors: preprocessors,
        reporters: [
            'progress',
            'coverage'
        ],
        singleRun: true,
        webpack: karmaWebpack,
        webpackMiddleware: {
            // this prevents webpack output from overrunning
            // the console
            noInfo: true
        }
    });
};