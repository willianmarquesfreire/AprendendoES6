(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _coreDecorators = require("core-decorators");

var _app = require("./src/app.js");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./src/app.js":21,"core-decorators":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = applyDecorators;
var defineProperty = Object.defineProperty;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

function applyDecorators(Class, props) {
  var prototype = Class.prototype;

  for (var key in props) {
    var decorators = props[key];

    for (var i = 0, l = decorators.length; i < l; i++) {
      var decorator = decorators[i];

      defineProperty(prototype, key, decorator(prototype, key, getOwnPropertyDescriptor(prototype, key)));
    }
  }

  return Class;
}

module.exports = exports["default"];
},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = autobind;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _privateUtils = require('./private/utils');

var defineProperty = Object.defineProperty;
var getPrototypeOf = Object.getPrototypeOf;

function bind(fn, context) {
  if (fn.bind) {
    return fn.bind(context);
  } else {
    return function __autobind__() {
      return fn.apply(context, arguments);
    };
  }
}

var mapStore = undefined;

function getBoundSuper(obj, fn) {
  if (typeof WeakMap === 'undefined') {
    throw new Error('Using @autobind on ' + fn.name + '() requires WeakMap support due to its use of super.' + fn.name + '()\n      See https://github.com/jayphelps/core-decorators.js/issues/20');
  }

  if (!mapStore) {
    mapStore = new WeakMap();
  }

  if (mapStore.has(obj) === false) {
    mapStore.set(obj, new WeakMap());
  }

  var superStore = mapStore.get(obj);

  if (superStore.has(fn) === false) {
    superStore.set(fn, bind(fn, obj));
  }

  return superStore.get(fn);
}

function autobindClass(klass) {
  var descs = (0, _privateUtils.getOwnPropertyDescriptors)(klass.prototype);
  var keys = (0, _privateUtils.getOwnKeys)(descs);

  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    var desc = descs[key];

    if (typeof desc.value !== 'function' || key === 'constructor') {
      continue;
    }

    defineProperty(klass.prototype, key, autobindMethod(klass.prototype, key, desc));
  }
}

function autobindMethod(target, key, _ref) {
  var fn = _ref.value;
  var configurable = _ref.configurable;
  var enumerable = _ref.enumerable;

  if (typeof fn !== 'function') {
    throw new SyntaxError('@autobind can only be used on functions, not: ' + fn);
  }

  var constructor = target.constructor;

  return {
    configurable: configurable,
    enumerable: enumerable,

    get: function get() {
      // Class.prototype.key lookup
      // Someone accesses the property directly on the prototype on which it is
      // actually defined on, i.e. Class.prototype.hasOwnProperty(key)
      if (this === target) {
        return fn;
      }

      // Class.prototype.key lookup
      // Someone accesses the property directly on a prototype but it was found
      // up the chain, not defined directly on it
      // i.e. Class.prototype.hasOwnProperty(key) == false && key in Class.prototype
      if (this.constructor !== constructor && getPrototypeOf(this).constructor === constructor) {
        return fn;
      }

      // Autobound method calling super.sameMethod() which is also autobound and so on.
      if (this.constructor !== constructor && key in this.constructor.prototype) {
        return getBoundSuper(this, fn);
      }

      var boundFn = bind(fn, this);

      defineProperty(this, key, {
        configurable: true,
        writable: true,
        // NOT enumerable when it's a bound method
        enumerable: false,
        value: boundFn
      });

      return boundFn;
    },
    set: (0, _privateUtils.createDefaultSetter)(key)
  };
}

function handle(args) {
  if (args.length === 1) {
    return autobindClass.apply(undefined, _toConsumableArray(args));
  } else {
    return autobindMethod.apply(undefined, _toConsumableArray(args));
  }
}

function autobind() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length === 0) {
    return function () {
      return handle(arguments);
    };
  } else {
    return handle(args);
  }
}

module.exports = exports['default'];
},{"./private/utils":16}],4:[function(require,module,exports){
/**
 * core-decorators.js
 * (c) 2016 Jay Phelps and contributors
 * MIT Licensed
 * https://github.com/jayphelps/core-decorators.js
 * @license
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

var _override = require('./override');

exports.override = _interopRequire(_override);

var _deprecate = require('./deprecate');

exports.deprecate = _interopRequire(_deprecate);
exports.deprecated = _interopRequire(_deprecate);

var _suppressWarnings = require('./suppress-warnings');

exports.suppressWarnings = _interopRequire(_suppressWarnings);

var _memoize = require('./memoize');

exports.memoize = _interopRequire(_memoize);

var _autobind = require('./autobind');

exports.autobind = _interopRequire(_autobind);

var _readonly = require('./readonly');

exports.readonly = _interopRequire(_readonly);

var _enumerable = require('./enumerable');

exports.enumerable = _interopRequire(_enumerable);

var _nonenumerable = require('./nonenumerable');

exports.nonenumerable = _interopRequire(_nonenumerable);

var _nonconfigurable = require('./nonconfigurable');

exports.nonconfigurable = _interopRequire(_nonconfigurable);

var _debounce = require('./debounce');

exports.debounce = _interopRequire(_debounce);

var _throttle = require('./throttle');

exports.throttle = _interopRequire(_throttle);

var _decorate = require('./decorate');

exports.decorate = _interopRequire(_decorate);

var _mixin = require('./mixin');

exports.mixin = _interopRequire(_mixin);
exports.mixins = _interopRequire(_mixin);

var _lazyInitialize = require('./lazy-initialize');

exports.lazyInitialize = _interopRequire(_lazyInitialize);

var _time = require('./time');

exports.time = _interopRequire(_time);

var _extendDescriptor = require('./extendDescriptor');

exports.extendDescriptor = _interopRequire(_extendDescriptor);

// Helper to apply decorators to a class without transpiler support

var _applyDecorators = require('./applyDecorators');

exports.applyDecorators = _interopRequire(_applyDecorators);
},{"./applyDecorators":2,"./autobind":3,"./debounce":5,"./decorate":6,"./deprecate":7,"./enumerable":8,"./extendDescriptor":9,"./lazy-initialize":10,"./memoize":11,"./mixin":12,"./nonconfigurable":13,"./nonenumerable":14,"./override":15,"./readonly":17,"./suppress-warnings":18,"./throttle":19,"./time":20}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = debounce;

var _privateUtils = require('./private/utils');

var DEFAULT_TIMEOUT = 300;

function handleDescriptor(target, key, descriptor, _ref) {
  var _ref2 = _slicedToArray(_ref, 2);

  var _ref2$0 = _ref2[0];
  var wait = _ref2$0 === undefined ? DEFAULT_TIMEOUT : _ref2$0;
  var _ref2$1 = _ref2[1];
  var immediate = _ref2$1 === undefined ? false : _ref2$1;

  var callback = descriptor.value;

  if (typeof callback !== 'function') {
    throw new SyntaxError('Only functions can be debounced');
  }

  return _extends({}, descriptor, {
    value: function value() {
      var _this = this;

      var _metaFor = (0, _privateUtils.metaFor)(this);

      var debounceTimeoutIds = _metaFor.debounceTimeoutIds;

      var timeout = debounceTimeoutIds[key];
      var callNow = immediate && !timeout;
      var args = arguments;

      clearTimeout(timeout);

      debounceTimeoutIds[key] = setTimeout(function () {
        delete debounceTimeoutIds[key];
        if (!immediate) {
          callback.apply(_this, args);
        }
      }, wait);

      if (callNow) {
        callback.apply(this, args);
      }
    }
  });
}

function debounce() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _privateUtils.decorate)(handleDescriptor, args);
}

module.exports = exports['default'];
},{"./private/utils":16}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = decorate;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var _privateUtils = require('./private/utils');

var defineProperty = Object.defineProperty;

function handleDescriptor(target, key, descriptor, _ref) {
  var _ref2 = _toArray(_ref);

  var decorator = _ref2[0];

  var args = _ref2.slice(1);

  var configurable = descriptor.configurable;
  var enumerable = descriptor.enumerable;
  var writable = descriptor.writable;

  var originalGet = descriptor.get;
  var originalSet = descriptor.set;
  var originalValue = descriptor.value;
  var isGetter = !!originalGet;

  return {
    configurable: configurable,
    enumerable: enumerable,
    get: function get() {
      var fn = isGetter ? originalGet.call(this) : originalValue;
      var value = decorator.call.apply(decorator, [this, fn].concat(_toConsumableArray(args)));

      if (isGetter) {
        return value;
      } else {
        var desc = {
          configurable: configurable,
          enumerable: enumerable
        };

        desc.value = value;
        desc.writable = writable;

        defineProperty(this, key, desc);

        return value;
      }
    },
    set: isGetter ? originalSet : (0, _privateUtils.createDefaultSetter)()
  };
}

function decorate() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _privateUtils.decorate)(handleDescriptor, args);
}

module.exports = exports['default'];
},{"./private/utils":16}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = deprecate;

var _privateUtils = require('./private/utils');

var DEFAULT_MSG = 'This function will be removed in future versions.';

function handleDescriptor(target, key, descriptor, _ref) {
  var _ref2 = _slicedToArray(_ref, 2);

  var _ref2$0 = _ref2[0];
  var msg = _ref2$0 === undefined ? DEFAULT_MSG : _ref2$0;
  var _ref2$1 = _ref2[1];
  var options = _ref2$1 === undefined ? {} : _ref2$1;

  if (typeof descriptor.value !== 'function') {
    throw new SyntaxError('Only functions can be marked as deprecated');
  }

  var methodSignature = target.constructor.name + '#' + key;

  if (options.url) {
    msg += '\n\n    See ' + options.url + ' for more details.\n\n';
  }

  return _extends({}, descriptor, {
    value: function deprecationWrapper() {
      console.warn('DEPRECATION ' + methodSignature + ': ' + msg);
      return descriptor.value.apply(this, arguments);
    }
  });
}

function deprecate() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _privateUtils.decorate)(handleDescriptor, args);
}

module.exports = exports['default'];
},{"./private/utils":16}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = enumerable;

var _privateUtils = require('./private/utils');

function handleDescriptor(target, key, descriptor) {
  descriptor.enumerable = true;
  return descriptor;
}

function enumerable() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _privateUtils.decorate)(handleDescriptor, args);
}

module.exports = exports['default'];
},{"./private/utils":16}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = extendDescriptor;

var _privateUtils = require('./private/utils');

var getPrototypeOf = Object.getPrototypeOf;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

function handleDescriptor(target, key, descriptor) {
  var superKlass = getPrototypeOf(target);
  var superDesc = getOwnPropertyDescriptor(superKlass, key);

  return _extends({}, superDesc, {
    value: descriptor.value,
    initializer: descriptor.initializer,
    get: descriptor.get || superDesc.get,
    set: descriptor.set || superDesc.set
  });
}

function extendDescriptor() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _privateUtils.decorate)(handleDescriptor, args);
}

module.exports = exports['default'];
},{"./private/utils":16}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = lazyInitialize;

var _privateUtils = require('./private/utils');

var defineProperty = Object.defineProperty;

function handleDescriptor(target, key, descriptor) {
  var configurable = descriptor.configurable;
  var enumerable = descriptor.enumerable;
  var initializer = descriptor.initializer;
  var value = descriptor.value;

  return {
    configurable: configurable,
    enumerable: enumerable,

    get: function get() {
      // This happens if someone accesses the
      // property directly on the prototype
      if (this === target) {
        return;
      }

      var ret = initializer ? initializer.call(this) : value;

      defineProperty(this, key, {
        configurable: configurable,
        enumerable: enumerable,
        writable: true,
        value: ret
      });

      return ret;
    },

    set: (0, _privateUtils.createDefaultSetter)(key)
  };
}

function lazyInitialize() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _privateUtils.decorate)(handleDescriptor, args);
}

module.exports = exports['default'];
},{"./private/utils":16}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = memoize;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _privateUtils = require('./private/utils');

function toObject(cache, value) {
  if (value === Object(value)) {
    return value;
  }
  return cache[value] || (cache[value] = {});
}

function applyAndCache(context, fn, args, cache, signature) {
  var ret = fn.apply(context, args);
  cache[signature] = ret;
  return ret;
}

function metaForDescriptor(descriptor) {
  var fn = undefined,
      wrapKey = undefined;

  // This is ugly code, but way faster than other
  // ways I tried that *looked* pretty

  if (descriptor.value) {
    fn = descriptor.value;
    wrapKey = 'value';
  } else if (descriptor.get) {
    fn = descriptor.get;
    wrapKey = 'get';
  } else if (descriptor.set) {
    fn = descriptor.set;
    wrapKey = 'set';
  }

  return { fn: fn, wrapKey: wrapKey };
}

function handleDescriptor(target, key, descriptor) {
  console.warn('DEPRECATION: @memoize is deprecated and will be removed shortly. Use @decorate with lodash\'s memoize helper.\n\n  https://github.com/jayphelps/core-decorators.js#decorate');

  var _metaForDescriptor = metaForDescriptor(descriptor);

  var fn = _metaForDescriptor.fn;
  var wrapKey = _metaForDescriptor.wrapKey;

  var argumentCache = new WeakMap();
  var signatureCache = Object.create(null);
  var primativeRefCache = Object.create(null);
  var argumentIdCounter = 0;

  return _extends({}, descriptor, _defineProperty({}, wrapKey, function memoizeWrapper() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var signature = '0';

    for (var i = 0, l = args.length; i < l; i++) {
      var arg = args[i];
      var argRef = toObject(primativeRefCache, arg);
      var argKey = argumentCache.get(argRef);

      if (argKey === undefined) {
        argKey = ++argumentIdCounter;
        argumentCache.set(argRef, argKey);
      }

      signature += argKey;
    }

    return signatureCache[signature] || applyAndCache(this, fn, arguments, signatureCache, signature);
  }));
}

function memoize() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return (0, _privateUtils.decorate)(handleDescriptor, args);
}

module.exports = exports['default'];
},{"./private/utils":16}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = mixin;

var _privateUtils = require('./private/utils');

var defineProperty = Object.defineProperty;
var getPrototypeOf = Object.getPrototypeOf;

function buggySymbol(symbol) {
  return Object.prototype.toString.call(symbol) === '[object Symbol]' && typeof symbol === 'object';
}

function hasProperty(prop, obj) {
  // We have to traverse manually prototypes' chain for polyfilled ES6 Symbols
  // like "in" operator does.
  // I.e.: Babel 5 Symbol polyfill stores every created symbol in Object.prototype.
  // That's why we cannot use construction like "prop in obj" to check, if needed
  // prop actually exists in given object/prototypes' chain.
  if (buggySymbol(prop)) {
    do {
      if (obj === Object.prototype) {
        // Polyfill assigns undefined as value for stored symbol key.
        // We can assume in this special case if there is nothing assigned it doesn't exist.
        return typeof obj[prop] !== 'undefined';
      }
      if (obj.hasOwnProperty(prop)) {
        return true;
      }
    } while (obj = getPrototypeOf(obj));
    return false;
  } else {
    return prop in obj;
  }
}

function handleClass(target, mixins) {
  if (!mixins.length) {
    throw new SyntaxError('@mixin() class ' + target.name + ' requires at least one mixin as an argument');
  }

  for (var i = 0, l = mixins.length; i < l; i++) {
    var descs = (0, _privateUtils.getOwnPropertyDescriptors)(mixins[i]);
    var keys = (0, _privateUtils.getOwnKeys)(descs);

    for (var j = 0, k = keys.length; j < k; j++) {
      var key = keys[j];

      if (!hasProperty(key, target.prototype)) {
        defineProperty(target.prototype, key, descs[key]);
      }
    }
  }
}

function mixin() {
  for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
    mixins[_key] = arguments[_key];
  }

  if (typeof mixins[0] === 'function') {
    return handleClass(mixins[0], []);
  } else {
    return function (target) {
      return handleClass(target, mixins);
    };
  }
}

module.exports = exports['default'];
},{"./private/utils":16}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = nonconfigurable;

var _privateUtils = require('./private/utils');

function handleDescriptor(target, key, descriptor) {
  descriptor.configurable = false;
  return descriptor;
}

function nonconfigurable() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _privateUtils.decorate)(handleDescriptor, args);
}

module.exports = exports['default'];
},{"./private/utils":16}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = nonenumerable;

var _privateUtils = require('./private/utils');

function handleDescriptor(target, key, descriptor) {
  descriptor.enumerable = false;
  return descriptor;
}

function nonenumerable() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _privateUtils.decorate)(handleDescriptor, args);
}

module.exports = exports['default'];
},{"./private/utils":16}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = override;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _privateUtils = require('./private/utils');

var GENERIC_FUNCTION_ERROR = '{child} does not properly override {parent}';
var FUNCTION_REGEXP = /^function ([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?(\([^\)]*\))[\s\S]+$/;

var SyntaxErrorReporter = (function () {
  _createClass(SyntaxErrorReporter, [{
    key: '_getTopic',
    value: function _getTopic(descriptor) {
      if (descriptor === undefined) {
        return null;
      }

      if ('value' in descriptor) {
        return descriptor.value;
      }

      if ('get' in descriptor) {
        return descriptor.get;
      }

      if ('set' in descriptor) {
        return descriptor.set;
      }
    }
  }, {
    key: '_extractTopicSignature',
    value: function _extractTopicSignature(topic) {
      switch (typeof topic) {
        case 'function':
          return this._extractFunctionSignature(topic);
        default:
          return this.key;
      }
    }
  }, {
    key: '_extractFunctionSignature',
    value: function _extractFunctionSignature(fn) {
      var _this = this;

      return fn.toString().replace(FUNCTION_REGEXP, function (match, name, params) {
        if (name === undefined) name = _this.key;
        return name + params;
      });
    }
  }, {
    key: 'key',
    get: function get() {
      return this.childDescriptor.key;
    }
  }, {
    key: 'parentNotation',
    get: function get() {
      return this.parentKlass.constructor.name + '#' + this.parentPropertySignature;
    }
  }, {
    key: 'childNotation',
    get: function get() {
      return this.childKlass.constructor.name + '#' + this.childPropertySignature;
    }
  }, {
    key: 'parentTopic',
    get: function get() {
      return this._getTopic(this.parentDescriptor);
    }
  }, {
    key: 'childTopic',
    get: function get() {
      return this._getTopic(this.childDescriptor);
    }
  }, {
    key: 'parentPropertySignature',
    get: function get() {
      return this._extractTopicSignature(this.parentTopic);
    }
  }, {
    key: 'childPropertySignature',
    get: function get() {
      return this._extractTopicSignature(this.childTopic);
    }
  }]);

  function SyntaxErrorReporter(parentKlass, childKlass, parentDescriptor, childDescriptor) {
    _classCallCheck(this, SyntaxErrorReporter);

    this.parentKlass = parentKlass;
    this.childKlass = childKlass;
    this.parentDescriptor = parentDescriptor;
    this.childDescriptor = childDescriptor;
  }

  _createClass(SyntaxErrorReporter, [{
    key: 'assert',
    value: function assert(condition) {
      var msg = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

      if (condition !== true) {
        this.error(GENERIC_FUNCTION_ERROR + msg);
      }
    }
  }, {
    key: 'error',
    value: function error(msg) {
      var _this2 = this;

      msg = msg
      // Replace lazily, because they actually might not
      // be available in all cases
      .replace('{parent}', function (m) {
        return _this2.parentNotation;
      }).replace('{child}', function (m) {
        return _this2.childNotation;
      });
      throw new SyntaxError(msg);
    }
  }]);

  return SyntaxErrorReporter;
})();

function getDescriptorType(descriptor) {
  if (descriptor.hasOwnProperty('value')) {
    return 'data';
  }

  if (descriptor.hasOwnProperty('get') || descriptor.hasOwnProperty('set')) {
    return 'accessor';
  }

  // If none of them exist, browsers treat it as
  // a data descriptor with a value of `undefined`
  return 'data';
}

function checkFunctionSignatures(parent, child, reporter) {
  reporter.assert(parent.length === child.length);
}

function checkDataDescriptors(parent, child, reporter) {
  var parentValueType = typeof parent.value;
  var childValueType = typeof child.value;

  if (parentValueType === 'undefined' && childValueType === 'undefined') {
    // class properties can be any expression, which isn't ran until the
    // the instance is created, so we can't reliably get type information
    // for them yet (per spec). Perhaps when Babel includes flow-type info
    // in runtime? Tried regex solutions, but super hacky and only feasible
    // on primitives, which is confusing for usage...
    reporter.error('descriptor values are both undefined. (class properties are are not currently supported)\'');
  }

  if (parentValueType !== childValueType) {
    var isFunctionOverUndefined = childValueType === 'function' && parentValueType === undefined;
    // Even though we don't support class properties, this
    // will still handle more than just functions, just in case.
    // Shadowing an undefined value is an error if the inherited
    // value was undefined (usually a class property, not a method)
    if (isFunctionOverUndefined || parentValueType !== undefined) {
      reporter.error('value types do not match. {parent} is "' + parentValueType + '", {child} is "' + childValueType + '"');
    }
  }

  // Switch, in preparation for supporting more types
  switch (childValueType) {
    case 'function':
      checkFunctionSignatures(parent.value, child.value, reporter);
      break;

    default:
      reporter.error('Unexpected error. Please file a bug with: {parent} is "' + parentValueType + '", {child} is "' + childValueType + '"');
      break;
  }
}

function checkAccessorDescriptors(parent, child, reporter) {
  var parentHasGetter = typeof parent.get === 'function';
  var childHasGetter = typeof child.get === 'function';
  var parentHasSetter = typeof parent.set === 'function';
  var childHasSetter = typeof child.set === 'function';

  if (parentHasGetter || childHasGetter) {
    if (!parentHasGetter && parentHasSetter) {
      reporter.error('{parent} is setter but {child} is getter');
    }

    if (!childHasGetter && childHasSetter) {
      reporter.error('{parent} is getter but {child} is setter');
    }

    checkFunctionSignatures(parent.get, child.get, reporter);
  }

  if (parentHasSetter || childHasSetter) {
    if (!parentHasSetter && parentHasGetter) {
      reporter.error('{parent} is getter but {child} is setter');
    }

    if (!childHasSetter && childHasGetter) {
      reporter.error('{parent} is setter but {child} is getter');
    }

    checkFunctionSignatures(parent.set, child.set, reporter);
  }
}

function checkDescriptors(parent, child, reporter) {
  var parentType = getDescriptorType(parent);
  var childType = getDescriptorType(child);

  if (parentType !== childType) {
    reporter.error('descriptor types do not match. {parent} is "' + parentType + '", {child} is "' + childType + '"');
  }

  switch (childType) {
    case 'data':
      checkDataDescriptors(parent, child, reporter);
      break;

    case 'accessor':
      checkAccessorDescriptors(parent, child, reporter);
      break;
  }
}

var suggestionTransforms = [function (key) {
  return key.toLowerCase();
}, function (key) {
  return key.toUpperCase();
}, function (key) {
  return key + 's';
}, function (key) {
  return key.slice(0, -1);
}, function (key) {
  return key.slice(1, key.length);
}];

function findPossibleAlternatives(superKlass, key) {
  for (var i = 0, l = suggestionTransforms.length; i < l; i++) {
    var fn = suggestionTransforms[i];
    var suggestion = fn(key);

    if (suggestion in superKlass) {
      return suggestion;
    }
  }

  return null;
}

function handleDescriptor(target, key, descriptor) {
  descriptor.key = key;
  var superKlass = Object.getPrototypeOf(target);
  var superDescriptor = Object.getOwnPropertyDescriptor(superKlass, key);
  var reporter = new SyntaxErrorReporter(superKlass, target, superDescriptor, descriptor);

  if (superDescriptor === undefined) {
    var suggestedKey = findPossibleAlternatives(superKlass, key);
    var suggestion = suggestedKey ? '\n\n  Did you mean "' + suggestedKey + '"?' : '';
    reporter.error('No descriptor matching {child} was found on the prototype chain.' + suggestion);
  }

  checkDescriptors(superDescriptor, descriptor, reporter);

  return descriptor;
}

function override() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _privateUtils.decorate)(handleDescriptor, args);
}

module.exports = exports['default'];
},{"./private/utils":16}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var _slice = Array.prototype.slice;

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

exports.isDescriptor = isDescriptor;
exports.decorate = decorate;
exports.metaFor = metaFor;
exports.getOwnPropertyDescriptors = getOwnPropertyDescriptors;
exports.createDefaultSetter = createDefaultSetter;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

var _lazyInitialize = require('../lazy-initialize');

var _lazyInitialize2 = _interopRequireDefault(_lazyInitialize);

var defineProperty = Object.defineProperty;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;

function isDescriptor(desc) {
  if (!desc || !desc.hasOwnProperty) {
    return false;
  }

  var keys = ['value', 'initializer', 'get', 'set'];

  for (var i = 0, l = keys.length; i < l; i++) {
    if (desc.hasOwnProperty(keys[i])) {
      return true;
    }
  }

  return false;
}

function decorate(handleDescriptor, entryArgs) {
  if (isDescriptor(entryArgs[entryArgs.length - 1])) {
    return handleDescriptor.apply(undefined, _toConsumableArray(entryArgs).concat([[]]));
  } else {
    return function () {
      return handleDescriptor.apply(undefined, _slice.call(arguments).concat([entryArgs]));
    };
  }
}

var Meta = (function () {
  var _instanceInitializers = {};

  function Meta() {
    _classCallCheck(this, Meta);

    _defineDecoratedPropertyDescriptor(this, 'debounceTimeoutIds', _instanceInitializers);

    _defineDecoratedPropertyDescriptor(this, 'throttleTimeoutIds', _instanceInitializers);

    _defineDecoratedPropertyDescriptor(this, 'throttlePreviousTimestamps', _instanceInitializers);

    _defineDecoratedPropertyDescriptor(this, 'throttleTrailingArgs', _instanceInitializers);
  }

  _createDecoratedClass(Meta, [{
    key: 'debounceTimeoutIds',
    decorators: [_lazyInitialize2['default']],
    initializer: function initializer() {
      return {};
    },
    enumerable: true
  }, {
    key: 'throttleTimeoutIds',
    decorators: [_lazyInitialize2['default']],
    initializer: function initializer() {
      return {};
    },
    enumerable: true
  }, {
    key: 'throttlePreviousTimestamps',
    decorators: [_lazyInitialize2['default']],
    initializer: function initializer() {
      return {};
    },
    enumerable: true
  }, {
    key: 'throttleTrailingArgs',
    decorators: [_lazyInitialize2['default']],
    initializer: function initializer() {
      return null;
    },
    enumerable: true
  }], null, _instanceInitializers);

  return Meta;
})();

var META_KEY = typeof Symbol === 'function' ? Symbol('__core_decorators__') : '__core_decorators__';

function metaFor(obj) {
  if (obj.hasOwnProperty(META_KEY) === false) {
    defineProperty(obj, META_KEY, {
      // Defaults: NOT enumerable, configurable, or writable
      value: new Meta()
    });
  }

  return obj[META_KEY];
}

var getOwnKeys = getOwnPropertySymbols ? function (object) {
  return getOwnPropertyNames(object).concat(getOwnPropertySymbols(object));
} : getOwnPropertyNames;

exports.getOwnKeys = getOwnKeys;

function getOwnPropertyDescriptors(obj) {
  var descs = {};

  getOwnKeys(obj).forEach(function (key) {
    return descs[key] = getOwnPropertyDescriptor(obj, key);
  });

  return descs;
}

function createDefaultSetter(key) {
  return function set(newValue) {
    Object.defineProperty(this, key, {
      configurable: true,
      writable: true,
      // IS enumerable when reassigned by the outside word
      enumerable: true,
      value: newValue
    });

    return newValue;
  };
}
},{"../lazy-initialize":10}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = readonly;

var _privateUtils = require('./private/utils');

function handleDescriptor(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

function readonly() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _privateUtils.decorate)(handleDescriptor, args);
}

module.exports = exports['default'];
},{"./private/utils":16}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = suppressWarnings;

var _privateUtils = require('./private/utils');

function suppressedWarningNoop() {
  // Warnings are currently suppressed via @suppressWarnings
}

function applyWithoutWarnings(context, fn, args) {
  if (typeof console === 'object') {
    var nativeWarn = console.warn;
    console.warn = suppressedWarningNoop;
    var ret = fn.apply(context, args);
    console.warn = nativeWarn;
    return ret;
  } else {
    return fn.apply(context, args);
  }
}

function handleDescriptor(target, key, descriptor) {
  return _extends({}, descriptor, {
    value: function suppressWarningsWrapper() {
      return applyWithoutWarnings(this, descriptor.value, arguments);
    }
  });
}

function suppressWarnings() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _privateUtils.decorate)(handleDescriptor, args);
}

module.exports = exports['default'];
},{"./private/utils":16}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = throttle;

var _privateUtils = require('./private/utils');

var DEFAULT_TIMEOUT = 300;

function handleDescriptor(target, key, descriptor, _ref) {
  var _ref2 = _slicedToArray(_ref, 2);

  var _ref2$0 = _ref2[0];
  var wait = _ref2$0 === undefined ? DEFAULT_TIMEOUT : _ref2$0;
  var _ref2$1 = _ref2[1];
  var options = _ref2$1 === undefined ? {} : _ref2$1;

  var callback = descriptor.value;

  if (typeof callback !== 'function') {
    throw new SyntaxError('Only functions can be throttled');
  }

  if (options.leading !== false) {
    options.leading = true;
  }

  if (options.trailing !== false) {
    options.trailing = true;
  }

  return _extends({}, descriptor, {
    value: function value() {
      var _this = this;

      var meta = (0, _privateUtils.metaFor)(this);
      var throttleTimeoutIds = meta.throttleTimeoutIds;
      var throttlePreviousTimestamps = meta.throttlePreviousTimestamps;

      var timeout = throttleTimeoutIds[key];
      // last execute timestamp
      var previous = throttlePreviousTimestamps[key] || 0;
      var now = Date.now();

      if (options.trailing) {
        meta.throttleTrailingArgs = arguments;
      }

      // if first be called and disable the execution on the leading edge
      // set last execute timestamp to now
      if (!previous && options.leading === false) {
        previous = now;
      }

      var remaining = wait - (now - previous);

      if (remaining <= 0) {
        clearTimeout(timeout);
        delete throttleTimeoutIds[key];
        throttlePreviousTimestamps[key] = now;
        callback.apply(this, arguments);
      } else if (!timeout && options.trailing) {
        throttleTimeoutIds[key] = setTimeout(function () {
          throttlePreviousTimestamps[key] = options.leading === false ? 0 : Date.now();
          delete throttleTimeoutIds[key];
          callback.apply(_this, meta.throttleTrailingArgs);
          // don't leak memory!
          meta.throttleTrailingArgs = null;
        }, remaining);
      }
    }
  });
}

function throttle() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _privateUtils.decorate)(handleDescriptor, args);
}

module.exports = exports['default'];
},{"./private/utils":16}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = time;

var _privateUtils = require('./private/utils');

var labels = {};

// Exported for mocking in tests
var defaultConsole = {
  time: console.time ? console.time.bind(console) : function (label) {
    labels[label] = new Date();
  },
  timeEnd: console.timeEnd ? console.timeEnd.bind(console) : function (label) {
    var timeNow = new Date();
    var timeTaken = timeNow - labels[label];
    delete labels[label];
    console.log(label + ': ' + timeTaken + 'ms');
  }
};

exports.defaultConsole = defaultConsole;
var count = 0;

function handleDescriptor(target, key, descriptor, _ref) {
  var _ref2 = _slicedToArray(_ref, 2);

  var _ref2$0 = _ref2[0];
  var prefix = _ref2$0 === undefined ? null : _ref2$0;
  var _ref2$1 = _ref2[1];
  var console = _ref2$1 === undefined ? defaultConsole : _ref2$1;

  var fn = descriptor.value;

  if (prefix === null) {
    prefix = target.constructor.name + '.' + key;
  }

  if (typeof fn !== 'function') {
    throw new SyntaxError('@time can only be used on functions, not: ' + fn);
  }

  return _extends({}, descriptor, {
    value: function value() {
      var label = prefix + '-' + count;
      count++;
      console.time(label);

      try {
        return fn.apply(this, arguments);
      } finally {
        console.timeEnd(label);
      }
    }
  });
}

function time() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _privateUtils.decorate)(handleDescriptor, args);
}
},{"./private/utils":16}],21:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _dec2, _class2, _dec3, _dec4, _class3, _dec5, _class4; //Parei em => https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Advanced_animations

var _WElement = require('./elements/WElement');

var _WElement2 = _interopRequireDefault(_WElement);

var _InjectionPool = require('./util/InjectionPool');

var _InjectionPool2 = _interopRequireDefault(_InjectionPool);

var _WDInject = require('./util/WDInject');

var _World = require('./world/World');

var _World2 = _interopRequireDefault(_World);

var _WImage = require('./elements/WImage');

var _WImage2 = _interopRequireDefault(_WImage);

var _WCanvas = require('./elements/WCanvas');

var _WCanvas2 = _interopRequireDefault(_WCanvas);

var _WType = require('./enums/WType');

var _WType2 = _interopRequireDefault(_WType);

var _WBallon = require('./reusable_objects/WBallon');

var _WBallon2 = _interopRequireDefault(_WBallon);

var _WHeart = require('./reusable_objects/WHeart');

var _WHeart2 = _interopRequireDefault(_WHeart);

var _WClockOne = require('./reusable_objects/WClockOne');

var _WClockOne2 = _interopRequireDefault(_WClockOne);

var _WBall = require('./reusable_objects/WBall');

var _WBall2 = _interopRequireDefault(_WBall);

var _WBallShadow = require('./reusable_objects/WBallShadow');

var _WBallShadow2 = _interopRequireDefault(_WBallShadow);

var _WMoveRandomOne = require('./events/WMoveRandomOne');

var _WMoveRandomOne2 = _interopRequireDefault(_WMoveRandomOne);

var _WFallMove = require('./events/WFallMove');

var _WFallMove2 = _interopRequireDefault(_WFallMove);

var _WMouseFollow = require('./events/WMouseFollow');

var _WMouseFollow2 = _interopRequireDefault(_WMouseFollow);

var _WMimeType = require('./enums/WMimeType');

var _WMimeType2 = _interopRequireDefault(_WMimeType);

var _WCanvasQuality = require('./enums/WCanvasQuality');

var _WCanvasQuality2 = _interopRequireDefault(_WCanvasQuality);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// @Injectable : Indica que a classe é injetável
// @Inject(Lista de Injeções) : Lista de injeções a serem feitas
// 
var Teste1 = (_dec = (0, _WDInject.Injectable)(), _dec(_class = function () {
    function Teste1() {
        _classCallCheck(this, Teste1);

        console.log("Classe 1 = Construiu");
    }

    _createClass(Teste1, [{
        key: 'method',
        value: function method(ola) {
            console.log(ola);
        }
    }, {
        key: 'testegetter',
        get: function get() {
            return "Classe 1 = Teste do Getter";
        }
    }]);

    return Teste1;
}()) || _class);
var Teste2 = (_dec2 = (0, _WDInject.Injectable)(), _dec2(_class2 = function () {
    function Teste2() {
        _classCallCheck(this, Teste2);

        console.log("Classe 2 = Construiu");
    }

    _createClass(Teste2, [{
        key: 'teste2getter',
        get: function get() {
            return "Classe 2 = Teste do Getter - Classe 2";
        }
    }]);

    return Teste2;
}()) || _class2);
var TesteInject = (_dec3 = (0, _WDInject.Injectable)(), _dec4 = (0, _WDInject.Inject)('Teste1', 'Teste2'), _dec3(_class3 = _dec4(_class3 = function TesteInject() {
    _classCallCheck(this, TesteInject);

    console.log(this.Teste1.testegetter);
    console.log(this.Teste2.teste2getter);
    console.log('iniciou e injetou tudo');
}) || _class3) || _class3);


console.log('Pool de Injeções: ', _InjectionPool2.default.list());
var load = (_dec5 = InjectLoader('TesteInject'), _dec5(_class4 = function load() {
    _classCallCheck(this, load);

    console.log('Iniciou todas, inclusive eu =D');
}) || _class4);

},{"./elements/WCanvas":22,"./elements/WElement":23,"./elements/WImage":24,"./enums/WCanvasQuality":25,"./enums/WMimeType":26,"./enums/WType":27,"./events/WFallMove":28,"./events/WMouseFollow":29,"./events/WMoveRandomOne":30,"./reusable_objects/WBall":31,"./reusable_objects/WBallShadow":32,"./reusable_objects/WBallon":33,"./reusable_objects/WClockOne":34,"./reusable_objects/WHeart":35,"./util/InjectionPool":36,"./util/WDInject":37,"./world/World":38}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WElement2 = require('./WElement');

var _WElement3 = _interopRequireDefault(_WElement2);

var _WType = require('../enums/WType');

var _WType2 = _interopRequireDefault(_WType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Emulate the Canvas element with features
 * @class
 */
var WCanvas = function (_WElement) {
    _inherits(WCanvas, _WElement);

    function WCanvas() {
        _classCallCheck(this, WCanvas);

        var _this = _possibleConstructorReturn(this, (WCanvas.__proto__ || Object.getPrototypeOf(WCanvas)).call(this, 'canvas'));

        _this._context = _this.context2D;
        _this.element.id = "canvas";
        return _this;
    }

    _createClass(WCanvas, [{
        key: 'setGlobalCompositeOperation',

        /**
         * Sets or returns how a source (new) image are drawn onto a destination (existing) image.
         * @param {WGlobalCompositeOperation} globalCompositeOperation	globalCompositeOperation to set
         */
        value: function setGlobalCompositeOperation(globalCompositeOperation) {
            this.globalCompositeOperation = globalCompositeOperation;
            return this;
        }
        /**
         * Sets or returns the current alpha or transparency value of the drawing.
         * @param {number} globalAlpha	globalAlpha to set
         */

    }, {
        key: 'setGlobalAlpha',
        value: function setGlobalAlpha(globalAlpha) {
            this.globalAlpha = globalAlpha;
            return this;
        }
        /**
         * Method returns an object that contains the width of the specified text, in pixels.
         * @param {string} text	The text to be measured
         * @returns {string}
         */

    }, {
        key: 'fillText',
        value: function fillText(text) {
            return this.context.measureText(text);
        }
        /**
         * Method draws filled text on the canvas. The default color of the text is black.
         * @param {string} text	Specifies the text that will be written on the canvas
         * @param {number} x	The x coordinate where to start painting the text (relative to the canvas)
         * @param {number} y	The y coordinate where to start painting the text (relative to the canvas)
         * @param {number} maxWidth	Optional. The maximum allowed width of the text, in pixels
         */

    }, {
        key: 'fillText',
        value: function fillText(text, x, y, maxWidth) {
            this.context.fillText(text, x, y, maxWidth);
            return this;
        }
        /**
         * Method draws text (with no fill) on the canvas. The default color of the text is black.
         * @param {string} text	Specifies the text that will be written on the canvas
         * @param {number} x	The x coordinate where to start painting the text (relative to the canvas)
         * @param {number} y	The y coordinate where to start painting the text (relative to the canvas)
         * @param {number} maxWidth	Optional. The maximum allowed width of the text, in pixels
         */

    }, {
        key: 'strokeText',
        value: function strokeText(text, x, y, maxWidth) {
            this.context.strokeText(text, x, y, maxWidth);
            return this;
        }
        /**
         * The textBaseline property sets or returns the current text baseline used when drawing text.
         * @param {WTextBaseline} textBaseline	textBaseline to set
         */

    }, {
        key: 'setTextBaseline',
        value: function setTextBaseline(textBaseline) {
            this.textBaseline = textBaseline;
            return this;
        }
        /**
         * The textAlign property sets or returns the current alignment for text content, according to the anchor point.
         * @param {WTextAlign} textAlign	TextAlign to set
         */

    }, {
        key: 'setTextAlign',
        value: function setTextAlign(textAlign) {
            this.textAlign = textAlign;
            return this;
        }
        /**
         * The font property sets or returns the current font properties for text content on the canvas.
         * @param {string} font	Font to select
         */

    }, {
        key: 'setFont',
        value: function setFont(font) {
            this.font = font;
            return this;
        }
        /**
         * Method returns true if the specified point is in the current path, otherwise false.
         * @param {x} x	The x-coordinate to test
         * @param {y} y	The y-coordinate to test
         */

    }, {
        key: 'isPointInPath',
        value: function isPointInPath(x, y) {
            return this.context.isPointInPath(x, y);
        }
        /**
         * The miterLimit property sets or returns the style of the end caps for a line.
         * @param {number} miterLimit	A positive number that specifies the maximum miter length. If the current miter length exceeds the miterLimit, the corner will display as lineJoin "bevel"
         */

    }, {
        key: 'setMiterLimit',
        value: function setMiterLimit(miterLimit) {
            this.miterLimit = miterLimit;
            return this;
        }
        /**
         * The lineWidth property sets or returns the style of the end caps for a line.
         * @param {number} lineWidth	Specifies the lineWidth
         */

    }, {
        key: 'setLineWidth',
        value: function setLineWidth(lineWidth) {
            this.lineWidth = lineWidth;
            return this;
        }
        /**
         * The lineJoin property sets or returns the style of the end caps for a line.
         * @param {WLineJoin} lineJoin	Specifies the lineJoin
         */

    }, {
        key: 'setLineJoin',
        value: function setLineJoin(lineJoin) {
            this.lineJoin = lineJoin;
            return this;
        }
        /**
         * The lineCap property sets or returns the style of the end caps for a line.
         * @param {WLineCap} lineCap	Specifies the lineCap
         */

    }, {
        key: 'setLineCap',
        value: function setLineCap(lineCap) {
            this.lineCap = lineCap;
            return this;
        }
        /**
         * Method repeats the specified element in the specified direction.
         * @param {Object} image	Specifies the image, canvas, or video element of the pattern to use	 
         * @param {WRepeat} repeat	Default. The pattern repeats
         */

    }, {
        key: 'createPattern',
        value: function createPattern(image, repeat) {
            this.context.createPattern(image, repeat);
            return this;
        }
        /**
         * Method specifies the colors and position in a gradient object.
         * @param {number} stop	A value between 0.0 and 1.0 that represents the position between start and end in a gradient
         * @param {string} color A CSS color value to display at the stop position
         */

    }, {
        key: 'addColorStop',
        value: function addColorStop(stop, color) {
            this.context.addColorStop(stop, color);
            return this;
        }
        /**
         * Method creates a radial gradient object.
         * @param {number} x0 The x-coordinate of the start point of the gradient
         * @param {number} y0 The y-coordinate of the start point of the gradient
         * @param {number} r0 The radius of the gradient
         * @param {number} x1 The x-coordinate of the end point of the gradient
         * @param {number} y1 The y-coordinate of the end point of the gradient
         * @param {number} r1 The radius of the gradient
         */

    }, {
        key: 'createRadialGradient',
        value: function createRadialGradient(x0, y0, r0, x1, y1, r1) {
            this.context.createRadialGradient(x0, y0, r0, x1, y1, r1);
            return this;
        }
        /**
         * Method creates a linear gradient object.
         * @param {number} x0 The x-coordinate of the start point of the gradient
         * @param {number} y0 The y-coordinate of the start point of the gradient
         * @param {number} x1 The x-coordinate of the end point of the gradient
         * @param {number} y1 The y-coordinate of the end point of the gradient
         */

    }, {
        key: 'createLinearGradient',
        value: function createLinearGradient(x0, y0, x1, y1) {
            this.context.createLinearGradient(x0, y0, x1, y1);
            return this;
        }
        /**
         * Set strokeStyle of context
         * @param {Color} strokeStyle Offset of shadow blur
         */

    }, {
        key: 'setStrokeStyle',
        value: function setStrokeStyle(strokeStyle) {
            this.strokeStyle = strokeStyle;
            return this;
        }
        /**
         * Set shadowColor of context
         * @param {Color} shadowColor Offset of shadow blur
         */

    }, {
        key: 'setShadowColor',
        value: function setShadowColor(shadowColor) {
            this.shadowColor = shadowColor;
            return this;
        }
        /**
         * Set Shadow of context
         * @param {number} offset Offset of shadow blur
         */

    }, {
        key: 'setShadowBlur',
        value: function setShadowBlur(offset) {
            this.shadowBlur = offset;
            return this;
        }
        /**
         * Set X-Shadow of context
         * @param {number} offset Offset of shadow blur
         */

    }, {
        key: 'setShadowBlurX',
        value: function setShadowBlurX(offset) {
            this.shadowOffsetX = offset;
            return this;
        }
        /**
         * Set Y-Shadow of context
         * @param {number} offset Offset of shadow blur
         */

    }, {
        key: 'setShadowBlurY',
        value: function setShadowBlurY(offset) {
            this.shadowOffsetY = offset;
            return this;
        }
        /**
         * Saves the state of the current context
         */

    }, {
        key: 'save',
        value: function save() {
            this.context.save();
            return this;
        }
        /**
         * Previously saved path state and attributes
         */

    }, {
        key: 'restore',
        value: function restore() {
            this.context.restore();
            return this;
        }
        /**
         * Remaps the (x,y) position on the canvas
         * @param {number} x Eixo X
         * @param {number} y Eixo Y
         * @return {this}
         */

    }, {
        key: 'translate',
        value: function translate(x, y) {
            this.context.translate(x, y);
            return this;
        }
        /**
         * Scale the (x,y) position on the canvas
         * @param {number} x  Eixo X
         * @param {number} y  Eixo Y
         * @return {this}
         */

    }, {
        key: 'scale',
        value: function scale(x, y) {
            this.context.scale(x, y);
            return this;
        }
        /**
         * Rotate the (x,y) position on the canvas
         * @param {number} angle Ângulo
         * @return {this}
         */

    }, {
        key: 'rotate',
        value: function rotate(angle) {
            this.context.rotate(angle);
            return this;
        }
        /**
         * Replaces the current transformation matrix for the drawing
         * @param {number} a Horizontal scaling
         * @param {number} b Horizontal skewing
         * @param {number} c Vertical skewing
         * @param {number} d Vertical scaling
         * @param {number} e Horizontal moving
         * @param {number} f Vertical moving
         */

    }, {
        key: 'transform',
        value: function transform(a, b, c, d, e, f) {
            this.context.transform(a, b, c, d, e, f);
            return this;
        }
        /**
         * Resets the current transform to the identity matrix. Then runs 
         * @param {number} a Horizontal scaling
         * @param {number} b Horizontal skewing
         * @param {number} c Vertical skewing
         * @param {number} d Vertical scaling
         * @param {number} e Horizontal moving
         * @param {number} f Vertical moving
         */

    }, {
        key: 'setTransform',
        value: function setTransform(a, b, c, d, e, f) {
            this.context.setTransform(a, b, c, d, e, f);
            return this;
        }
        /**
         * Resets the current transform to 0
         */

    }, {
        key: 'resetTransform',
        value: function resetTransform() {
            this.context.resetTransform();
            return this;
        }
        /**
         * Clips a region of any shape and size from the original canvas
         */

    }, {
        key: 'clip',
        value: function clip() {
            this.context.clip();
            return this;
        }
        /**
         * 	Sets or returns the color, gradient, or pattern used to fill the drawing
         * @param {style} color CSS   Color value that indicates the fill color of the drawing. Default value is #000000 
         */

    }, {
        key: 'fillStyle',
        value: function fillStyle(color) {
            this.context.fillStyle = color;
            return this;
        }
        /**
         * The method creates a rectangle.
         * @param {number} x	     The x-coordinate of the upper-left corner of the rectangle
         * @param {number} y	     The y-coordinate of the upper-left corner of the rectangle
         * @param {number} width	 The width of the rectangle, in pixels
         * @param {number} height The height of the rectangle, in pixels
         */

    }, {
        key: 'drawRect',
        value: function drawRect(x, y, width, height) {
            this.context.rect(x, y, width, height);
        }
        /**
         * The method creates a Line.
         * @param {number} beginX  The begin of x-coordninate
         * @param {number} beginY  The begin of y-coordinate
         * @param {number} endX    The end x of Line
         * @param {number} endY    The end y of the Line
         */

    }, {
        key: 'drawLine',
        value: function drawLine(beginX, beginY, endX, endY) {
            this.moveTo(beginX, beginY);
            this.lineTo(endX, endY);
            this.stroke();
            return this;
        }
        /**
         * Draw a Square
         * @param {number} x begin of square
         * @param {number} y end of square
         * @param {number} width width of square
         * @param {number} height height of square
         * @param {WType} type type of rect
         */

    }, {
        key: 'drawSquare',
        value: function drawSquare(x, y, width, height, type) {
            switch (type) {
                case _WType2.default.STROKE:
                    this.strokeRect(x, y, width, height, type);
                    break;
                case _WType2.default.CLEAR:
                    this.clearRect(x, y, width, height, type);
                    break;
                default:
                    this.fillRect(x, y, width, height, type);
            }
            return this;
        }
        /**
         * Draw a tringle
         * @param {number} x Indicates the initial x-position
         * @param {number} y Indicates the initial y-position
         * @param {number} x1 Indicates the x left side
         * @param {number} y1 Indicates the y left side
         * @param {number} x2 Indicates the x right side
         * @param {number} y2 Indicates the y right side
         * @param {WType} type Type of rect
         */

    }, {
        key: 'drawTriangle',
        value: function drawTriangle(x, y, x1, y1, x2, y2, type) {
            this.beginPath();
            this.moveTo(x, y);
            this.lineTo(x1, y1);
            this.lineTo(x2, y2);

            switch (type) {
                case _WType2.default.STROKE:
                    this.stroke();
                    break;
                case _WType2.default.CLEAR:
                    this.clear();
                    break;
                default:
                    this.fill();
            }
            return this;
        }
        /**
         * Draw a tringle by dimension
         * @param {number} x Indicates the initial x-position
         * @param {number} y Indicates the initial y-position
         * @param {number} dimension Indicates the dimension
         * @param {WType} type Type of rect
         */

    }, {
        key: 'drawTriangleByDimension',
        value: function drawTriangleByDimension(x, y, dimension, type) {
            this.beginPath();
            this.moveTo(x, y);
            this.lineTo(x - dimension, y + dimension);
            this.lineTo(x + dimension, y + dimension);

            switch (type) {
                case _WType2.default.STROKE:
                    this.stroke();
                    break;
                case _WType2.default.CLEAR:
                    this.clear();
                    break;
                default:
                    this.fill();
            }
            return this;
        }
        /**
         * Draw a image
         * @param {Image} image Image to rendering
         * @param {number} x x-coordinate
         * @param {number} y y-coordinate
         */

    }, {
        key: 'drawImage',
        value: function drawImage(image, x, y) {
            this.context.drawImage(image, x, y);
            return this;
        }
        /**
         * Draw a image
         * @param {Image} image Image to rendering
         * @param {number} sx x-coordinate
         * @param {number} sy y-coordinate
         */

    }, {
        key: 'drawFullImage',
        value: function drawFullImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
            this.context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            return this;
        }
        /**
         * Create zoom of canvas in other canvas
         * @param {number} zoomX zomm x-coordinate
         * @param {number} zoomY zomm y-coordinate
         * @param {WCanvas} destiny Canvas destination
         * @param {number} destinyX Canvas destination x-coordinate
         * @param {number} destinyY Canvas destination y-coordinate
         * @param {number} originWidth Canvas Origin width
         * @param {number} originHeight Canvas Origin height
         * @param {number} destinyWidth Canvas destination width
         * @param {number} destinyHeight Canvas destination height
         * @param {boolean} smoothing anti-aliasing of zoom image
         */

    }, {
        key: 'zoomImage',
        value: function zoomImage(zoomX, zoomY, destiny, destinyX, destinyY, originWidth, originHeight, destinyWidth, destinyHeight, smoothing) {
            destiny.clearRect(0, 0, destiny.element.width, destiny.element.height);
            if (smoothing) destiny.setImageSmoothingEnabled(true);else destiny.setImageSmoothingEnabled(false);
            destiny.drawImage(this.element, Math.abs(destinyX - 10), Math.abs(destinyY - 5), zoomX, zoomY, originWidth, originHeight, destinyWidth, destinyHeight);
        }
        /**
         * Create a image
         * @param {string} url Location of image
         * @param {number} x x-coordinate
         * @param {number} y y-coordinate
         * @param {function} callback Callback function to invokes of load the image 
         */

    }, {
        key: 'createImage',
        value: function createImage(url, x, y, callback) {
            var $this = this;
            var img = new Image();
            img.src = url;
            img.onload = function () {
                $this.context.drawImage(img, x, y);
                img.style.display = 'none';
                if (callback) {
                    callback(img);
                }
                return this;
            };
            // return tColor(image,x,y)this
        }
        /**
         * @param {number} x x-coordinate
         * @param {number} y y-coordinate
         * @param {number} width Size on x-coordinate
         * @param {number} height Size on y-coordinate
         * @return {ImageData}
         */

    }, {
        key: 'getImageData',
        value: function getImageData(x, y, width, height) {
            return this.context.getImageData(x, y, width, height);
        }
        /**
         * Put the image data on location
         * @param {ImageData} imageData ImageData to put
         * @param {number} x x-coordinate
         * @param {number} y y-coordinate
         * @return {ImageData} 
         */

    }, {
        key: 'putImageData',
        value: function putImageData(imageData, x, y) {
            return this.context.putImageData(imageData, x, y);
        }
        /**
         * Get string rgba from imageData
         * @param {ImageData} imageData ImageData to get rgba
         * @return {string} RGBA
         */
        //@TODO Fazer uma classe Rgba com métodos get de r g b a, e um que retorna tudo

    }, {
        key: 'getImageDataRGBA',
        value: function getImageDataRGBA(imageData) {
            return 'rgba(' + imageData.data[0] + ',' + imageData.data[1] + ',' + imageData.data[2] + ',' + imageData.data[3] / 255 + ')';
        }
        /**
         * Get string rgba from params
         * @param {number} r Red
         * @param {number} g Green
         * @param {number} b Blue
         * @param {number} a Opacity
         * @return {string} RGBA
         */

    }, {
        key: 'stringRGBA',
        value: function stringRGBA(r, g, b, a) {
            return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        }
        /**
         * Method returns a data URI containing a representation of the image in the format specified by the type parameter.
         * Defaults to PNG
         * The returned image is in a resolution of 96 dpi.
         * @param {WMimeType} type Type of DataUrl
         * @param {WCanvasQuality} quality Quality of DataUrl 
         */

    }, {
        key: 'toDataURL',
        value: function toDataURL(type, quality) {
            var dataUrl = this.element.toDataURL(type, quality);
            return dataUrl;
        }
        /**
         * Method creates a Blob object representing the image contained in the canvas
         * @param {function} callback Function of callback to onload Blob
         * @param {WMimeType} type Type of Blob
         * @param {WCanvasQuality} quality Quality of Blob 
         */

    }, {
        key: 'toBlob',
        value: function toBlob(callback, type, quality) {
            var toBlob = this.element.toDataURL(callback, type, quality);
            return toBlob;
        }
        /**
         * Invert color of ImageData
         * @param {ImageData} imageData ImageData to invert color
         * @param {number} x x-coordinate
         * @param {number} y y-coordinate
         */

    }, {
        key: 'invertColor',
        value: function invertColor(imageData, x, y) {
            var data = imageData.data;
            for (var i = 0; i < data.length; i += 4) {
                data[i] = 255 - data[i];
                data[i + 1] = 255 - data[i + 1];
                data[i + 2] = 255 - data[i + 2];
            }
            this.putImageData(imageData, x, y);
            return this;
        }
        /**
         * Invert Canvas Color
         */

    }, {
        key: 'invertCanvasColor',
        value: function invertCanvasColor() {
            var imageData = this.getImageData(0, 0, this.element.width, this.element.height);
            this.invertColor(imageData, 0, 0);
            return this;
        }
        /**
         * Grayscale color of ImageData
         * @param {ImageData} imageData ImageData to grayscale color
         * @param {number} x x-coordinate
         * @param {number} y y-coordinate
         */

    }, {
        key: 'grayscaleColor',
        value: function grayscaleColor(imageData, x, y) {
            var data = imageData.data;
            for (var i = 0; i < data.length; i += 4) {
                var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = avg; //red
                data[i + 1] = avg; //green
                data[i + 2] = avg; //blue
            }
            this.putImageData(imageData, x, y);
            return this;
        }
        /**
         * Grayscale color
         */

    }, {
        key: 'grayscaleCanvasColor',
        value: function grayscaleCanvasColor() {
            var imageData = this.getImageData(0, 0, this.element.width, this.element.height);
            this.grayscaleColor(imageData, 0, 0);
            return this;
        }
        /**
         * Draws a "filled" rectangle
         * @param {number} x	    The x-coordinate of the upper-left corner of the rectangle
         * @param {number} y	    The y-coordinate of the upper-left corner of the rectangle
         * @param {number} width	The width of the rectangle, in pixels
         * @param {number} height	The height of the rectangle, in pixels
         * @param {WType} type      Type of Rect
         */

    }, {
        key: 'fillRect',
        value: function fillRect(x, y, width, height, type) {
            this.context.fillRect(x, y, width, height, type);
            return this;
        }
        /**
         * Clear a rectangle
         * @param {number} x	    The x-coordinate of the upper-left corner of the rectangle
         * @param {number} y	    The y-coordinate of the upper-left corner of the rectangle
         * @param {number} width	The width of the rectangle, in pixels
         * @param {number} height	The height of the rectangle, in pixels
         * @param {WType} type      Type of Rect
         */

    }, {
        key: 'clearRect',
        value: function clearRect(x, y, width, height, type) {
            this.context.clearRect(x, y, width, height, type);
            return this;
        }
        /**
         * Stroke a rectangle
         * @param {number} x	    The x-coordinate of the upper-left corner of the rectangle
         * @param {number} y	    The y-coordinate of the upper-left corner of the rectangle
         * @param {number} width	The width of the rectangle, in pixels
         * @param {number} height	The height of the rectangle, in pixels
         * @param {WType} type      Type of Rect
         */

    }, {
        key: 'strokeRect',
        value: function strokeRect(x, y, width, height, type) {
            this.context.strokeRect(x, y, width, height, type);
            return this;
        }
        /**
         * Creates an arc/curve (used to create circles, or parts of circles)
         * @param {number} x	            The x-coordinate of the center of the circle
         * @param {number} y        	    The y-coordinate of the center of the circle
         * @param {number} radius	            The radius of the circle
         * @param {number} startAngle  	The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)
         * @param {number} endAngle	    The ending angle, in radians
         * @param {number} anticlockwise	Optional. Specifies whether the drawing should be counterclockwise or clockwise.
         */

    }, {
        key: 'arc',
        value: function arc(x, y, radius, startAngle, endAngle, anticlockwise) {
            this.context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
            return this;
        }
        /**
         * Creates a quadratic Bézier curve
         * @param {number} cp1x	The x-coordinate of the Bézier control point
         * @param {number} cp1y	The y-coordinate of the Bézier control point
         * @param {number} x	The x-coordinate of the ending point
         * @param {number} y	The y-coordinate of the ending point
         */

    }, {
        key: 'quadraticCurveTo',
        value: function quadraticCurveTo(cp1x, cp1y, x, y) {
            this.context.quadraticCurveTo(cp1x, cp1y, x, y);
            return this;
        }
        /**
        * Creates a cubic Bézier curve
        * @param {number} cp1x	The x-coordinate of the first Bézier control point
        * @param {number} cp1y	The y-coordinate of the first Bézier control point
        * @param {number} cp2x	The x-coordinate of the second Bézier control point
        * @param {number} cp2y	The y-coordinate of the second Bézier control point
        * @param {number} x	The x-coordinate of the ending point
        * @param {number} y	The y-coordinate of the ending point
        */

    }, {
        key: 'bezierCurveTo',
        value: function bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
            this.context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
            return this;
        }
        /**
         * Set Smoothing configuration enable
         * @param {boolean} imageSmoothingEnabled Enabled or disable the configuration
         */

    }, {
        key: 'setImageSmoothingEnabled',
        value: function setImageSmoothingEnabled(imageSmoothingEnabled) {
            this.imageSmoothingEnabled = imageSmoothingEnabled;
            return this;
        }

        /**
         * Adds a new point and creates a line to that point from the last specified point in the canvas
         * @param {number} x x-coordinate
         * @param {number} y y-coordinate
         */

    }, {
        key: 'lineTo',
        value: function lineTo(x, y) {
            this.context.lineTo(x, y);
            return this;
        }
        /**
         * Moves the path to the specified point in the canvas, without creating a line
         * @param {number} x x-coordinate
         * @param {number} y y-coordinate
         */

    }, {
        key: 'moveTo',
        value: function moveTo(x, y) {
            this.context.moveTo(x, y);
            return this;
        }
        /**
         * Begins a path, or resets the current path
         */

    }, {
        key: 'beginPath',
        value: function beginPath() {
            this.context.beginPath();
            return this;
        }
        /**
         * Creates a path from the current point back to the starting point
         */

    }, {
        key: 'closePath',
        value: function closePath() {
            this.context.closePath();
            return this;
        }
        /**
         * Actually draws the path you have defined
         */

    }, {
        key: 'stroke',
        value: function stroke() {
            this.context.stroke();
            return this;
        }
        /**
         * Fills the current drawing (path)
         */

    }, {
        key: 'fill',
        value: function fill() {
            this.context.fill();
            return this;
        }
        /**
         * Clear the context
         */

    }, {
        key: 'clear',
        value: function clear() {
            this.context.clear();
            return this;
        }
        //@TODO

    }, {
        key: 'createEvent',
        value: function createEvent() {}
        /**
         * @TODO
         * Esta função será implementada
         * Ela está aqui somente para me lembrar de como fazer animações
         */

    }, {
        key: 'requestAnimationFrame',
        value: function requestAnimationFrame(fn) {
            return window.requestAnimationFrame(draw);
        }
    }, {
        key: 'context',
        get: function get() {
            return this._context;
        },
        set: function set(ctx) {
            return this._context = this.getContext(ctx);
        }
    }, {
        key: 'context2D',
        get: function get() {
            return this.element.getContext('2d');
        }
    }, {
        key: 'context3D',
        get: function get() {
            return this.element.getContext('3d');
        }
    }, {
        key: 'imageSmoothingEnabled',
        get: function get() {
            return this.context.imageSmoothingEnabled || this.context.mozImageSmoothingEnabled || this.context.webkitImageSmoothingEnabled || this.context.msImageSmoothingEnabled;
        },
        set: function set(imageSmoothingEnabled) {
            if (this.context.imageSmoothingEnabled) {
                this.context.imageSmoothingEnabled = imageSmoothingEnabled;
            }
            if (this.context.mozImageSmoothingEnabled) {
                this.context.mozImageSmoothingEnabled = imageSmoothingEnabled;
            }
            if (this.context.webkitImageSmoothingEnabled) {
                this.context.webkitImageSmoothingEnabled = imageSmoothingEnabled;
            }
            if (this.context.msImageSmoothingEnabled) {
                this.context.msImageSmoothingEnabled = imageSmoothingEnabled;
            }
        }
    }, {
        key: 'shadowBlur',
        get: function get() {
            return this.context.shadowBlur;
        },
        set: function set(offset) {
            this.context.shadowBlur = offset;
        }
    }, {
        key: 'shadowOffsetX',
        get: function get() {
            return this.context.shadowOffsetX;
        },
        set: function set(offset) {
            this.context.shadowOffsetX = offset;
        }
    }, {
        key: 'shadowOffsetY',
        get: function get() {
            return this.context.shadowOffsetY;
        },
        set: function set(offset) {
            this.context.shadowOffsetY = offset;
        }
    }, {
        key: 'shadowColor',
        get: function get() {
            return this.context.shadowColor;
        },
        set: function set(shadowColor) {
            this.context.shadowColor = shadowColor;
        }
    }, {
        key: 'strokeStyle',
        get: function get() {
            return this.context.strokeStyle;
        },
        set: function set(strokeStyle) {
            this.context.strokeStyle = strokeStyle;
        }
    }, {
        key: 'lineCap',
        get: function get() {
            return this.context.lineCap;
        },
        set: function set(lineCap) {
            this.context.lineCap = lineCap;
        }
    }, {
        key: 'lineJoin',
        get: function get() {
            return this.context.lineJoin;
        },
        set: function set(lineJoin) {
            this.context.lineJoin = lineJoin;
        }
    }, {
        key: 'lineWidth',
        get: function get() {
            return this.context.lineWidth;
        },
        set: function set(lineWidth) {
            this.context.lineWidth = lineWidth;
        }
    }, {
        key: 'miterLimit',
        get: function get() {
            return this.context.miterLimit;
        },
        set: function set(miterLimit) {
            this.context.miterLimit = miterLimit;
        }
    }, {
        key: 'font',
        get: function get() {
            return this.context.font;
        },
        set: function set(font) {
            this.context.font = font;
        }
    }, {
        key: 'textAlign',
        get: function get() {
            return this.context.textAlign;
        },
        set: function set(textAlign) {
            this.context.textAlign = textAlign;
        }
    }, {
        key: 'textBaseline',
        get: function get() {
            return this.context.textBaseline;
        },
        set: function set(textBaseline) {
            this.context.textBaseline = textBaseline;
        }
    }, {
        key: 'globalAlpha',
        get: function get() {
            return this.context.globalAlpha;
        },
        set: function set(globalAlpha) {
            this.context.globalAlpha = globalAlpha;
        }
    }, {
        key: 'globalCompositeOperation',
        get: function get() {
            return this.context.globalCompositeOperation;
        },
        set: function set(globalCompositeOperation) {
            this.context.globalCompositeOperation = globalCompositeOperation;
        }
    }]);

    return WCanvas;
}(_WElement3.default);

exports.default = WCanvas;

},{"../enums/WType":27,"./WElement":23}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Generic class to elements
 * @class
 */
var WElement = function () {
    function WElement(element, width, height, border) {
        _classCallCheck(this, WElement);

        this.element = element;
        this.width = width;
        this.height = height;
        this.border = border;
        console.log(this.getClassName().concat(' Created!'));
    }

    _createClass(WElement, [{
        key: "createElement",

        /**
         * Create a element
         * @param {string} element Type of element
         * @example WElement element = new WElement('p')
         */
        value: function createElement(element) {
            return document.createElement(element);
        }
        /**
         * Set the id of element
         * @param {string} id Id of element
         */

    }, {
        key: "setId",
        value: function setId(id) {
            this.element.id = id;
            return this;
        }
        /**
         * Set Attribute to element
         * @param {string} attr Attribute of element
         * @param {string} value Value of attribute
         * @example element.setAttribute('width','10')
         */

    }, {
        key: "setAttribute",
        value: function setAttribute(attr, value) {
            this.element.setAttribute(attr, value);
            return this;
        }
        /**
         * Set Style of element
         * @param {string} attr Attribute of style
         * @param {string} value Value of attributey
         * @example element.setStyle('color','red')
         */

    }, {
        key: "setStyle",
        value: function setStyle(attr, value) {
            this.setAttibute('style', attr + ': ' + value);
            return this;
        }
        /**
         * Set size of element
         * @param {number} width Width of element
         * @param {number} height Height of element
         */

    }, {
        key: "setSize",
        value: function setSize(width, height) {
            this.width = width;
            this.height = height;
            return this;
        }
    }, {
        key: "addChild",

        /**
         * Add Child to Element
         * @param {Object} child Child to append on element
         */
        value: function addChild(child) {
            this.element.appendChild(child);
            return this;
        }
        /**
         * Add current element to body
         */

    }, {
        key: "addToBody",
        value: function addToBody() {
            document.body.appendChild(this.element);
            return this;
        }
        /**
         * Add current element to element with specified id
         * @param {string} id Id of element
         */

    }, {
        key: "addToElementById",
        value: function addToElementById(id) {
            document.getElementById(id).appendChild(this.element);
            return this;
        }
        /**
         * Add current element to element with specified className
         * @param {string} className Class of element
         */

    }, {
        key: "addToElementByClassName",
        value: function addToElementByClassName(className) {
            document.getElementsByClassName(className).appendChild(this.element);
            return this;
        }
        /**
         * Get name of current Class
         */

    }, {
        key: "getClassName",
        value: function getClassName() {
            return this.constructor.name;
        }
    }, {
        key: "hashcode",
        get: function get() {
            var hash = this.constructor.name.split("").reduce(function (a, b) {
                a = (a << 5) - a + b.charCodeAt(0);return a & a;
            }, 0);
            var hashcode = "";
            for (var i = 0; i < 10; i++) {
                hashcode = hashcode.concat(String.fromCodePoint(Math.round(Math.random() * 100) + 4));
            }
            return (hash + ".*wmf*." + hashcode).trim();
        }
    }, {
        key: "type",
        get: function get() {
            return this.constructor.name;
        }
    }, {
        key: "id",
        get: function get() {
            return this.element.id;
        },
        set: function set(id) {
            this.element.id = id;
        }
    }, {
        key: "element",
        get: function get() {
            return this._element;
        },
        set: function set(element) {
            this._element = this.createElement(element);
        }
    }, {
        key: "attributes",
        get: function get() {
            return this.element.attributes;
        }
    }, {
        key: "width",
        set: function set(width) {
            this.element.setAttribute('style', 'width: '.concat(width));
            return this;
        }
    }, {
        key: "height",
        set: function set(height) {
            this.element.setAttribute('style', 'height: '.concat(height));
            return this;
        }
    }, {
        key: "border",
        set: function set() {
            var border = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '1px solid black';

            this.element.setAttribute('style', 'border: '.concat(border));
            return this;
        }
    }]);

    return WElement;
}();

exports.default = WElement;

},{}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _WElement2 = require('../elements/WElement.js');

var _WElement3 = _interopRequireDefault(_WElement2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WImage = function (_WElement) {
    _inherits(WImage, _WElement);

    function WImage(src) {
        _classCallCheck(this, WImage);

        var _this = _possibleConstructorReturn(this, (WImage.__proto__ || Object.getPrototypeOf(WImage)).call(this, 'img'));

        if (src) _this.setSrc(src);
        return _this;
    }

    _createClass(WImage, [{
        key: 'getImage',
        value: function getImage() {
            return this._image;
        }
    }, {
        key: 'setSrc',
        value: function setSrc(src) {
            this._src = _get(WImage.prototype.__proto__ || Object.getPrototypeOf(WImage.prototype), 'setAttribute', this).call(this, 'src', src);
        }
    }, {
        key: 'getSrc',
        value: function getSrc(src) {
            return this._src;
        }
    }]);

    return WImage;
}(_WElement3.default);

exports.default = WImage;

},{"../elements/WElement.js":23}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var WCanvasQuality = {
    'FULL': 1.0,
    'MEDIUM': 0.5,
    'LOW': 0.1
};

exports.default = WCanvasQuality;

},{}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var WMimeType = {
    'IMAGE_JPEG': 'image/jpeg'
};

exports.default = WMimeType;

},{}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var WType = {
    'FILL': 'fill',
    'STROKE': 'stroke',
    'CLEAR': 'clear'
};

exports.default = WType;

},{}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = Object.prototype.eventFallMove = function () {
    if (this.context) {
        var $this = this;
        var ctx = $this.context;

        $this.running = false;

        var raf;

        $this.start = function () {
            $this.running = true;
            $this.draw().toX($this.x).toY($this.y);

            $this.x += $this.vx;
            $this.y += $this.vy;
            $this.vy *= .99;
            $this.vy += .25;

            if ($this.y + $this.vy > $this.element.height || $this.y + $this.vy < 0) {
                $this.vy = -$this.vy;
            }

            if ($this.x + $this.vx > $this.element.width || $this.x + $this.vx < 0) {
                $this.vx = -$this.vx;
            }
            raf = window.requestAnimationFrame($this.start);
        };

        $this.stop = function () {
            $this.running = false;
            window.cancelAnimationFrame(raf);
        };

        return $this;
    }
};

},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = Object.prototype.eventMouseFollow = function () {
    var _this = this;

    if (this.context) {
        var $this;
        var ctx;

        var _ret = function () {
            var clear = function clear() {
                ctx.fillStyle = 'rgba(255,255,255,0.1)';
                ctx.fillRect(0, 0, $this.element.width, $this.element.height);
            };

            $this = _this;
            ctx = $this.context;


            $this.element.addEventListener('mousemove', function (e) {
                if (!$this.running) {
                    clear();
                    $this.x = e.clientX;
                    $this.y = e.clientY;
                    $this.draw();
                }
            });

            $this.element.addEventListener('click', function (e) {
                if (!$this.running) {
                    $this.start();
                } else {
                    $this.stop();
                }
            });

            return {
                v: $this
            };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
};

},{}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Evento de objeto se movendo na tela.
 * Têm-se o x, y, vx, vy.
 * Objeto se move de acordo com x e y.
 * Utiliza-se vx e vy para somar as váriaveis de posição.
 * Quando se objeto chega ao limite do canvas, nega-se o vx e vy para
 * inverter a soma, fazendo com que o x e y decremente, e ao retornar
 * inverte-se novamente para o x e y incrementar, movendo assim o objeto
 * em sentidos opostos. 
 */
exports.default = Object.prototype.eventRandomOne = function () {
    var _this = this;

    if (this.context) {
        var $this;
        var ctx;
        var raf;

        var _ret = function () {
            var draw = function draw() {
                $this.draw().toX($this.x).toY($this.y);

                $this.x += $this.vx;
                $this.y += $this.vy;

                if ($this.y + $this.vy > $this.element.height || $this.y + $this.vy < 0) {
                    $this.vy = -$this.vy;
                }

                if ($this.x + $this.vx > $this.element.width || $this.x + $this.vx < 0) {
                    $this.vx = -$this.vx;
                }
                raf = window.requestAnimationFrame(draw);
            };

            $this = _this;
            ctx = $this.context;


            draw();
            return {
                v: $this
            };
        }();

        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
    }
};

},{}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = Object.prototype.createBall = function (x, y) {
    if (this.context) {
        var $this = this;
        $this.x = x;
        $this.y = y;
        $this.vx = 5;
        $this.vy = 2;
        $this.radius = 25;
        $this.color = 'blue';
        $this.draw = function () {
            $this.clearRect(0, 0, $this.element.width, $this.element.height);
            $this.context.beginPath();
            $this.context.arc($this.x, $this.y, $this.radius, 0, Math.PI * 2, true);
            $this.context.closePath();
            $this.context.fillStyle = $this.color;
            $this.context.fill();
            return $this;
        };
        $this.toX = function (x) {
            $this.x = x;
            return $this;
        };
        $this.toY = function (y) {
            $this.y = y;
            return $this;
        };

        return $this;
    }
};

},{}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = Object.prototype.createBallShadow = function (x, y) {
    if (this.context) {
        var $this = this;
        $this.x = x;
        $this.y = y;
        $this.vx = 5;
        $this.vy = 2;
        $this.radius = 25;
        $this.color = 'blue';
        $this.draw = function () {
            $this.fillStyle('rgba(255,255,255,0.3)');
            $this.fillRect(0, 0, $this.element.width, $this.element.height);
            $this.context.beginPath();
            $this.context.arc($this.x, $this.y, $this.radius, 0, Math.PI * 2, true);
            $this.context.closePath();
            $this.context.fillStyle = $this.color;
            $this.context.fill();
            return $this;
        };
        $this.toX = function (x) {
            $this.x = x;
            return $this;
        };
        $this.toY = function (y) {
            $this.y = y;
            return $this;
        };

        $this.draw();

        return $this;
    }
};

},{}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = Object.prototype.createBallon = function () {
    if (this.context) {
        var ctx = this.context;

        ctx.beginPath();
        ctx.moveTo(75, 25);
        ctx.quadraticCurveTo(25, 25, 25, 62.5);
        ctx.quadraticCurveTo(25, 100, 50, 100);
        ctx.quadraticCurveTo(50, 120, 30, 125);
        ctx.quadraticCurveTo(60, 120, 65, 100);
        ctx.quadraticCurveTo(125, 100, 125, 62.5);
        ctx.quadraticCurveTo(125, 25, 75, 25);
        ctx.stroke();
        return this;
    }
};

},{}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = Object.prototype.createClockOne = function () {
    var _this = this;

    if (this.context) {
        var ctx;

        var _ret = function () {
            var clock = function clock() {
                var now = new Date();
                ctx.save();
                ctx.clearRect(0, 0, 150, 150);
                ctx.translate(75, 75);
                ctx.scale(0.4, 0.4);
                ctx.rotate(-Math.PI / 2);
                ctx.strokeStyle = "black";
                ctx.fillStyle = "white";
                ctx.lineWidth = 8;
                ctx.lineCap = "round";

                // Hour marks
                ctx.save();
                for (var i = 0; i < 12; i++) {
                    ctx.beginPath();
                    ctx.rotate(Math.PI / 6);
                    ctx.moveTo(100, 0);
                    ctx.lineTo(120, 0);
                    ctx.stroke();
                }
                ctx.restore();

                // Minute marks
                ctx.save();
                ctx.lineWidth = 5;
                for (i = 0; i < 60; i++) {
                    if (i % 5 != 0) {
                        ctx.beginPath();
                        ctx.moveTo(117, 0);
                        ctx.lineTo(120, 0);
                        ctx.stroke();
                    }
                    ctx.rotate(Math.PI / 30);
                }
                ctx.restore();

                var sec = now.getSeconds();
                var min = now.getMinutes();
                var hr = now.getHours();
                hr = hr >= 12 ? hr - 12 : hr;

                ctx.fillStyle = "black";

                // write Hours
                ctx.save();
                ctx.rotate(hr * (Math.PI / 6) + Math.PI / 360 * min + Math.PI / 21600 * sec);
                ctx.lineWidth = 14;
                ctx.beginPath();
                ctx.moveTo(-20, 0);
                ctx.lineTo(80, 0);
                ctx.stroke();
                ctx.restore();

                // write Minutes
                ctx.save();
                ctx.rotate(Math.PI / 30 * min + Math.PI / 1800 * sec);
                ctx.lineWidth = 10;
                ctx.beginPath();
                ctx.moveTo(-28, 0);
                ctx.lineTo(112, 0);
                ctx.stroke();
                ctx.restore();

                // Write seconds
                ctx.save();
                ctx.rotate(sec * Math.PI / 30);
                ctx.strokeStyle = "#D40000";
                ctx.fillStyle = "#D40000";
                ctx.lineWidth = 6;
                ctx.beginPath();
                ctx.moveTo(-30, 0);
                ctx.lineTo(83, 0);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
                ctx.stroke();
                ctx.fillStyle = "rgba(0,0,0,0)";
                ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.restore();

                ctx.beginPath();
                ctx.lineWidth = 14;
                ctx.strokeStyle = '#325FA2';
                ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
                ctx.stroke();

                ctx.restore();

                window.requestAnimationFrame(clock);
            };

            ctx = _this.context;


            window.requestAnimationFrame(clock);
            return {
                v: _this
            };
        }();

        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
    }
};

},{}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = Object.prototype.createHeart = function () {
    if (this.context) {
        var ctx = this.context;

        ctx.beginPath();
        ctx.moveTo(75, 40);
        ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
        ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
        ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
        ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
        ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
        ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
        ctx.fill();
        return this;
    }
};

},{}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var injections = {};
exports.default = Object.prototype.InjectionPool = {
    add: function add(injection) {
        injections[injection.type] = injection;
    },
    list: function list() {
        return injections;
    },
    get: function get(injection) {
        return injections[injection];
    }
};

},{}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _InjectionPool = require('./InjectionPool');

var _InjectionPool2 = _interopRequireDefault(_InjectionPool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.prototype.Injectable = function () {
    return function (target, property, descriptor) {
        var injection = {
            'hashcode': target.prototype.hashcode,
            'type': target.prototype.type || target.prototype.constructor.name,
            'target': target,
            'property': property,
            'descriptor': descriptor
        };
        _InjectionPool2.default.add(injection);
    };
};

Object.prototype.Inject = function () {
    for (var _len = arguments.length, injections = Array(_len), _key = 0; _key < _len; _key++) {
        injections[_key] = arguments[_key];
    }

    return function (target, property, descriptor) {
        injections.forEach(function (injection) {
            var obj = _InjectionPool2.default.get(injection);
            Object.defineProperty(target.prototype, obj.type, {
                __proto__: null,
                enumerable: true,
                get: function get() {
                    var elem = new obj.target();
                    return elem;
                }
            });
        });
    };
};

Object.prototype.InjectLoader = function () {
    for (var _len2 = arguments.length, loaders = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        loaders[_key2] = arguments[_key2];
    }

    return function (target, property, descriptor) {
        loaders.forEach(function (loader) {
            var obj = _InjectionPool2.default.get(loader);
            var loaderStart = new obj.target();
        });
        new target();
    };
};

exports.default = {
    Injectable: Injectable,
    Inject: Inject,
    InjectLoader: InjectLoader
};

},{"./InjectionPool":36}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _WCanvas2 = require("../elements/WCanvas");

var _WCanvas3 = _interopRequireDefault(_WCanvas2);

var _test = require("./test");

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var World = (_dec = Injectable(), _dec(_class = function (_WCanvas) {
    _inherits(World, _WCanvas);

    function World() {
        var j = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        _classCallCheck(this, World);

        var canvas = new _WCanvas3.default();
        return _possibleConstructorReturn(this, (World.__proto__ || Object.getPrototypeOf(World)).call(this));
    }

    _createClass(World, [{
        key: "method",
        value: function method(ola) {
            console.log("ola");
            return "willian";
        }
    }]);

    return World;
}(_WCanvas3.default)) || _class);
exports.default = World;

},{"../elements/WCanvas":22,"./test":39}],39:[function(require,module,exports){
"use strict";

function nonenumerable(target, name, description) {
  descriptor.enumerable = false;
  return descriptor;
}

},{}]},{},[1]);
