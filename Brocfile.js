var pathResolver = require('./app/setup/path_resolver').pathResolver;

module.exports = function (broccoli) {
    var templateCompiler = require('broccoli-ember-hbs-template-compiler'),
        es6transpiler = require('broccoli-es6-module-transpiler'), 
        pickFiles = require('broccoli-static-compiler'),
        mergeTrees = require('broccoli-merge-trees'),
        concat = require('broccoli-concat'),
        env = require('broccoli-env').getEnv();

    var scripts = pickFiles('app', {
        srcDir: '/',
        files: ['**/*.js'],
        destDir: '/scripts'
    });

    scripts = es6transpiler(scripts, {
        srcDir: 'app',
        resolver: pathResolver,
        files: ['pods/router/*/*.js', 'pods/data/*/*.js'],
        globals: {
            "Em": false,
            "moment": false,
            "DS": false,
            "requirejs": false
        }
    });

    var templates = pickFiles('app', {
        srcDir: '/',
        files: ['**/*.hbs'],
        destDir: '/templates'
    });

    templates = templateCompiler(templates);

    templates = concat(templates, {
        inputFiles: ["**/*.js"],
        outputFile: '/templates/templates-compiled.js',
    });

    var styles = concat('app', {
        inputFiles: ['**/*.css'],
        outputFile: '/styles/app.css'
    });

    return mergeTrees([scripts, templates, styles]);

  //   var styles = 'styles'
  //       styles = pickFiles(styles, {
  //       srcDir: '/',
  //       files: '**/*.css',
  //       destDir: 'ugified'
  //   })

  //   var sourceTrees = [app, styles];

  // var appCss = compileSass(sourceTrees, 'appkit/app.scss', 'assets/app.css')
}