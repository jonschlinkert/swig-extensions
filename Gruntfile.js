/**
 * http://github.com/assemble/swig-extensions
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Metadata required for build.
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      license: '<%= _.pluck(pkg.licenses, "type").join(", ") %>',
      copyright: 'Copyright (c) <%= grunt.template.today("yyyy") %>',
      banner:
        '/**\n' +
        ' * <%= pkg.homepage %> \n' +
        ' * <%= pkg.description %> \n' +
        ' * \n' +
        ' * <%= meta.copyright %>, Jon Schlinkert, Brian Woodward, contributors\n' +
        ' * Licensed under the <%= meta.license %> License. \n' +
        ' */ \n\n'
    },

    concat: {
      options: {
        stripBanners: 'all',
        banner: '<%= meta.banner %>\n\n'
      },

      all: {
        src: ['lib/**/*.js'],
        dest: 'lib/extensions.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        mangle: true
      },
      stable: {
        src: ['<%= concat.all.src %>'],
        dest: 'lib/extensions.min.js'
      }
    },

    jshint: {
      options: {jshintrc: '.jshintrc'},
      files: {
        src: ['Gruntfile.js', 'lib/**/*.js']
      }
    }
  });

  // Load these plugins to provide the necessary tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // by default, run tests
  grunt.registerTask('default', [
    'templates'
  ]);
};