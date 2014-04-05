/*
 * Goals: reduce typing in index. Automatically include all files in a single packaging state.
 * CSS and hbs to be concatenated. Components to be included individually by name, to include subordinate files thru es6 catter.
 * 
 */
module.exports = function (broccoli) {
    var filterTemplates = require('broccoli-template'),
        compileES6 = require('broccoli-es6-concatenator'),
        pickFiles = require('broccoli-static-compiler'),
        mergeTrees = require('broccoli-merge-trees'),
        env = require('broccoli-env').getEnv(),
        fs = require('fs');


    function readDir(base, recursive, prefix) {
        var dirs = [],
            path,
            directories,
            stack = [];

        function _readDir() {
            path = base + stack.join('/');
            directories = fs.readdirSync(path).filter(function(file) {
                return fs.statSync(path + '/' + file).isDirectory();
            });
            if(!directories) {
                return;
            }
            directories.forEach(function(dir) {
                stack.push(dir);
                path = stack.join('/');

                dirs.push(base + path);

                if(recursive) {
                    _readDir();
                }
                stack.pop();
            });
        }
        _readDir(path);
        return dirs;
    }

    // readDir('./app/pods/', true);
    // var app = mergeTrees(readDir('./app/components/', false));
    
    // console.log(app);

    scripts = pickFiles('app', {
        srcDir: '/',
        files: 'components/**/*.css',
        destDir: 'ugified'
    });

    return scripts;

    // app = filterTemplates(app, {
    //     extensions: ['hbs', 'handlebars'],
    //     compileFunction: 'Ember.Handlebars.compile'
    // });

  //   var styles = 'styles'
  //       styles = pickFiles(styles, {
  //       srcDir: '/',
  //       files: '**/*.css',
  //       destDir: 'ugified'
  //   })

  //   var sourceTrees = [app, styles];

  //   //var appAndDependencies = new mergeTrees(sourceTrees, { overwrite: true })

  // var appJs = compileES6(sourceTrees, {
  //   ignoredModules: [
  //     'resolver'
  //   ],
  //   inputFiles: [
  //     'todomvc/**/*.js'
  //   ],
  //   legacyFilesToAppend: [
  //     'jquery.js',
  //     'handlebars.js',
  //     'ember.js',
  //   ],
  //   wrapInEval: true,
  //   outputFile: '/assets/application.js'
  // })

  // var appCss = compileSass(sourceTrees, 'appkit/app.scss', 'assets/app.css')

  // var publicFiles = 'public'

  // return mergeTrees([appJs, appCss, publicFiles])
}