module.exports = function(grunt) {

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

    browserify: {
      'dist/src/SabreDevStudioSDK_bundle.js': ['js/SabreDevStudioSDK.js']
    },

    copy: {
      main: {
        expand: true,
        src: ['stylesheets/*.css', 'www/CalendarSearch*'],
        dest: 'dist/',
        options: {
          nonull: true,
          process: function (content, srcpath) {
            return content.replace(/SabreDevStudioSDK/g,"SabreDevStudioSDK_bundle.js");
          }
        }
      }
    },

    karma: {
      'unit all browsers' : {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['Chrome', 'IE', 'IE9', 'Firefox', 'Safari'],
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
	  js: {
		files: ['src/**/*.js'],
		tasks: ['browserify'],
		options: {
		  spawn: false
		}
	  },
      compass: {
        files: ['style/*.scss'],
        tasks: ['compass'],
        options: {
          spawn: false
        }
      }
	}
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.loadNpmTasks('grunt-karma');

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('watch', ['watch']);

  grunt.registerTask('test', 'karma');

  grunt.registerTask('default', ['clean', 'jshint', 'karma', 'compass', 'browserify', 'copy']);

};