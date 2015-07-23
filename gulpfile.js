'use strict';

var _ = require('lodash');
var argv = require('yargs').argv;
var concat = require('gulp-concat');
var config = require('./gulp.config');
var connect = require('gulp-connect');
var del = require('del');
var fs = require('fs');
var gulp = require('gulp');
var karma = require('karma').server;
var ngHtml2Js = require('gulp-ng-html2js');
var open = require('gulp-open');
var tslint = require('gulp-tslint');
var webpack = require('webpack-stream');

// default task, tests & builds distribution version of app
gulp.task('default', ['test']);

// serve task, builds a dev version of the app & opens it in a browser
gulp.task('serve', ['connect', 'open', 'watch']);

// open a browser
gulp.task('open', ['connect'], function openTask() {
    var options = {
        uri: 'http://localhost:8080/'
    };

    gulp.src(config.dev.dir + 'index.html')
        .pipe(open(options));
});

// watch the files and remount as necessary
gulp.task('watch', ['connect'], function watchTask() {
    var filesToWatch = [config.app.dir + 'index.html']
                        .concat(config.app.tsFiles)
                        .concat(config.app.components.html)
                        .concat(config.app.components.tsFiles)
                        .concat(config.styles.files);

    gulp.watch(filesToWatch, ['mount-files']);
})

// test task
gulp.task('test', ['lint'], function testTask(callback) {
    var karmaConf = {
        configFile: config.test.karma.configFile
    };

    if (argv.watch) {
        _.merge(karmaConf, config.test.karma.watch);
        karmaConf.reporters = [];
    }

    karma.start(karmaConf, callback);
});

// create a connection
gulp.task('connect', ['mount-files'], function connectTask() {
    connect.server({
        livereload: true,
        middleware: function loadMiddleware() {
            // if you ever want to redirect
            // requests or load other files
            // this is the place to do it
            //
            // For instance, if you are using a mock server,
            // you could load it as a middleware here
            var middlewares = [];

            return middlewares;
        },
        root: config.dev.dir
    });
});

gulp.task('mount-files', ['lint', 'mount-html', 'mount-styles', 'mount-scripts', 'mount-libraries'], function mountReloadTask() {
    // after everything is mounted, tell connect to reload
    gulp.src(config.dev.dir + 'index.html')
        .pipe(connect.reload());
});

// linting for TypeScript
gulp.task('lint', function lintTask(callback) {
    gulp.src(config.app.tsFiles.concat(config.app.components.tsFiles))
        .pipe(tslint())
        .pipe(tslint.report('prose'))
        .on('end', callback);
});

// mount non-component HTML files
gulp.task('mount-html', ['clean-dev', 'lint'], function mountHtmlTask(callback) {
    gulp.src(config.app.dir + 'index.html')
        .pipe(gulp.dest(config.dev.dir))
        .on('end', callback);
});

// mount CSS files
gulp.task('mount-styles', ['clean-dev', 'lint'], function mountStylesTask(callback) {
    gulp.src(config.styles.files)
        .pipe(gulp.dest(config.dev.styles))
        .on('end', callback);
});

// mount non-component scripts
// requires to generate the scripts
gulp.task('mount-scripts', ['clean-dev', 'generate-scripts'], function mountScriptsTask(callback) {
    gulp.src(config.app.tsFiles)
        .pipe(gulp.dest(config.dev.scripts))
        .on('end', callback);
});

// generate scripts
gulp.task('generate-scripts', ['webpack', 'html2js']);

gulp.task('webpack', ['clean-dev', 'clean-transpiled', 'lint'], function webpackTask(callback) {
    var webpackConfig = require('./webpack.config.js');

    gulp.src(config.app.entry)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(config.transpile.dir))
        .on('end', callback);
});

// clean the transpiled directory
gulp.task('clean-transpiled', function cleanTranspileDirTask(callback) {
    cleanIfDir(config.transpile.dir, callback);
});

// convert component HTML files to JavaScript
gulp.task('html2js', ['clean-dev', 'lint'], function html2JsTask(callback) {
    gulp.src(config.app.components.html)
        .pipe(ngHtml2Js({
            moduleName: 'app.templates',
            prefix: config.app.components.dir.replace(config.app.dir, '')
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(config.dev.scripts))
        .on('end', callback);
});

// mount library scripts
gulp.task('mount-libraries', ['clean-dev', 'lint'], function mountLibrariesTask(callback) {
    gulp.src(config.library.app)
        .pipe(gulp.dest(config.dev.library))
        .on('end', callback);
});

// clean the dev folder out
gulp.task('clean-dev', function cleanDevTask(callback) {
    cleanIfDir(config.dev.dir, callback);
});

function cleanIfDir (directory, callback) {
    try {
        if (fs.lstatSync(directory).isDirectory()) {
            del(directory + '*', callback);
        } else {
            callback();
        }
    } catch (e) {
        callback();
    }
}