// Generated on 2017-01-30 using generator-simple-angular-app 0.0.9
'use strict';
var moment = require('moment');

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var yeomanConfig = {
    app: 'src',
    dist: 'dist'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      options: {
        nospawn: true,
        livereload: LIVERELOAD_PORT
      },
      livereload: {
        files: [
          '<%= yeoman.app %>/app/{,*/}*.html',
          '<%= yeoman.app %>/app/{,*/}*.js',
          '<%= yeoman.app %>/app/content/{,*/}*.{css,png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>',
        app: 'Chrome'
      }
    }
  });

  grunt.registerTask('server', ['connect:livereload', 'open', 'watch']);
  grunt.registerTask('test', ['karma:unit']);
};
