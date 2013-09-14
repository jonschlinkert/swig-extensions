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
    var meta = grunt.file.readJSON('package.json');
    var asset = path.join.bind(null, __dirname, 'assets');

    // Generate index.js for filters
    function makeIndex(file) {
      var index = grunt.file.read(asset('index.tmpl'));
      var indexFiles = grunt.file.expand('lib/' + file + '/*.js');
      indexFiles = indexFiles.map(function (filepath) {
        return path.basename(filepath, '.js');
      });
      meta.dir = file;
      meta.indexFiles = _.pull(indexFiles, 'index');
      var processIndex = grunt.template.process(index, {
        data: meta,
        delimiters: 'templates'
      });
      grunt.file.write('lib/'+ file + '/index.js', processIndex.replace(/\\/g, ''));
    }
    makeIndex('filters');
    makeIndex('tags');

    // Fail task if any errors were logged.
    if (this.errorCount > 0) {
      return false;
    }
  });

};