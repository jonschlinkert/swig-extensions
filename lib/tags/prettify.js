/*
 * {% prettify %}...{% endprettify %}
 * http://github.com/assemble/swig-extensions
 *
 * Copyright (c) 2013, Jon Schlinkert, Brian Woodward contributors
 * Licensed under the MIT license.
 */

'use strict';

var prettify = require('../prettify');

exports.parse = function (str, line, parser, types, options) {
  parser.on('*', function () {
    throw new Error('The prettify tag does not accept arguments');
  });
  return true;
};

exports.compile = function (compiler, args, content, parents, options, blockName) {
  return '(function () {\n' +
    '  var __o = _output;\n' +
    '  _output = "";\n' +
    compiler(content, parents, options, blockName) + ';\n' +
    '  __o += _ext.prettify(_output);\n' +
    '  _output = __o;\n' +
    '  return _output;\n' +
    '})();\n';
};

exports.parse = function (str, line, parser, types) {
  parser.on('*', function (token) {
    throw new Error('Unexpected token "' + token.match + '" on line ' + line + '.');
  });

  return true;
};

exports.ends = true;
exports.blockLevel = false;

exports.ext = {
  name: 'prettify',
  obj: prettify
};




