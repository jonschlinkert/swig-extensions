/*
 * templates
 * http://assemble.io/
 *
 * Credit: based on grunt-contrib-internal
 * Copyright (c) 2013 Jon Schlinkert, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  var _ = require('lodash');

  // Add custom template delimiters.
  grunt.template.addDelimiters('templates', '{%', '%}');

  grunt.registerTask('templates', 'Generate repo documentation and core files.', function () {
    var path = require('path');
    var asset = path.join.bind(null, __dirname, 'assets');

    var meta = grunt.file.readJSON('package.json');

    var authors = grunt.file.read('AUTHORS');
    meta.authors = authors.split('\n').map(function (author) {
      var matches = author.match(/(.*?)\s*\((.*)\)/) || [];
      return {
        name: matches[1],
        url: matches[2]
      };
    });


    // Generate index.js for filters
    var filters = grunt.file.read(asset('filters.tmpl'));
    var filtersFiles = grunt.file.expand('lib/filters/*.js');
    filtersFiles = filtersFiles.map(function (filepath) {
      return path.basename(filepath, '.js');
    });
    meta.filtersFiles = _.pull(filtersFiles, 'index');
    var filterIndex = grunt.template.process(filters, {
      data: meta,
      delimiters: 'templates'
    });
    grunt.file.write('lib/filters/index.js', filterIndex);


    // Generate index.js for tags
    var tags = grunt.file.read(asset('tags.tmpl'));
    var tagsFiles = grunt.file.expand('lib/tags/*.js');
    tagsFiles = tagsFiles.map(function (filepath) {
      return path.basename(filepath, '.js');
    });
    meta.tagsFiles = _.pull(tagsFiles, 'index');
    var tagIndex = grunt.template.process(tags, {
      data: meta,
      delimiters: 'templates'
    });
    grunt.file.write('lib/tags/index.js', tagIndex);


    // Fail task if any errors were logged.
    if (this.errorCount > 0) {
      return false;
    }
  });

};