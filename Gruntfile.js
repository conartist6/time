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
                var name = /^(.*\/)*(.+)/m.exec(filePath)[2];

                if(/^\.\/app\/components/m.test(filePath)) {
                    return "components/" + name;
                }
                return name;
              }
            },
            files: {
                './app/ugified/templates-compiled.js' : [
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
