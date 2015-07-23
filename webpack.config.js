'use strict';

var config = require('./gulp.config');
var webpackScriptsDir = config.app.scriptsDir.slice(0, -1);

module.exports = {
    context: webpackScriptsDir,
    devtool: 'inline-source-map',
    entry: {
        index: './app.ts'
    },
    module: {
        loaders: [
            {
                loader: 'ts-loader',
                test: /\.ts$/
            }
        ]
    },
    output: {
        filename: config.transpile.filename,
        libraryTarget: 'var',
        path: config.transpile.dir
    },
    resolve: {
        extensions: ['', '.ts', '.js', '.webpack.js', '.web.js'],
        fallback: webpackScriptsDir
    }
};