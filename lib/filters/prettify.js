/**
 * {{ foo|prettify }}
 * http://github.com/assemble/swig-extensions
 *
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */

var prettify = require('../prettify');


/**
 * Prettify output HTML.
 * @param  {string} src
 * @return {string} HTML
 */
module.exports = function (src) {
  return prettify(src);
};

module.exports.safe = true;
