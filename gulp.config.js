'use strict';

var path = require('path');

module.exports = (function gulpConfig() {
    var config = {
        dir: path.join(__dirname, '/')
    };

    function createCompiledDirDetails(compiledDir) {
        var details = config[compiledDir] = {
            dir: path.join(config.dir, compiledDir, '/')
        };
        details.components = path.join(details.dir, 'components/');
        details.library = path.join(details.dir, 'library/');
        details.scripts = path.join(details.dir, 'scripts/');
        details.styles = path.join(details.dir, 'styles/');
    }

    function generateLibraries(libraries, libraryDir) {
        // take the list of libraries & map them properly
        // ('angular/angular' -> 'node_modules/angular/angular.js')
        return libraries.map(function(library) {
            return path.join(config.library.dir, library + '.js');
        });
    }

    // for application development files
    config.app = {
        dir: path.join(config.dir, 'app/')
    };
    config.app.scriptsDir = path.join(config.app.dir, 'scripts/');
    config.app.components = {
        dir: path.join(config.app.scriptsDir, 'components/')
    };
    config.app.components.html = path.join(config.app.components.dir, '*/*.html');
    config.app.components.tsFiles = path.join(config.app.components.dir, '*/*.ts');
    config.app.entry = path.join(config.app.scriptsDir, 'app.ts');
    config.app.tsFiles = path.join(config.app.scriptsDir, '**/*.ts');

    // the dev directory stuff
    createCompiledDirDetails('dev');

    // the dist directory stuff
    createCompiledDirDetails('dist');

    // the lists of library (aka node_modules) files
    config.library = {
        dir: path.join(config.dir, 'node_modules/')
    };
    config.library.app = generateLibraries([
        'angular/angular',
        'angular-route/angular-route'
    ]);
    config.library.karma = generateLibraries([
        'angular-mocks/angular-mocks',
        'lodash/index',
        'phantomjs-polyfill/bind-polyfill'
    ]);

    // styling files
    config.styles = {
        dir: path.join(config.dir, 'styles/')
    };
    config.styles.files = [
        path.join(config.styles.dir, 'main.css')
    ];

    // for testing-related files
    config.test = {
        coverageDir: path.join(config.dir, 'coverage/'),
        dir: path.join(config.dir, 'test/')
    };
    // this is a webpack loader for doing coverage
    // on tests
    config.test.istanbulLoader = {
        postLoaders: [
            {
                exclude: /(test|node_modules)/,
                loader: 'istanbul-instrumenter',
                test: /\.ts$/
            }
        ]
    }
    config.test.karma = {
        configFile: path.join(config.test.dir, 'karma.conf.js'),
        watch: {
            autoWatch: true,
            browsers: ['Chrome'],
            reporters: [],
            singleRun: false
        }
    };
    config.test.specsDir = path.join(config.test.dir, 'spec/');
    config.test.specs = path.join(config.test.specsDir, '**/*.js');

    config.transpile = {
        dir: path.join(config.dir, 'transpiled/'),
        filename: 'app.packed.js'
    };
    config.transpile.packedFile = path.join(config.transpile.dir, config.transpile.filename);

    return config;
}());