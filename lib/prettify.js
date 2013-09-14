/**
 * Prettify Utils
 * http://github.com/assemble/swig-extensions
 *
 * Copyright (c) 2013 Jon Schlinkert, contributors
 * Licensed under the MIT license.
 */

var prettifyHTML = require('js-beautify').html;
var utils = require('./utils');
var opts = require('assemble').options;
var _ = require('lodash');


/**
 * Format HTML with js-beautify, pass in options.
 * @param   {String} src     [The un-prettified HTML.]
 * @param   {Object} options [Object of options passed to js-beautify.]
 * @returns {String}         [Stunningly attractive HTML, to the point of hyperbole.]
 */
function prettify(src, options) {
  options = _.extend({}, opts.prettify, options || {});
  // require('grunt').log.writeln(JSON.stringify(options, null, 2));

  // Reduce multiple newlines to a single newline
  if(options.condense === true) {
    src = utils.condense(src);
  }

  // Add a single newline above code comments.
  if(options.padcomments === true) {
    src = utils.padcomments(src);
  }

  try {
    return prettifyHTML(src, {
      condense: true,
      indent_size: 2,
      indent_inner_html: true,
      unformatted: ['code', 'pre', 'em', 'strong']
    });
  } catch (e) {
    console.error(e);
    console.warn('HTML prettification failed.');
  }
};

// Export the 'prettify' module.
exports = module.exports = prettify;
