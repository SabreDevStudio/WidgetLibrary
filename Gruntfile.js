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
        src: 'src/Calendar.js',
        dest: 'dist/js/bundle.js'
      }
    },

    jstestdriver: {
      options: {
        canFail: true,
        verbose: true
      },
      files: ["jsTestDriver.conf"]
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
  grunt.loadNpmTasks('grunt-jstestdriver');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

};