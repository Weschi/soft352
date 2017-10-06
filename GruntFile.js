module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-wiredep');

  var tasks = {
    watch: {
      configFiles: {
        files: [ 'Gruntfile.js', 'config/*.js' ],
        options: {
          reload: true
        }
      }
    },
    concat: {
      options: {
        separator: ';' //TODO: configure
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    wiredep: {
      task: {
        src: ['src/index.html'], //HTML file to inject bower packages into.
        devDependencies: true //Inject our dev dependencies according to bower.json
        //dependencies: true //Inject our dependencies according to bower.json
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    express: {
      all: {
        options: { 
          port: 9000,
          hostname: "0.0.0.0",
          livereload: true,
          bases: ["src"] //Our server, hosts the src file and its contents
        }
      }
    },
    open: {
      all: {
        // opens a specified file path, as we're using port 9k for our server, go ahead and fire it up
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    }
  };

  /**
   * In order to make it safe to just compile or copy *only* what was changed,
   * we need to ensure we are starting from a clean, fresh build. So we rename
   * the `watch` task to `delta` (that's why the configuration var above is
   * `delta`) and then add a new task called `watch` that does a clean build
   * before watching for changes.
   */
  //Initialise task configuration
  grunt.initConfig(tasks);
  //Task registration
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('serve', ['wiredep', 'express','open', 'watch']);
};