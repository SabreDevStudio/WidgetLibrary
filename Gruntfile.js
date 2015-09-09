module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: ['dist/**/*', 'build/**/*']
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            prod: {
                src: ['src/**/*.js', '!src/lib/**/*.js']//'src-test/**.js']
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

        bootlint: {
            options: {
                stoponerror: false,
                relaxerror: ['W001', 'W002', 'W003', 'W005', 'E001']
            },
            files: ['src/view-templates/*.tpl.html', 'www/*.html']
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
            widgets_img: {
                expand: true,
                cwd: 'widgets/',
                src: ['img/**/*'],
                dest: 'dist/widgets/',
                options: {
                    nonull: true
                }
            },
            page_img: {
                expand: true,
                src: ['www/img/**/*'],
                dest: 'dist/',
                options: {
                    nonull: true
                }
            },
            bootstrap_glyphicons_fonts: {
                expand: true,
                cwd: 'bower_components/bootstrap/',
                src: ['fonts/*'],
                dest: 'dist/widgets/',
                options: {
                    nonull: true
                }
            },
            copyHtmlUpdatingLinksAndIncludes: {
                expand: true,
                cwd: 'build/www/',
                src: ['**/*'],
                dest: 'dist/',
                options: {
                    nonull: true,
                    process: function (content, srcpath) {
                        var replaceRequireJSEntryWithMinifiedJS = function(content) {
                            return content.replace(/<script.*src=\".*require.js\".*<\/script>/g
                                , '<script async src="../widgets/SDSWidgets.min.js"></script>');
                        };
                        var replaceCSSImportsWithOneCSSBundleImport = function (content, srcpath) {
                            return content.replace(/<link\W+rel=\"stylesheet\"[\s\S]*css\">/g // all particular stylesheet imports must be placed next to each other (in one block, not separated by import of other types).
                                , '<link rel="stylesheet" type="text/css" href="widgets/css/SDS.min.css">');
                        };
                        /*  based on baseDir and filePath calculates the path prefix to navigate from filePath to the baseDir directory level
                            for example: buildToParentDirectoryPathElement('build/www', 'build/www/www/someFile.html') returns '../'.
                            For more files nested more deeply it returns for example '../../../'
                            This is needed to correct relative paths to local resources that were inserted automatically.
                        */
                        var buildToParentDirectoryPathElement = function (baseDir, filePath) {
                            var relativeFilePath = filePath.replace(new RegExp("^" + baseDir), '');
                            var dirNestingLevel = (relativeFilePath.match(/\//g) || []).length;

                            var toParentDirectoryPathElement = '';
                            for (var i = 0; i < dirNestingLevel; i++) {
                                toParentDirectoryPathElement += '../';
                            }
                            return toParentDirectoryPathElement;
                        };
                        var correctDirNestingInLinksFromPartials = function (content, srcpath) {
                            var baseDir = 'build/www/';
                            var toParentDirectoryPathElement = buildToParentDirectoryPathElement(baseDir, srcpath);

                            var HTML_LINKS_TO_LOCAL_HTML_FILES_REGEX = /(href=\")(.+\.html)(\")/gi;
                            var IMG_LINKS_TO_LOCAL_IMG_FILES_REGEX = /(\<img\s+src=\")(.+)(\")/gi;
                            var STYLESHEET_LINKS_TO_LOCAL_CSS_REGEX = /(\<link\s+rel=\"stylesheet\".*href=\")(.+)(\"\>)/gi;

                            return content.replace(HTML_LINKS_TO_LOCAL_HTML_FILES_REGEX, "$1" + toParentDirectoryPathElement + "$2$3")
                                            .replace(IMG_LINKS_TO_LOCAL_IMG_FILES_REGEX, "$1" + toParentDirectoryPathElement + "$2$3")
                                            .replace(STYLESHEET_LINKS_TO_LOCAL_CSS_REGEX, "$1" + toParentDirectoryPathElement + "$2$3");
                        };
                        return correctDirNestingInLinksFromPartials(replaceCSSImportsWithOneCSSBundleImport(replaceRequireJSEntryWithMinifiedJS(content), srcpath), srcpath);
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
                      name: 'SabreDevStudioSDK'
                    , mainConfigFile: 'src/SabreDevStudioSDK.js'
                    , out: "dist/widgets/SDSWidgets.min.js"
                    , inlineText: true
                    //, findNestedDependencies: true
                    , optimize: 'uglify2'
                    , include: ['../node_modules/requirejs/require.js']
                    , uglify2: { // decreases size by only 3%
                        compress: {
                            screw_ie8: true,
                            sequences: true,
                            //properties: true,
                            dead_code: true,
                            drop_debugger: true,
                            comparisons: true,
                            conditionals: true,
                            evaluate: true,
                            booleans: true,
                            loops: true,
                            unused: true,
                            hoist_funs: true,
                            if_return: true,
                            join_vars: true,
                            cascade: true,
                            //negate_iife: true,
                            drop_console: true
                        }
                        //warnings: true
                    }
                }
            }
        },

        cssmin: {
            options: {
                roundingPrecision: -1
            },
            cssbundle: {
                files: {
                    'dist/widgets/css/SDS.min.css': [
                          'stylesheets/**/*.css'
                        , 'www/css/**/*.css'
                        , 'bower_components/bootstrap/dist/css/bootstrap.css'
                        , 'bower_components/angular-ui-select/dist/select.css'
                    ]
                }
            }
        },

        includereplace: {
            htmlPartials: {
                options: {
                    prefix: '<partial command="',
                    suffix: '"></partial>',
                    globals: {

                    }
                },
                src: ['index.html', 'www/**/*.html', '!www/partials/**/*'],
                dest: 'build/www/'
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
    grunt.loadNpmTasks('grunt-bootlint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-include-replace');

    grunt.registerTask('test', 'karma');

    grunt.registerTask('css-pipeline', ['compass', 'csslint', 'autoprefixer']);

    grunt.registerTask('dist', [
          'clean:dist'
        , 'requirejs:compile'
        , 'css-pipeline'
        , 'cssmin:cssbundle'
        , 'copy:bootstrap_glyphicons_fonts'
        , 'includereplace:htmlPartials'
        , 'copy:copyHtmlUpdatingLinksAndIncludes'
        , 'copy:widgets_img'
        , 'copy:page_img'
    ]);

    /*
        test if airline logos visible.
     */

};