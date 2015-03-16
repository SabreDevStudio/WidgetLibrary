module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

	jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      prod: {
        src: ['src/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },

    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
	
	browserify: {
      main: {
        src: 'src/calendar.js',
        dest: 'dist/js/bundle.js'
      }
    },

    //jstestdriver: {
    //  options: {
    //    canFail: true,
    //    verbose: true
    //  },
    //  files: ["jsTestDriver.conf"]
    //},

    //jasmine: {
    //  all: ['test/runner.html']
    //},

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        autoWatch: true
      }
    },
	
	watch: {
	  js: {
		files: ['src/**/*.js'],
		tasks: ['browserify'],
		options: {
		  spawn: false,
		},
	  },
      compass: {
        files: ['style/*.scss'],
        tasks: ['compass'],
        options: {
          spawn: false,
        },
      }
	},
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-jstestdriver');

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  //grunt.loadNpmTasks('grunt-jasmine-task');
  grunt.loadNpmTasks('grunt-karma');

  // Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('test', 'karma');

};