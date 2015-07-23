'use strict';

var config = require('./gulp.config');

module.exports = {
    context: config.app.scriptsDir.slice(0, -1),
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
        extensions: ['', '.ts', '.js', '.webpack.js', '.web.js']
    }
};