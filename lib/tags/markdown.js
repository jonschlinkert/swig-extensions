/**
 * {% markdown }...{% endmarkdown %}
 * http://github.com/assemble/swig-extensions
 *
 * Copyright (c) 2013, Jon Schlinkert, Brian Woodward contributors
 * Licensed under the MIT License (MIT).
 */


var marked = require('../markdown');

exports.parse = function (str, line, parser, types, options) {
  parser.on('*', function () {
    throw new Error('The markdown tag does not accept arguments');
  });

  return true;
};

exports.compile = function (compiler, args, content, parents, options, blockName) {
  return '(function () {\n' +
    '  var __o = _output;\n' +
    '  _output = "";\n' +
    compiler(content, parents, options, blockName) + ';\n' +
    '  __o += _ext.markdown(_output);\n' +
    '  _output = __o;\n' +
    '})();\n';
};

exports.ends = true;
exports.blockLevel = false;

exports.ext = {
  name: 'markdown',
  obj: marked
};

module.exports.safe = true;
