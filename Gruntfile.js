/*global module:false*/
module.exports = function(grunt) {
    var karmaOptions = { configFile: 'karma.conf.js' };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // https://github.com/karma-runner/grunt-karma
        karma: {
            options: karmaOptions,
            unit: {
                singleRun: true
            },
            debug: {
                singleRun: false
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir: 'styles',
                    cssDir: 'test',
                    specify: 'styles/application/app-setup.scss'
                }
            }
        },

        emberTemplates: {
          compile: {
            options: {
              templateName: function (filePath) {
                var fileName = /^(.*\/)*(.+)/m.exec(filePath)[2],
                    componentPath = /^\.\/app\/components\/(.*)/m.exec(filePath),
                    componentName;

                if(componentPath) {
                    componentPath = componentPath[1];
                    componentName = /^[^\/]*/m.exec(componentPath)[0];
                    if(/templates/.test(componentPath)) {
                        componentName += "/" + fileName;
                    }
                    return "components/" + componentName;
                }
                return fileName;
              }
            },
            files: {
                './app/ugified/templates-compiled.js' : [
                    './app/components/**/*.hbs',
                    './app/pods/**/*.hbs'
                ],
            }
          }
        }
    });

    grunt.loadNpmTasks('grunt-ember-templates');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('build', ['emberTemplates']);
    grunt.registerTask('test', ['compass', 'emberTemplates', 'karma:unit']);
    grunt.registerTask('test-start', ['compass', 'emberTemplates', 'karma:debug:start']);
    grunt.registerTask('test-run', ['compass', 'emberTemplates', 'karma:debug:run']);
    grunt.registerTask('default', ['compass', 'emberTemplates', 'karma']);
    grunt.registerTask('styles', ['compass']);
    grunt.registerTask('templates', ['emberTemplates']);
};
