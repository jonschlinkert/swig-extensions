# swig extensions

> Tags, filters, and extensions for [Swig](http://paularmstrong.github.io/swig/), the most awesome template engine for node.js.

This project is based on (and complementary to) [swig-extras](https://github.com/paularmstrong/swig-extras), from [@paularmstrong](https://github.com/paularmstrong)


## Getting started

Use a filter:

```js
var swig = require('swig');
var extensions = require('swig-extensions');

extensions.useFilter(swig, 'markdown');
```

Use a tag:

```js
var swig = require('swig');
var extensions = require('swig-extensions');
var mySwig = new swig.Swig();

extensions.useTag(mySwig, 'markdown');
```

## Available Filters

* condense
* markdown (using Marked)
* prettify

## Available Tags

* markdown
* prettify


## Usage with Assemble

### 1. Install [assemble-swig](http://github.com/assemble/assemble-swig)

```shell
npm install assemble-swig --save-dev
```

Once the [assemble-swig](http://github.com/assemble/assemble-swig) engine has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('assemble-swig');
```

### 2. Add swig to assemble

Specify `swig` as the current engine for processing templates:

```js
assemble: {
  options: {
    engine: 'swig'
  }
}
```

### 3. Add swig tags and filters

Specify the path or paths (optionally using minimatch patterns) to the `helpers` property in the Assemble options:

```js
assemble: {
  options: {
    engine: 'swig',
    helpers: ['src/extensions/*.js']
  }
}
```


#### load them as modules

For Assemble to find and register your custom tags and filters, you must export them either as objects or functions inside a `module.exports` object:

```js
module.exports.register = function (swig, opts) {
  // filters and tags
};
```

Example of how to register multiple filters as properties of the `filters` object:

```js
var filters = module.exports = {};

filters.one = function (input) {
  return input;
};

filters.two = function (input) {
  return input;
};

filters.three = function (input) {
  return input;
};

module.exports.register = function (swig, opts) {
  opts = opts || {};

  // filters.useFilter(swig, filters);
  for (var filter in filters) {
    if (filters.hasOwnProperty(filter)) {
      swig.setFilter(filter, filters[filter]);
    }
  }
};
```



## Related projects

* [assemble](http://github.com/assemble) (see the [live docs](http://assemble.io))
* [assemble-swig](http://github.com/assemble/assemble-swig)
* [assemble-swig-examples](http://github.com/assemble/assemble-swig-examples)


## License

Licensed under the [MIT License](./LICENSE-MIT) (MIT)

Copyright (c) 2013 Jon Schlinkert

