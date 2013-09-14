/**
 * {{ str|markdown }}
 * http://github.com/assemble/swig-extensions
 *
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */

var markdown = require('../markdown');


/**
 * Convert markdown content to HTML.
 * @example
 * {{ foo|markdown }}
 * @param  {String} str
 * @return {String} HTML
 */
module.exports = function (str) {
  return markdown(str);
};

module.exports.safe = true;
