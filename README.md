[![MIT License][license-image]][license-url] [![Build Status][travis-image]][travis-url] [![Code Climate][codeclimate-gpa-image]][codeclimate-url] [![Codacy Badge][codacy-shields-image]][codacy-url] [![Coverage Status][coveralls-image]][coveralls-url]

#better-logging-base



- [Installing](#installing)
		- [Bower](#bower)
		- [Manually](#manually)
- [Getting Started](#getting-started)
- [Applying Patterns](#applying-patterns)
		- [Prefix pattern](#prefix-pattern)
		- [Datetime stamp patterns](#datetime-stamp-patterns)
		- [Logging patterns](#logging-patterns)
- [Managing logging priority](#managing-logging-priority)

---

<a name='installing'/>
## Installing

_better-logging-base_ has optional dependencies on _[momentjs](https://github.com/moment/moment)_ and _[sprintf.js](https://github.com/alexei/sprintf.js)_: without moment you can't pattern a nicely readable datetime stamp and without sprintf you can't pattern your logging input lines. Default fixed patterns are applied if either they are missing.

<a name='bower'/>
#### Bower

Will be implemented

<a name='manually'/>
#### Manually

Include _logger.js_, _[momentjs](https://github.com/moment/moment)_ and _[sprintf.js](https://github.com/alexei/sprintf.js)_ in your web app.

<a name='getting-started'/>
## Getting Started

todo...

<a name='applying-patterns'/>
## Applying Patterns
<a name='prefix-pattern'/>
#### Prefix pattern

By default, the prefix is formatted like so:

`datetime here::[context's name here]>your logging input here`

However, you can change this as follows:

todo...

<a name='datetime-stamp-patterns'/>
#### Datetime stamp patterns

If you have included _moment.js_ in your webapp, you can start using datetime stamp patterns with _better-logging-base_. The default pattern is `dddd h:mm:ss a`, which translates to _Sunday 12:55:07 am_. You customize the pattern as follows:

todo...

This way you can switch to a 24h format this way as well, for example, or use your locale-specific format.

 * For all options, see [moment.js](http://momentjs.com/docs/#/displaying/)

<a name='logging-patterns'/>
#### Logging patterns

If you have included _sprintf.js_ in your webapp, you can start using patterns with _better-logging-base_.

Traditional style with `console`:
```javascript
console.error ("Error uploading document [" + filename + "], Error: '" + err.message + "'. Try again later.")
// Error uploading document [contract.pdf], Error: 'Service currently down'. Try again later. "{ ... }"
```

Modern style with _better-logging-base_ enhanced console:
 ```javascript
console.error("Error uploading document [%s], Error: '%s'. Try again later.", filename, err.message)
// Sunday 12:13:06 pm::[myapp.file-upload]> Error uploading document [contract.pdf], Error: 'Service currently down'. Try again later.
 ```

---

You can even **combine pattern input and normal input**:
 ```javascript
logger.warn("This %s pattern %j", "is", "{ 'in': 'put' }", "but this is not!", ['this', 'is', ['handled'], 'by the browser'], { 'including': 'syntax highlighting', 'and': 'console interaction' });
// 17-5-2015 00:16:08::[test]>  This is pattern "{ 'in': 'put' }" but this is not! ["this", "is handled", "by the browser"] Object {including: "syntax highlighting", and: "console interaction"}
 ```
 
To **log an `Object`**, you now have three ways of doing it, but the combined solution shown above has best integration with the browser.
 ```javascript
logger.warn("Do it yourself: " + JSON.stringify(obj)); // json string with stringify's limitations
logger.warn("Let sprintf handle it: %j", obj); // json string with sprintf's limitations
logger.warn("Let the browser handle it: ", obj); // interactive tree in the browser with syntax highlighting
logger.warn("Or combine all!: %s, %j", JSON.stringify(obj), obj, obj);
 ```

 * For all options, see [sprintf.js](https://github.com/alexei/sprintf.js)

[working demo](https://jsfiddle.net/plantface/qkobLe0m/)

<a name='managing-logging-priority'/>
## Managing logging priority

Using logging levels, we can manage output on several levels. Contexts can be named using dot '.' notation, where the names before dots are intepreted as groups or packages.

For example for `'a.b'` and `a.c` we can define a general log level for `a` and have a different log level for only 'a.c'.

todo...

The level's order are as follows:
```
  1. TRACE: displays all levels, is the finest output and only recommended during debugging
  2. DEBUG: display all but the finest logs, only recommended during develop stages
  3. INFO :  Show info, warn and error messages
  4. WARN :  Show warn and error messages
  5. ERROR: Show only error messages.
  6. OFF  : Disable all logging, recommended for silencing noisy logging during debugging. *will* surpress errors logging.
```
Example:

```javascript
config.prefixPattern = '%s::[%s]> ';
config.logLevels = {
    'a.b.c': logEnhancerProvider.LEVEL.TRACE, // trace + debug + info + warn + error
    'a.b.d': logEnhancerProvider.LEVEL.ERROR, // error
    'a.b': logEnhancerProvider.LEVEL.DEBUG, // debug + info + warn + error
    'a': logEnhancerProvider.LEVEL.WARN, // warn + error
    '*': logEnhancerProvider.LEVEL.INFO // info + warn + error
};
// globally only INFO and more important are logged
// for group 'a' default is WARN and ERROR
// a.b.c and a.b.d override logging everything-with-TRACE and least-with-ERROR respectively

// modify later:
config.logLevels['a.b.c'] = $log.LEVEL.ERROR;
config.logLevels['*'] = $log.LEVEL.OFF;
```

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[travis-url]: http://travis-ci.org/better-js-logging/better-logging-base
[travis-image]: https://img.shields.io/travis/better-js-logging/better-logging-base.svg?style=flat

[coveralls-url]: https://coveralls.io/r/better-js-logging/better-logging-base?branch=master
[coveralls-image]: https://coveralls.io/repos/better-js-logging/better-logging-base/badge.svg?branch=master

[codeclimate-url]: https://codeclimate.com/github/better-js-logging/better-logging-base
[codeclimate-gpa-image]: https://codeclimate.com/github/better-js-logging/better-logging-base/badges/gpa.svg

[codacy-url]: https://www.codacy.com/app/b-bottema/angular-logger
[codacy-image]: https://www.codacy.com/project/badge/571878304e9b499f8992c908599fcc35
[codacy-shields-image]: https://img.shields.io/codacy/571878304e9b499f8992c908599fcc35.svg?style=flat
