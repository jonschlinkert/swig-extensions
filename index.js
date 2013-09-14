// From https://github.com/paularmstrong/swig-extras

/**
 * Raw filter methods.
 * @type {object}
 */
exports.filters = require('./lib/filters');

/**
 * Add an extensions filter to your swig instance.
 *
 * @example
 * var swig = require('swig'),
 *   extensions = require('swig-extensions');
 * extensions.useFilter(swig, 'prettify');
 *
 * @param  {object} swig   Swig instance.
 * @param  {string} filter extensions filter name.
 * @return {undefined}
 * @throws {Error} If extensions does not have a filter with the given name.
 */
exports.useFilter = function (swig, filter) {
  var f = exports.filters[filter];
  if (!f) {
    throw new Error('Filter "' + filter + '" does not exist.');
  }
  swig.setFilter(filter, f);
};




/**
 * Raw tag objects.
 * @type {object}
 */
exports.tags = require('./lib/tags');

/**
 * Add an extensions tag to your swig instance.
 *
 * @example
 * var swig = require('swig'),
 *   extensions = require('swig-extensions'),
 *   mySwig = new swig.Swig();
 * extensions.useTag(mySwig, 'prettify');
 *
 * @param  {object} swig   Swig instance.
 * @param  {string} tag    extensions tag name.
 * @return {undefined}
 * @throws {Error} If extensions does not have a tag with the given name.
 */
exports.useTag = function (swig, tag) {
  var t = exports.tags[tag];
  if (!t) {
    throw new Error('Tag "' + tag + '" does not exist.');
  }
  swig.setTag(tag, t.parse, t.compile, t.ends, t.blockLevel);
  if (t.ext) {
    swig.setExtension(t.ext.name, t.ext.obj);
  }
};

