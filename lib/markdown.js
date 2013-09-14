/**
 * Markdown Utils
 * http://github.com/assemble/swig-extensions
 *
 * Copyright (c) 2013 Jon Schlinkert, contributors
 * Licensed under the MIT License (MIT).
 */

var marked = require("marked");
var hljs   = require("highlight.js");
var _      = require("lodash");

// Expose assemble options
var opts = require('assemble').options;

/**
 * Options
 */
marked.setOptions(_.extend({}, {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  silent: false,
  smartLists: true,
  langPrefix: "language-",
  highlight: function (code, lang) {
    var res = void 0;
    if (!lang) {
      return code;
    }
    switch (lang) {
    case "js":
      lang = "javascript";
    }
    try {
      return res = hljs.highlight(lang, code).value;
    } finally {
      return res || code;
    }
  }
}, (opts.marked || {})));

module.exports = exports = marked;