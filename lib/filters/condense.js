/**
 * {{ foo|condense }}
 * http://github.com/assemble/swig-extensions
 *
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */

var condense = require('../utils').condense;

/**
 * Condense output HTML by removing extra newlines, while leaving indentation intact
 * @param  {string} src
 * @return {string} HTML
 */

module.exports = function (src) {
  return condense(src);
};
