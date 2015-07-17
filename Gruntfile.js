module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: ['dist/'],

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            prod: {
                src: ['src/*.js', 'src/util/*.js', 'src-test/*.js']
            }
        },

        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        },

        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            src: ['stylesheets/**/*.css', '!stylesheets/reset.css'] // do not css lint reset as it is machine generated and fine
        },

        autoprefixer: {
            options: {
                browsers: ['> 1%'] // more codenames at https://github.com/ai/autoprefixer#browsers
            },
            css: {
                src: 'stylesheets/**/*.css'
            }
        },

        copy: {
            main: {
                expand: true,
                src: ['stylesheets/*.css', 'www/CalendarSearch*'],
                dest: 'dist/',
                options: {
                    nonull: true,
                    process: function (content, srcpath) {
                        return content.replace(/SabreDevStudioSDK/g, "SabreDevStudioSDK_bundle.js");
                    }
                }
            }
        },

        karma: {
            'unit all browsers': {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['Chrome', 'IE', 'IE9', 'Firefox', 'Safari'],
                //browsers: ['IE', 'IE8'],
                logLevel: 'ERROR',
                customLaunchers: {
                    IE9: {
                        base: 'IE',
                        'x-ua-compatible': 'IE=EmulateIE9'
                    },
                    IE8: {
                        base: 'IE',
                        'x-ua-compatible': 'IE=EmulateIE8'
                    }
                }
            },
            'unit Safari': {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['Safari'],
                logLevel: 'ERROR'
            }
        },

        watch: {
            compass: {
                files: ['style/*.scss'],
                tasks: ['compass'],
                options: {
                    spawn: false
                }
            },
            'css-pipeline': {
                files: ['style/*.scss'],
                tasks: ['css-pipeline'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        },

        requirejs: {
            compile: {
                options: {
                    name: 'SabreDevStudioSDK',
                    mainConfigFile: 'src/SabreDevStudioSDK.js',
                    out: "dist/SDSWidgets.dist.js",
                    paths: {
                        'jquery': "empty:",
                        'jquery-ui': "empty:"
                    },
                    inlineText: true,
                    //optimize: 'none',
                    //findNestedDependencies: true,
                    include: ['../node_modules/requirejs/require.js']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-csslint');

    grunt.registerTask('test', 'karma');

    grunt.registerTask('css-pipeline', ['compass', 'csslint', 'autoprefixer']);

    grunt.registerTask('default', ['clean', 'jshint', 'karma', 'compass', 'csslint', 'autoprefixer', 'copy']);

};