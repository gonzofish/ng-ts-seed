'use strict';

var _ = require('lodash');
var argv = require('yargs').argv;
var config = require('./gulp.config');
var gulp = require('gulp');
var karma = require('karma').server;
var tslint = require('gulp-tslint');

// default task
gulp.task('default', ['test']);

// test task
gulp.task('test', ['lint'], function testTask(callback) {
    var karmaConf = {
        configFile: config.test.karma.configFile
    };

    if (argv.watch) {
        _.merge(karmaConf, config.test.karma.watch);
    }

    karma.start(karmaConf, callback);
});

// linting for TypeScript
gulp.task('lint', function lintTask(callback) {
    gulp.src(config.app.tsFiles.concat(config.app.components.tsFiles))
        .pipe(tslint())
        .pipe(tslint.report('prose'))
        .on('end', callback);
});