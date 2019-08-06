// { "framework": "Vue"} 

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*global Vue*/

/* weex initialized here, please do not move this line */
var _require = __webpack_require__(1),
    router = _require.router;

var App = __webpack_require__(23);
/* eslint-disable no-new */
new Vue(Vue.util.extend({ el: '#root', router: router }, App));
router.push('/');

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = undefined;

var _vueRouter = __webpack_require__(2);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _main = __webpack_require__(3);

var _main2 = _interopRequireDefault(_main);

var _selectRegion = __webpack_require__(7);

var _selectRegion2 = _interopRequireDefault(_selectRegion);

var _adminList = __webpack_require__(11);

var _adminList2 = _interopRequireDefault(_adminList);

var _chooseAdmin = __webpack_require__(15);

var _chooseAdmin2 = _interopRequireDefault(_chooseAdmin);

var _subpages = __webpack_require__(19);

var _subpages2 = _interopRequireDefault(_subpages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*global Vue*/
Vue.use(_vueRouter2.default);

var router = exports.router = new _vueRouter2.default({
  routes: [{
    path: '/',
    name: 'main',
    component: _main2.default
  }, {
    path: '/selectRegion',
    name: 'selectRegion',
    component: _selectRegion2.default
  }, {
    path: '/adminList/:id',
    name: 'adminList',
    component: _adminList2.default
  }, {
    path: '/chooseAdmin/:areaId',
    name: 'chooseAdmin',
    component: _chooseAdmin2.default
  }, {
    path: '/subpages/:areaId/:parentId',
    name: 'subpages',
    component: _subpages2.default
  }]
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/*!
  * vue-router v3.0.7
  * (c) 2019 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if ("development" !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

function extend (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

var View = {
  name: 'RouterView',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    // used by devtools to display a router-view badge
    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      var vnodeData = parent.$vnode && parent.$vnode.data;
      if (vnodeData) {
        if (vnodeData.routerView) {
          depth++;
        }
        if (vnodeData.keepAlive && parent._inactive) {
          inactive = true;
        }
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // register instance in init hook
    // in case kept-alive component be actived when routes changed
    data.hook.init = function (vnode) {
      if (vnode.data.keepAlive &&
        vnode.componentInstance &&
        vnode.componentInstance !== matched.instances[name]
      ) {
        matched.instances[name] = vnode.componentInstance;
      }
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children)
  }
}

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (true) {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    "development" !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */

var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'RouterLink',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
      ? 'router-link-active'
      : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
      ? 'router-link-exact-active'
      : globalExactActiveClass;
    var activeClass = this.activeClass == null
      ? activeClassFallback
      : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
      ? exactActiveClassFallback
      : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
}

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('RouterView', View);
  Vue.component('RouterLink', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}
pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  params = params || {};
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));

    // Fix #2505 resolving asterisk routes { name: 'not-found', params: { pathMatch: '/not-found' }}
    if (params.pathMatch) { params[0] = params.pathMatch; }

    return filler(params, { pretty: true })
  } catch (e) {
    if (true) {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  } finally {
    // delete the 0 if it was added
    delete params[0];
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (true) {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(
    path,
    parent,
    pathToRegexpOptions.strict
  );

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (true) {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if ("development" !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (true) {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent, strict) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */

function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next._normalized) {
    return next
  } else if (next.name) {
    return extend({}, raw)
  }

  // relative params
  if (!next.path && next.params && current) {
    next = extend({}, next);
    next._normalized = true;
    var params = extend(extend({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (true) {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

/*  */



function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (true) {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
      return _createRoute(record, location, redirectedFrom)
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
      ? originalRedirect(createRoute(record, location, null, router))
      : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (true) {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (true) {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (true) {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      // Fix #1994: using * with props: true generates a param named 0
      params[key.name || 'pathMatch'] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */

var positionStore = Object.create(null);

function setupScroll () {
  // Fix for #1585 for Firefox
  // Fix for #2195 Add optional third attribute to workaround a bug in safari https://bugs.webkit.org/show_bug.cgi?id=182678
  // Fix for #2774 Support for apps loaded from Windows file shares not mapped to network drives: replaced location.origin with
  // window.location.protocol + '//' + window.location.host
  // location.host contains the port and location.hostname doesn't
  var protocolAndPath = window.location.protocol + '//' + window.location.host;
  var absolutePath = window.location.href.replace(protocolAndPath, '');
  window.history.replaceState({ key: getStateKey() }, '', absolutePath);
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (true) {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior.call(router, to, from, isPop ? position : null);

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition((shouldScroll), position);
      }).catch(function (err) {
        if (true) {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          "development" !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
      next(cb);
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (
    instances[key] &&
    !instances[key]._isBeingDestroyed // do not reuse being destroyed instance
  ) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */

var HTML5History = /*@__PURE__*/(function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (supportsScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = decodeURI(window.location.pathname);
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */

var HashHistory = /*@__PURE__*/(function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  // empty path
  if (index < 0) { return '' }

  href = href.slice(index + 1);
  // decode the hash but not the search or hash
  // as search(query) is already decoded
  // https://github.com/vuejs/vue-router/issues/2708
  var searchIndex = href.indexOf('?');
  if (searchIndex < 0) {
    var hashIndex = href.indexOf('#');
    if (hashIndex > -1) { href = decodeURI(href.slice(0, hashIndex)) + href.slice(hashIndex); }
    else { href = decodeURI(href); }
  } else {
    if (searchIndex > -1) { href = decodeURI(href.slice(0, searchIndex)) + href.slice(searchIndex); }
  }

  return href
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */

var AbstractHistory = /*@__PURE__*/(function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */



var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (true) {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  "development" !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // set up app destroyed handler
  // https://github.com/vuejs/vue-router/issues/2639
  app.$once('hook:destroyed', function () {
    // clean out app from this.apps array once destroyed
    var index = this$1.apps.indexOf(app);
    if (index > -1) { this$1.apps.splice(index, 1); }
    // ensure we still have a main app or null if no apps
    // we do not release the router so it can be reused
    if (this$1.app === app) { this$1.app = this$1.apps[0] || null; }
  });

  // main app previously initialized
  // return as we don't need to set up new history listener
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  current = current || this.history.current;
  var location = normalizeLocation(
    to,
    current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '3.0.7';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["default"] = (VueRouter);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(4)
)

/* script */
__vue_exports__ = __webpack_require__(5)

/* template */
var __vue_template__ = __webpack_require__(6)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\weex项目\\教练派区域门店管理\\regionManage\\src\\components\\main.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-cd9409ae"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {
  "deleteRegionBox": {
    "width": "516",
    "height": "263",
    "backgroundColor": "#ffffff",
    "borderRadius": "6",
    "alignItems": "center"
  },
  "swiperBox": {
    "width": "725",
    "height": "93"
  },
  "swiperItem": {
    "flexDirection": "row",
    "width": "1007"
  },
  "regionItem": {
    "width": "725",
    "height": "93",
    "backgroundColor": "#ffffff",
    "flexDirection": "row",
    "alignItems": "center",
    "borderBottomWidth": "1",
    "borderBottomColor": "#EAEAEA",
    "borderBottomStyle": "solid"
  },
  "regionItems": {
    "width": "600",
    "height": "93",
    "backgroundColor": "#ffffff",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "swiperBtn": {
    "width": "282",
    "height": "93",
    "flexDirection": "row"
  },
  "setting": {
    "width": "94",
    "height": "93",
    "alignItems": "center",
    "justifyContent": "center",
    "backgroundColor": "#108EE9",
    "color": "#ffffff",
    "fontSize": "19"
  },
  "edit": {
    "width": "94",
    "height": "93",
    "alignItems": "center",
    "justifyContent": "center",
    "backgroundColor": "#7570FF",
    "color": "#ffffff",
    "fontSize": "19"
  },
  "remove": {
    "width": "94",
    "height": "93",
    "alignItems": "center",
    "justifyContent": "center",
    "backgroundColor": "#E65142",
    "color": "#ffffff",
    "fontSize": "19"
  },
  "regionBox": {
    "backgroundColor": "#F6F6F6"
  },
  "centerScroll": {
    "width": "750",
    "backgroundColor": "#ffffff",
    "paddingLeft": "23"
  },
  "headerBox": {
    "width": "750",
    "height": "70",
    "alignItems": "center",
    "backgroundColor": "#4C5160",
    "justifyContent": "space-between",
    "paddingLeft": "19",
    "paddingRight": "19",
    "flexDirection": "row"
  },
  "leftBox": {
    "alignItems": "center",
    "justifyContent": "space-between",
    "color": "#ffffff",
    "flexDirection": "row"
  },
  "returnIcon": {
    "width": "28",
    "height": "28",
    "marginRight": "8"
  },
  "addIcon": {
    "width": "28",
    "height": "28"
  },
  "centerTxt": {
    "fontSize": "17",
    "color": "#999999",
    "marginLeft": "23"
  },
  "manageBtn": {
    "flexDirection": "row"
  },
  "centerManage": {
    "height": "64",
    "justifyContent": "space-between",
    "width": "750",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "submitBtn": {
    "width": "80",
    "height": "34",
    "lineHeight": "34",
    "textAlign": "center",
    "backgroundColor": "#108EE9",
    "color": "#FFFFFF",
    "fontSize": "15",
    "borderRadius": "4",
    "marginRight": "19",
    "borderColor": "#108EE9",
    "borderWidth": "1",
    "borderStyle": "solid"
  },
  "cancelBtn": {
    "width": "80",
    "height": "34",
    "color": "#666666",
    "lineHeight": "34",
    "textAlign": "center",
    "fontSize": "15",
    "borderRadius": "4",
    "marginRight": "23",
    "borderColor": "#666666",
    "borderWidth": "1",
    "borderStyle": "solid"
  },
  "centerItem": {
    "height": "93",
    "width": "725",
    "borderBottomWidth": "1",
    "borderBottomColor": "#EAEAEA",
    "borderBottomStyle": "solid",
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "space-between"
  },
  "centerMess": {
    "alignItems": "center",
    "flexDirection": "row"
  },
  "centerIcon": {
    "width": "34",
    "height": "34",
    "marginRight": "19"
  },
  "centerName": {
    "color": "#333333",
    "fontSize": "19"
  },
  "selectedBtn": {
    "width": "28",
    "height": "28",
    "marginRight": "23"
  },
  "bg": {
    "backgroundColor": "rgba(0,0,0,0.6)",
    "position": "absolute",
    "top": 0,
    "left": 0,
    "width": "750",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "addregionBox": {
    "width": "516",
    "height": "383",
    "backgroundColor": "#ffffff",
    "borderRadius": "6",
    "alignItems": "center"
  },
  "addReginTxt": {
    "color": "#333333",
    "fontSize": "30",
    "marginTop": "58",
    "marginBottom": "50",
    "width": "516",
    "textAlign": "center"
  },
  "nameBox": {
    "width": "375",
    "borderBottomColor": "#f6d6f6",
    "borderBottomStyle": "solid",
    "borderBottomWidth": "1",
    "paddingBottom": "23",
    "alignItems": "center",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "marginBottom": "58"
  },
  "nameInput": {
    "width": "315",
    "height": "40",
    "fontSize": "22",
    "textAlign": "left",
    "paddingLeft": "10",
    "borderColor": "#ffffff"
  },
  "cancelIcon": {
    "width": "28",
    "height": "28"
  },
  "regionBtnBox": {
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "cencelAdd": {
    "width": "195",
    "height": "56",
    "borderColor": "#DCDCDC",
    "borderStyle": "solid",
    "borderWidth": "1",
    "borderRadius": "30",
    "textAlign": "center",
    "lineHeight": "58",
    "color": "#666666",
    "fontSize": "19",
    "marginRight": "28"
  },
  "submitAdd": {
    "width": "195",
    "height": "56",
    "borderColor": "#1890FF",
    "backgroundColor": "#1890FF",
    "borderStyle": "solid",
    "borderWidth": "1",
    "borderRadius": "30",
    "textAlign": "center",
    "lineHeight": "58",
    "color": "#ffffff",
    "fontSize": "19"
  }
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var modal = weex.requireModule("modal");
var storage = weex.requireModule('storage');
var animation = weex.requireModule('animation');
var stream = weex.requireModule('stream');
var nativeMoudle = weex.requireModule('nativeModule');
exports.default = {
    data: function data() {
        return {
            regionList: [],
            clubList: [],
            height: '',
            popHeight: '',
            showChooseCenter: false,
            centerIdList: [],
            currentIndex: -1,
            showAddRegion: false,
            regionName: '',
            nowIndex: -1,
            showDeleteRegion: false,
            deleteIndex: '',
            title: '',
            token: 'eyJuYW1lIjoiRWxpemEiLCJwaG9uZSI6IjEzMjkxODM0OTQyIiwiYWNjb3VudElkIjo2LCJhY2NvdW50VHlwZSI6Miwid2VjaGF0SWQiOm51bGwsInRpY2tzIjoxNTU4NjAyNDQ0NzEyfQ==.pOk8SKFjMUjap+JjBQyEbnfYpVdYj4qnhzvui+DgoTQ=',
            webHost: 'http://10.0.0.216:9090',
            overalAreaId: '',
            actionRegionId: ''
        };
    },
    mounted: function mounted() {
        nativeMoudle.showProgressDialog();
    },
    created: function created() {
        var that = this;
        that.height = weex.config.env.deviceHeight;
        nativeMoudle.showProgressDialog();
        that.popHeight = 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight + 30;
        nativeMoudle.getMetaData(function (map) {
            that.token = map.token;
        });
        setTimeout(function () {
            that.getRegionList();
        }, 50);
    },

    methods: {
        close: function close() {
            nativeMoudle.close();
        },
        getRegionList: function getRegionList() {
            var that = this;
            stream.fetch({
                method: 'GET',
                url: that.webHost + '/api/region/list/-1',
                type: 'json',
                headers: {
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN': that.token
                }
            }, function (ret) {
                if (ret.ok) {
                    nativeMoudle.progressDialogDismiss();
                    if (ret.data.status == 0) {
                        //  nativeMoudle.toast(ret.data);
                        if (ret.data.data.regionInfo == null || ret.data.data.regionInfo == '' || ret.data.data.regionInfo == undefined) {
                            that.regionList = [];
                        } else {
                            that.regionList = ret.data.data.regionInfo;
                        }
                        if (ret.data.data.regionClub == null || ret.data.data.regionClub == '' || ret.data.data.regionClub == undefined) {
                            that.clubList = [];
                        } else {
                            var list = ret.data.data.regionClub;
                            var arr = [];
                            for (var i = 0, len = list.length; i < len; i++) {
                                list[i].selected = false;
                                if (list[i].regionId == null) {
                                    arr.push(list[i]);
                                }
                            }
                            that.clubList = arr;
                        }
                        that.overalAreaId = ret.data.data.superRegionInfo.id;
                    } else {
                        nativeMoudle.toastError(ret.data.message);
                    }
                } else {
                    nativeMoudle.toastError('网络错误！');
                }
            }, function (response) {});
        },
        moveCenterEvent: function moveCenterEvent() {
            this.showChooseCenter = true;
        },
        selectCenter: function selectCenter(id) {
            for (var i = 0, len = this.clubList.length; i < len; i++) {
                if (id == this.clubList[i].clubId) {
                    if (this.centerIdList.indexOf(id) == -1) {
                        this.centerIdList.push(id);
                    } else {
                        var index = this.centerIdList.indexOf(id);
                        this.centerIdList.splice(index, 1);
                    }
                    this.clubList[i].selected = !this.clubList[i].selected;
                }
            }
        },
        handleSwipe: function handleSwipe(e, index) {
            if (e.direction == "left") {
                this.goRight(this.nowIndex);
                this.goLeft(index);
            } else if (e.direction == "right") {
                this.goRight(index);
            }
            // modal.toast({message:"==" + e.direction + "==" + index, duration:1});
        },
        goLeft: function goLeft(index) {
            var itemEl = this.$refs.itemDev[index];
            //第二左滑条目与前一次左滑条目相同时，不处理
            if (index == this.currentIndex) {
                return;
            }
            //当前有划出的条目的时候，左滑其他条目，当前的条目归位，
            if (this.currentIndex != -1) {
                this.goRight(this.currentIndex);
            }
            //左滑当前条目
            if (this.currentIndex != index) {
                animation.transition(itemEl, {
                    styles: {
                        transform: 'translate(-282px, 0px)',
                        transformOrigin: 'center center'
                    },
                    duration: 200, //ms
                    timingFunction: 'linear',
                    delay: 0 //ms
                }, function () {});
                this.currentIndex = index;
                this.nowIndex = index;
            }
        },

        //time是动画时间，给个默认值 200毫秒，不传就表明这个值为200毫秒
        goRight: function goRight(index) {
            var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;

            var itemEl = this.$refs.itemDev[index];
            animation.transition(itemEl, {
                styles: {
                    transform: 'translate(0px, 0px)',
                    transformOrigin: 'center center'
                },
                duration: time, //动画时间
                timingFunction: 'linear', //线性运动
                delay: 0 //ms
            }, function () {});
            this.currentIndex = -1;
        },

        //点击删除
        removeItem: function removeItem(id, index) {
            this.showDeleteRegion = true;
            this.deleteIndex = index;
            this.actionRegionId = id;
        },
        cancelSelect: function cancelSelect() {
            this.showChooseCenter = false;
            this.centerIdList = [];
        },
        moveRegion: function moveRegion() {
            var that = this;
            storage.setItem('centerIdList', JSON.stringify(that.centerIdList), function (res) {
                if (res.result == 'success') {
                    that.$router.push('/selectRegion');
                }
            });
        },
        empty: function empty() {},
        clearName: function clearName() {
            this.regionName = '';
            this.$refs.inputText.blur();
        },
        addRegion: function addRegion() {
            this.showAddRegion = true;
            this.title = '添加区域';
        },
        hideAddRegion: function hideAddRegion() {
            this.$refs.inputText.blur();
            this.regionName = '';
            this.showAddRegion = false;
        },
        submitAddRegion: function submitAddRegion() {
            this.$refs.inputText.blur();
            var that = this;
            if (that.regionName == '') {
                nativeMoudle.toastError('请输入区域名称');
                return;
            }
            if (that.title == '添加区域') {
                var arr = JSON.stringify({
                    parentId: that.overalAreaId,
                    regionName: that.regionName
                });
                var URL = that.webHost + '/api/region/add';
                var method = 'POST';
            } else {
                var arr = JSON.stringify({
                    id: that.actionRegionId,
                    regionName: that.regionName
                });
                var URL = that.webHost + '/api/region/update';
                var method = 'PUT';
            }
            nativeMoudle.showProgressDialog();
            stream.fetch({
                method: method,
                url: URL,
                type: 'json',
                headers: {
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN': that.token
                },
                body: arr
            }, function (ret) {
                if (ret.ok) {
                    nativeMoudle.progressDialogDismiss();
                    if (ret.data.status == 0) {
                        nativeMoudle.toastSuccess('操作成功');
                        that.hideAddRegion();
                        if (that.title == '编辑区域') {
                            that.goRight(that.currentIndex, 0);
                        }
                        setTimeout(function () {
                            that.getRegionList();
                        }, 200);
                    } else {
                        nativeMoudle.toastError(ret.data.message);
                        that.showAddRegion = false;
                    }
                } else {
                    nativeMoudle.toastError('网络错误！');
                }
            }, function (response) {});
        },
        setAdministrator: function setAdministrator(regionId) {
            this.$router.push({ name: 'adminList', query: { id: regionId } });
        },
        editRegion: function editRegion(regionId, name) {
            this.showAddRegion = true;
            this.title = '编辑区域';
            this.regionName = name;
            this.actionRegionId = regionId;
        },
        hideDeleteRegion: function hideDeleteRegion() {
            this.showDeleteRegion = false;
        },
        submitDeleteRegion: function submitDeleteRegion() {
            var that = this;
            nativeMoudle.showProgressDialog();
            stream.fetch({
                method: 'DELETE',
                url: that.webHost + '/api/region/delete/' + that.actionRegionId,
                type: 'json',
                headers: {
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN': that.token
                }
            }, function (ret) {
                if (ret.ok) {
                    nativeMoudle.progressDialogDismiss();
                    if (ret.data.status == 0) {
                        nativeMoudle.toastSuccess('删除成功');
                        that.showDeleteRegion = false;
                        setTimeout(function () {
                            that.goRight(that.deleteIndex, 0);
                            that.regionList.splice(that.deleteIndex, 1);
                            that.getRegionList();
                        }, 500);
                    } else {
                        nativeMoudle.toastError(ret.data.message);
                    }
                } else {
                    nativeMoudle.toastError('网络错误！');
                }
            }, function (response) {});
        },
        toSub: function toSub(id, parentId) {
            this.$router.push({ name: 'subpages', query: { id: id, parentId: parentId } });
        }
    }
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["warpper"]
  }, [_c('div', {
    staticClass: ["regionBox"],
    style: {
      height: _vm.height
    }
  }, [_c('div', {
    staticClass: ["headerBox"]
  }, [_c('div', {
    staticClass: ["leftBox"]
  }, [_c('img', {
    staticClass: ["returnIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/whiteBack.png"
    },
    on: {
      "click": _vm.close
    }
  }), _c('text', {
    staticStyle: {
      color: "#ffffff"
    },
    on: {
      "click": _vm.close
    }
  }, [_vm._v("区域管理")])]), _c('img', {
    staticClass: ["addIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/whiteAdd.png"
    },
    on: {
      "click": _vm.addRegion
    }
  })]), _c('list', [_c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [(_vm.regionList.length != 0) ? _c('div', {
    staticClass: ["centerBox"]
  }, [_vm._m(0), _c('list', {
    staticClass: ["centerScroll"]
  }, _vm._l((_vm.regionList), function(item, index) {
    return _c('cell', {
      key: index,
      staticClass: ["cell"],
      appendAsTree: true,
      attrs: {
        "append": "tree"
      }
    }, [_c('div', {
      staticClass: ["swiperBox"]
    }, [_c('div', {
      ref: "itemDev",
      refInFor: true,
      staticClass: ["swiperItem"],
      on: {
        "swipe": function($event) {
          _vm.handleSwipe($event, index)
        }
      }
    }, [_c('div', {
      staticClass: ["regionItem"]
    }, [_c('div', {
      staticClass: ["regionItems"],
      on: {
        "click": function($event) {
          _vm.toSub(item.id, item.parentId)
        }
      }
    }, [_c('img', {
      staticClass: ["centerIcon"],
      attrs: {
        "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/regionIcon.png"
      }
    }), _c('text', {
      staticClass: ["centerName"]
    }, [_vm._v(_vm._s(item.name))])])]), _c('div', {
      staticClass: ["swiperBtn"]
    }, [_c('div', {
      staticClass: ["setting"],
      on: {
        "click": function($event) {
          _vm.setAdministrator(item.id)
        }
      }
    }, [_c('text', {
      staticStyle: {
        color: "#FFFFFF",
        fontSize: "19px"
      }
    }, [_vm._v("设置")]), _c('text', {
      staticStyle: {
        color: "#FFFFFF",
        fontSize: "19px"
      }
    }, [_vm._v("负责人")])]), _c('div', {
      staticClass: ["edit"],
      on: {
        "click": function($event) {
          _vm.editRegion(item.id, item.name)
        }
      }
    }, [_c('text', {
      staticStyle: {
        color: "#FFFFFF",
        fontSize: "19px"
      }
    }, [_vm._v("编辑")])]), _c('div', {
      staticClass: ["remove"],
      on: {
        "click": function($event) {
          _vm.removeItem(item.id, index)
        }
      }
    }, [_c('text', {
      staticStyle: {
        color: "#FFFFFF",
        fontSize: "19px"
      }
    }, [_vm._v("删除")])])])])])])
  }))]) : _vm._e(), (_vm.clubList.length != 0) ? _c('div', {
    staticClass: ["centerBox"]
  }, [_c('div', {
    staticClass: ["centerManage"]
  }, [_c('text', {
    staticClass: ["centerTxt"]
  }, [_vm._v("门店")]), (_vm.showChooseCenter) ? _c('div', {
    staticClass: ["manageBtn"]
  }, [(_vm.centerIdList.length == 0) ? _c('text', {
    staticClass: ["submitBtn"]
  }, [_vm._v("确认")]) : _c('text', {
    staticClass: ["submitBtn"],
    on: {
      "click": _vm.moveRegion
    }
  }, [_vm._v("确认(" + _vm._s(_vm.centerIdList.length) + ")")]), _c('text', {
    staticClass: ["cancelBtn"],
    on: {
      "click": _vm.cancelSelect
    }
  }, [_vm._v("取消")])]) : _c('div', {
    staticClass: ["manageBtn"]
  }, [_c('text', {
    staticClass: ["cancelBtn"],
    on: {
      "click": _vm.moveCenterEvent
    }
  }, [_vm._v("移动门店")])])]), _c('list', {
    staticClass: ["centerScroll"]
  }, _vm._l((_vm.clubList), function(item, index) {
    return _c('cell', {
      key: index,
      staticClass: ["cell"],
      appendAsTree: true,
      attrs: {
        "append": "tree"
      },
      on: {
        "click": function($event) {
          _vm.selectCenter(item.clubId)
        }
      }
    }, [_c('div', {
      staticClass: ["centerItem"]
    }, [_c('div', {
      staticClass: ["centerMess"]
    }, [_c('img', {
      staticClass: ["centerIcon"],
      attrs: {
        "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/centerImg.png"
      }
    }), _c('text', {
      staticClass: ["centerName"]
    }, [_vm._v(_vm._s(item.clubName || '未命名'))])]), (_vm.showChooseCenter) ? _c('img', {
      staticClass: ["selectedBtn"],
      attrs: {
        "src": item.selected ? 'https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/selected.png' : 'https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/emptySelected.png'
      },
      on: {
        "click": function($event) {
          _vm.selectCenter(item.clubId)
        }
      }
    }) : _vm._e()])])
  }))]) : _vm._e()])])]), (_vm.showAddRegion) ? _c('div', {
    staticClass: ["bg"],
    style: {
      height: _vm.popHeight
    },
    on: {
      "click": _vm.hideAddRegion
    }
  }, [_c('div', {
    staticClass: ["addregionBox"],
    on: {
      "click": _vm.empty
    }
  }, [_c('text', {
    staticClass: ["addReginTxt"]
  }, [_vm._v(_vm._s(_vm.title))]), _c('div', {
    staticClass: ["nameBox"]
  }, [_c('input', {
    ref: "inputText",
    staticClass: ["nameInput"],
    attrs: {
      "placeholder": "请输入区域名称，不超过八个字",
      "placeholderColor": "#CCCCCC",
      "maxlength": "8",
      "value": (_vm.regionName)
    },
    on: {
      "input": function($event) {
        _vm.regionName = $event.target.attr.value
      }
    }
  }), (_vm.regionName != '') ? _c('img', {
    staticClass: ["cancelIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/greyCancel.png"
    },
    on: {
      "click": _vm.clearName
    }
  }) : _vm._e()]), _c('div', {
    staticClass: ["regionBtnBox"]
  }, [_c('text', {
    staticClass: ["cencelAdd"],
    on: {
      "click": _vm.hideAddRegion
    }
  }, [_vm._v("取消")]), _c('text', {
    staticClass: ["submitAdd"],
    on: {
      "click": _vm.submitAddRegion
    }
  }, [_vm._v("确认")])])])]) : _vm._e(), (_vm.showDeleteRegion) ? _c('div', {
    staticClass: ["bg"],
    style: {
      height: _vm.popHeight
    },
    on: {
      "click": _vm.hideDeleteRegion
    }
  }, [_c('div', {
    staticClass: ["deleteRegionBox"],
    on: {
      "click": _vm.empty
    }
  }, [_c('text', {
    staticClass: ["addReginTxt"]
  }, [_vm._v("确认要删除当前区域么？")]), _c('div', {
    staticClass: ["regionBtnBox"]
  }, [_c('text', {
    staticClass: ["cencelAdd"],
    on: {
      "click": _vm.hideDeleteRegion
    }
  }, [_vm._v("取消")]), _c('text', {
    staticClass: ["submitAdd"],
    on: {
      "click": _vm.submitDeleteRegion
    }
  }, [_vm._v("确认")])])])]) : _vm._e()])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["centerManage"]
  }, [_c('text', {
    staticClass: ["centerTxt"]
  }, [_vm._v("区域")]), _c('div', {
    staticClass: ["manageBtn"]
  })])
}]}
module.exports.render._withStripped = true

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(8)
)

/* script */
__vue_exports__ = __webpack_require__(9)

/* template */
var __vue_template__ = __webpack_require__(10)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\weex项目\\教练派区域门店管理\\regionManage\\src\\components\\selectRegion.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-ad3d9600"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = {
  "greyTxt": {
    "color": "#999999",
    "fontSize": "19"
  },
  "blueTtxt": {
    "color": "#108EE9",
    "fontSize": "19"
  },
  "beforeStepBox": {
    "alignItems": "center",
    "flexDirection": "row",
    "borderRightColor": "#999999",
    "borderRightStyle": "solid",
    "paddingRight": "12",
    "borderRightWidth": "1",
    "marginRight": "12"
  },
  "beforeIcon": {
    "width": "23",
    "height": "23"
  },
  "beforeImg": {
    "width": "23",
    "height": "23",
    "marginLeft": "8",
    "marginRight": "8"
  },
  "areaList": {
    "width": "750",
    "height": "75",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "rightRegionBox": {
    "flexDirection": "row",
    "alignItems": "center"
  },
  "navBox": {
    "width": "750",
    "height": "75",
    "backgroundColor": "#ffffff",
    "marginBottom": "9",
    "alignItems": "center",
    "flexDirection": "row",
    "paddingLeft": "23"
  },
  "deleteRegionBox": {
    "width": "516",
    "height": "263",
    "backgroundColor": "#ffffff",
    "borderRadius": "6",
    "alignItems": "center"
  },
  "regionBox": {
    "backgroundColor": "#F6F6F6"
  },
  "centerScroll": {
    "width": "750",
    "backgroundColor": "#ffffff",
    "paddingLeft": "23"
  },
  "headerBox": {
    "width": "750",
    "height": "70",
    "alignItems": "center",
    "backgroundColor": "#4C5160",
    "justifyContent": "space-between",
    "paddingLeft": "19",
    "paddingRight": "19",
    "flexDirection": "row"
  },
  "leftBox": {
    "alignItems": "center",
    "justifyContent": "space-between",
    "color": "#ffffff",
    "flexDirection": "row"
  },
  "returnIcon": {
    "width": "28",
    "height": "28",
    "marginRight": "8"
  },
  "rightBox": {
    "color": "#FFFFFF",
    "fontSize": "19"
  },
  "centerTxt": {
    "fontSize": "17",
    "color": "#999999",
    "marginLeft": "23"
  },
  "manageBtn": {
    "flexDirection": "row"
  },
  "centerManage": {
    "height": "64",
    "justifyContent": "space-between",
    "width": "750",
    "flexDirection": "row",
    "alignItems": "center",
    "backgroundColor": "#f6f6f6"
  },
  "submitBtn": {
    "width": "80",
    "height": "34",
    "lineHeight": "34",
    "textAlign": "center",
    "backgroundColor": "#108EE9",
    "color": "#FFFFFF",
    "fontSize": "15",
    "borderRadius": "4",
    "marginRight": "19",
    "borderColor": "#108EE9",
    "borderWidth": "1",
    "borderStyle": "solid"
  },
  "cancelBtn": {
    "width": "80",
    "height": "34",
    "color": "#666666",
    "lineHeight": "34",
    "textAlign": "center",
    "fontSize": "15",
    "borderRadius": "4",
    "marginRight": "23",
    "borderColor": "#666666",
    "borderWidth": "1",
    "borderStyle": "solid"
  },
  "centerItem": {
    "height": "93",
    "width": "750",
    "paddingLeft": "25",
    "borderBottomWidth": "1",
    "borderBottomColor": "#F6F6F6",
    "borderBottomStyle": "solid",
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "space-between",
    "backgroundColor": "#ffffff"
  },
  "centerMess": {
    "alignItems": "center",
    "flexDirection": "row"
  },
  "centerIcon": {
    "width": "34",
    "height": "34",
    "marginRight": "19"
  },
  "centerName": {
    "color": "#333333",
    "fontSize": "19"
  },
  "bottomBox": {
    "position": "absolute",
    "bottom": "0",
    "borderTopWidth": "1",
    "borderTopStyle": "solid",
    "borderTopColor": "#CCCCCC",
    "width": "750",
    "height": "93",
    "alignItems": "center",
    "justifyContent": "center",
    "backgroundColor": "#ffffff",
    "flexDirection": "row"
  },
  "newRegion": {
    "borderColor": "#DCDCDC",
    "borderWidth": "1",
    "borderStyle": "solid",
    "borderRadius": "50",
    "textAlign": "center",
    "lineHeight": "66",
    "fontSize": "23",
    "color": "#666666",
    "marginRight": "38",
    "width": "290",
    "height": "66"
  },
  "moveRegion": {
    "borderColor": "#108EE9",
    "borderWidth": "1",
    "borderStyle": "solid",
    "borderRadius": "50",
    "textAlign": "center",
    "lineHeight": "66",
    "backgroundColor": "#108EE9",
    "fontSize": "23",
    "color": "#ffffff",
    "width": "290",
    "height": "66"
  },
  "emptyBox": {
    "width": "750",
    "alignItems": "center",
    "justifyContent": "center",
    "borderTopStyle": "solid",
    "borderTopWidth": "10",
    "borderTopColor": "#F6F6F6",
    "backgroundColor": "#ffffff"
  },
  "emptyIcon": {
    "width": "455",
    "height": "233"
  },
  "emptyTxt": {
    "color": "rgba(0,0,0,0.45)",
    "fontSize": "23"
  },
  "bg": {
    "backgroundColor": "rgba(0,0,0,0.6)",
    "position": "absolute",
    "top": 0,
    "left": 0,
    "width": "750",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "addregionBox": {
    "width": "516",
    "height": "383",
    "backgroundColor": "#ffffff",
    "borderRadius": "6",
    "alignItems": "center"
  },
  "addReginTxt": {
    "color": "#333333",
    "fontSize": "30",
    "marginTop": "58",
    "marginBottom": "50",
    "width": "516",
    "textAlign": "center"
  },
  "nameBox": {
    "width": "375",
    "borderBottomColor": "#f6d6f6",
    "borderBottomStyle": "solid",
    "borderBottomWidth": "1",
    "paddingBottom": "23",
    "alignItems": "center",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "marginBottom": "58"
  },
  "nameInput": {
    "width": "315",
    "height": "40",
    "fontSize": "22",
    "textAlign": "left",
    "paddingLeft": "10",
    "borderColor": "#ffffff"
  },
  "cancelIcon": {
    "width": "28",
    "height": "28"
  },
  "regionBtnBox": {
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "cencelAdd": {
    "width": "195",
    "height": "56",
    "borderColor": "#DCDCDC",
    "borderStyle": "solid",
    "borderWidth": "1",
    "borderRadius": "30",
    "textAlign": "center",
    "lineHeight": "58",
    "color": "#666666",
    "fontSize": "19",
    "marginRight": "28"
  },
  "submitAdd": {
    "width": "195",
    "height": "56",
    "borderColor": "#1890FF",
    "backgroundColor": "#1890FF",
    "borderStyle": "solid",
    "borderWidth": "1",
    "borderRadius": "30",
    "textAlign": "center",
    "lineHeight": "58",
    "color": "#ffffff",
    "fontSize": "19"
  }
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var modal = weex.requireModule("modal");
var storage = weex.requireModule('storage');
var stream = weex.requireModule('stream');
var nativeMoudle = weex.requireModule('nativeModule');
exports.default = {
    data: function data() {
        return {
            list: [],
            height: '',
            centerIdList: [],
            showAddRegion: '',
            regionName: '',
            showMoveRegion: false,
            token: 'eyJuYW1lIjoiRWxpemEiLCJwaG9uZSI6IjEzMjkxODM0OTQyIiwiYWNjb3VudElkIjo2LCJhY2NvdW50VHlwZSI6Miwid2VjaGF0SWQiOm51bGwsInRpY2tzIjoxNTU4NjAyNDQ0NzEyfQ==.pOk8SKFjMUjap+JjBQyEbnfYpVdYj4qnhzvui+DgoTQ=',
            webHost: 'http://10.0.0.216:9090',
            regionId: -1,
            headerRegionList: [],
            lastHeaderRegionId: -1,
            beforeHeaderRegionId: -1,
            superRegionId: '',
            popHeight: '',
            isAllHeader: -1,
            componentVisibility: 'hidden'
        };
    },
    created: function created() {
        var that = this;
        nativeMoudle.showProgressDialog();
        that.height = 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight + 30;
        storage.getItem('centerIdList', function (res) {
            if (res.result == 'success') {
                that.centerIdList = JSON.parse(res.data);
            }
        });
        nativeMoudle.getMetaData(function (map) {
            that.token = map.token;
        });
        setTimeout(function () {
            that.getRegionList(that.regionId);
        }, 50);
        weex.requireModule('globalEvent').addEventListener('androidback', function (e) {
            that.returnMain();
        });
    },

    methods: {
        returnMain: function returnMain() {
            this.$router.go(-1);
            storage.removeItem('centerIdList');
        },
        getRegionList: function getRegionList(id) {
            var that = this;
            nativeMoudle.showProgressDialog();
            stream.fetch({
                method: 'GET',
                url: that.webHost + '/api/region/list/' + id,
                type: 'json',
                headers: {
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN': that.token
                }
            }, function (ret) {
                if (ret.ok) {
                    nativeMoudle.progressDialogDismiss();
                    if (ret.data.status == 0) {
                        if (id == -1) {
                            that.isAllHeader = -1;
                        } else {
                            that.isAllHeader = 0;
                        }
                        if (ret.data.data.regionInfo == null || ret.data.data.regionInfo == '' || ret.data.data.regionInfo == undefined) {
                            that.list = [];
                        } else {
                            that.list = ret.data.data.regionInfo;
                        }
                        if (that.list.length == 0) {
                            that.componentVisibility = 'visible';
                        } else {
                            that.componentVisibility = 'hidden';
                        }
                        if (ret.data.data.headerRegions == null || ret.data.data.headerRegions == '' || ret.data.data.headerRegions == undefined) {
                            that.headerRegionList = [];
                        } else {
                            that.headerRegionList = ret.data.data.headerRegions;
                            that.lastHeaderRegionId = ret.data.data.headerRegions[ret.data.data.headerRegions.length - 1].headerRegionId;
                            if (ret.data.data.headerRegions.length >= 2) {
                                that.beforeHeaderRegionId = ret.data.data.headerRegions[ret.data.data.headerRegions.length - 2].headerRegionId;
                            } else {
                                that.beforeHeaderRegionId = -1;
                            }
                        }
                        if (ret.data.data.superRegionInfo == null || ret.data.data.superRegionInfo == '' || ret.data.data.superRegionInfo == undefined) {
                            that.superRegionId = '';
                        } else {
                            that.superRegionId = ret.data.data.superRegionInfo.id;
                        }
                    } else {
                        nativeMoudle.toastError(ret.data.message);
                    }
                } else {
                    nativeMoudle.toastError('网络错误！');
                }
            }, function (response) {});
        },
        moveSubmit: function moveSubmit() {
            this.showMoveRegion = true;
        },
        submitMove: function submitMove() {
            var that = this;
            nativeMoudle.showProgressDialog();
            var centerStr = that.centerIdList.join(',');
            var id = that.lastHeaderRegionId == -1 ? that.superRegionId : that.lastHeaderRegionId;
            stream.fetch({
                method: 'POST',
                url: that.webHost + '/api/region/club/move/' + id + '?clubIds=' + centerStr,
                type: 'json',
                headers: {
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN': that.token
                },
                body: JSON.stringify([])
            }, function (ret) {
                if (ret.ok) {
                    nativeMoudle.progressDialogDismiss();
                    that.showMoveRegion = false;
                    if (ret.data.status == 0) {
                        nativeMoudle.toastSuccess('移动成功!');
                        setTimeout(function () {
                            that.$router.go(-1);
                        }, 500);
                    } else {
                        modal.toastError({ message: ret.data.message });
                    }
                } else {
                    nativeMoudle.toastError('网络错误！');
                }
            }, function (response) {});
        },
        empty: function empty() {},
        clearName: function clearName() {
            this.regionName = '';
            this.$refs.inputText.blur();
        },
        addRegion: function addRegion() {
            this.showAddRegion = true;
        },
        hideAddRegion: function hideAddRegion() {
            this.$refs.inputText.blur();
            this.regionName = '';
            this.showAddRegion = false;
        },
        submitAddRegion: function submitAddRegion() {
            this.$refs.inputText.blur();
            var that = this;
            if (that.regionName == '') {
                nativeMoudle.toastError('请输入区域名称');
                return;
            }
            var arr = JSON.stringify({
                parentId: that.lastHeaderRegionId == -1 ? that.superRegionId : that.lastHeaderRegionId,
                regionName: that.regionName
            });
            var URL = that.webHost + '/api/region/add';
            var method = 'POST';
            nativeMoudle.showProgressDialog();
            stream.fetch({
                method: method,
                url: URL,
                type: 'json',
                headers: {
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN': that.token
                },
                body: arr
            }, function (ret) {
                if (ret.ok) {
                    nativeMoudle.progressDialogDismiss();
                    if (ret.data.status == 0) {
                        nativeMoudle.toastSuccess('操作成功');
                        that.hideAddRegion();

                        setTimeout(function () {
                            that.getRegionList(that.lastHeaderRegionId);
                        }, 200);
                    } else {
                        nativeMoudle.toastError(ret.data.message);
                        that.showAddRegion = false;
                    }
                } else {
                    nativeMoudle.toastError('网络错误！');
                }
            }, function (response) {});
        }
    }
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["warpper"]
  }, [_c('div', {
    staticClass: ["regionBox"],
    style: {
      height: _vm.height
    }
  }, [_c('div', {
    staticClass: ["headerBox"]
  }, [_c('div', {
    staticClass: ["leftBox"]
  }, [_c('img', {
    staticClass: ["returnIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/whiteBack.png"
    },
    on: {
      "click": _vm.returnMain
    }
  }), _c('text', {
    staticStyle: {
      color: "#ffffff"
    },
    on: {
      "click": _vm.returnMain
    }
  }, [_vm._v("选择区域")])]), _c('text', {
    staticClass: ["rightBox"],
    on: {
      "click": _vm.returnMain
    }
  }, [_vm._v("取消")])]), (_vm.isAllHeader != -1) ? _c('div', {
    staticClass: ["navBox"]
  }, [_c('div', {
    staticClass: ["beforeStepBox"]
  }, [_c('text', {
    staticStyle: {
      color: "#108EE9",
      fontSize: "19px"
    },
    on: {
      "click": function($event) {
        _vm.getRegionList(_vm.beforeHeaderRegionId)
      }
    }
  }, [_vm._v("返回上一级")]), _c('img', {
    staticClass: ["beforeIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/beforeStep.png"
    }
  })]), _c('div', {
    staticClass: ["areaList"]
  }, [_c('text', {
    staticClass: ["blueTtxt"],
    on: {
      "click": function($event) {
        _vm.getRegionList(-1)
      }
    }
  }, [_vm._v("全部")]), _vm._l((_vm.headerRegionList), function(item, index) {
    return (_vm.headerRegionList.length != 0) ? _c('div', {
      key: index,
      staticClass: ["rightRegionBox"]
    }, [_c('img', {
      staticClass: ["beforeImg"],
      attrs: {
        "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/nextIcon.png"
      }
    }), (item.headerRegionId != _vm.lastHeaderRegionId) ? _c('text', {
      staticClass: ["blueTtxt"],
      on: {
        "click": function($event) {
          _vm.getRegionList(item.headerRegionId)
        }
      }
    }, [_vm._v(_vm._s(item.headerRegionName))]) : _vm._e(), (item.headerRegionId == _vm.lastHeaderRegionId) ? _c('text', {
      staticClass: ["greyTxt"]
    }, [_vm._v(_vm._s(item.headerRegionName))]) : _vm._e()]) : _vm._e()
  })], 2)]) : _vm._e(), _c('list', {
    staticClass: ["scroller"]
  }, [_c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('div', {
    staticClass: ["centerBox"]
  }, [(_vm.list.length != 0) ? _c('div', [_vm._m(0), _vm._l((_vm.list), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: ["centerItem"],
      on: {
        "click": function($event) {
          _vm.getRegionList(item.id)
        }
      }
    }, [_c('div', {
      staticClass: ["centerMess"]
    }, [_c('img', {
      staticClass: ["centerIcon"],
      attrs: {
        "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/regionIcon.png"
      }
    }), _c('text', {
      staticClass: ["centerName"]
    }, [_vm._v(_vm._s(item.name))])])])
  })], 2) : _vm._e(), (_vm.list.length == 0) ? _c('div', {
    staticClass: ["emptyBox"],
    style: {
      height: _vm.height - 158,
      visibility: _vm.componentVisibility
    }
  }, [_c('img', {
    staticClass: ["emptyIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/emptyIcon.png"
    }
  }), _c('text', {
    staticClass: ["emptyTxt"]
  }, [_vm._v("该区域暂无内容")])]) : _vm._e()])])]), _c('div', {
    staticClass: ["bottomBox"]
  }, [_c('text', {
    staticClass: ["newRegion"],
    on: {
      "click": _vm.addRegion
    }
  }, [_vm._v("新建区域")]), _c('text', {
    staticClass: ["moveRegion"],
    on: {
      "click": _vm.moveSubmit
    }
  }, [_vm._v("移动")])])]), (_vm.showAddRegion) ? _c('div', {
    staticClass: ["bg"],
    style: {
      height: _vm.height
    },
    on: {
      "click": _vm.hideAddRegion
    }
  }, [_c('div', {
    staticClass: ["addregionBox"],
    on: {
      "click": _vm.empty
    }
  }, [_c('text', {
    staticClass: ["addReginTxt"]
  }, [_vm._v("添加区域")]), _c('div', {
    staticClass: ["nameBox"]
  }, [_c('input', {
    ref: "inputText",
    staticClass: ["nameInput"],
    attrs: {
      "placeholder": "请输入区域名称，不超过八个字",
      "placeholderColor": "#CCCCCC",
      "value": (_vm.regionName)
    },
    on: {
      "input": function($event) {
        _vm.regionName = $event.target.attr.value
      }
    }
  }), (_vm.regionName != '') ? _c('img', {
    staticClass: ["cancelIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/greyCancel.png"
    },
    on: {
      "click": _vm.clearName
    }
  }) : _vm._e()]), _c('div', {
    staticClass: ["regionBtnBox"]
  }, [_c('text', {
    staticClass: ["cencelAdd"],
    on: {
      "click": _vm.hideAddRegion
    }
  }, [_vm._v("取消")]), _c('text', {
    staticClass: ["submitAdd"],
    on: {
      "click": _vm.submitAddRegion
    }
  }, [_vm._v("确认")])])])]) : _vm._e(), (_vm.showMoveRegion) ? _c('div', {
    staticClass: ["bg"],
    style: {
      height: _vm.height
    },
    on: {
      "click": _vm.hideDeleteRegion
    }
  }, [_c('div', {
    staticClass: ["deleteRegionBox"],
    on: {
      "click": _vm.empty
    }
  }, [_c('text', {
    staticClass: ["addReginTxt"]
  }, [_vm._v("确认要移动门店到该区域吗？")]), _c('div', {
    staticClass: ["regionBtnBox"]
  }, [_c('text', {
    staticClass: ["cencelAdd"],
    on: {
      "click": function($event) {
        _vm.showMoveRegion = false;
      }
    }
  }, [_vm._v("取消")]), _c('text', {
    staticClass: ["submitAdd"],
    on: {
      "click": _vm.submitMove
    }
  }, [_vm._v("确认")])])])]) : _vm._e()])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["centerManage"]
  }, [_c('text', {
    staticClass: ["centerTxt"]
  }, [_vm._v("区域")]), _c('div', {
    staticClass: ["manageBtn"]
  })])
}]}
module.exports.render._withStripped = true

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(12)
)

/* script */
__vue_exports__ = __webpack_require__(13)

/* template */
var __vue_template__ = __webpack_require__(14)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\weex项目\\教练派区域门店管理\\regionManage\\src\\components\\adminList.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-d1d2c766"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = {
  "swiperBox": {
    "width": "750",
    "height": "93"
  },
  "swiperItem": {
    "flexDirection": "row",
    "width": "844"
  },
  "swiperBtn": {
    "width": "94",
    "height": "93",
    "flexDirection": "row"
  },
  "remove": {
    "width": "94",
    "height": "93",
    "alignItems": "center",
    "justifyContent": "center",
    "backgroundColor": "#E65142",
    "color": "#ffffff",
    "fontSize": "19"
  },
  "regionBox": {
    "backgroundColor": "#F6F6F6"
  },
  "centerScroll": {
    "width": "750",
    "backgroundColor": "#ffffff"
  },
  "headerBox": {
    "width": "750",
    "height": "70",
    "alignItems": "center",
    "backgroundColor": "#4C5160",
    "justifyContent": "space-between",
    "paddingLeft": "19",
    "paddingRight": "19",
    "flexDirection": "row"
  },
  "leftBox": {
    "alignItems": "center",
    "justifyContent": "space-between",
    "color": "#ffffff",
    "flexDirection": "row"
  },
  "returnIcon": {
    "width": "28",
    "height": "28",
    "marginRight": "8"
  },
  "rightBox": {
    "color": "#4C5160",
    "fontSize": "19"
  },
  "centerItem": {
    "height": "93",
    "width": "750",
    "borderBottomWidth": "1",
    "borderBottomColor": "#F6F6F6",
    "borderBottomStyle": "solid",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "personIcon": {
    "width": "41",
    "height": "41",
    "marginRight": "14",
    "marginLeft": "24",
    "borderRadius": "100"
  },
  "centerName": {
    "color": "#333333",
    "fontSize": "19"
  },
  "centerPhone": {
    "color": "#999999",
    "fontSize": "16"
  },
  "bottomBox": {
    "position": "absolute",
    "bottom": "0",
    "borderTopWidth": "1",
    "borderTopStyle": "solid",
    "borderTopColor": "#CCCCCC",
    "width": "750",
    "height": "60",
    "alignItems": "center",
    "justifyContent": "center",
    "backgroundColor": "#ffffff",
    "flexDirection": "row"
  },
  "addAdmin": {
    "width": "750",
    "height": "60",
    "textAlign": "center",
    "lineHeight": "60",
    "backgroundColor": "#108EE9",
    "color": "#ffffff"
  },
  "emptyBox": {
    "width": "750",
    "alignItems": "center",
    "justifyContent": "center",
    "borderTopStyle": "solid",
    "borderTopWidth": "10",
    "borderTopColor": "#F6F6F6",
    "backgroundColor": "#ffffff"
  },
  "emptyIcon": {
    "width": "455",
    "height": "233"
  },
  "emptyTxt": {
    "color": "rgba(0,0,0,0.45)",
    "fontSize": "23"
  },
  "bg": {
    "backgroundColor": "rgba(0,0,0,0.6)",
    "position": "absolute",
    "top": 0,
    "left": 0,
    "width": "750",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "addregionBox": {
    "width": "516",
    "height": "263",
    "backgroundColor": "#ffffff",
    "borderRadius": "6",
    "alignItems": "center"
  },
  "addReginTxt": {
    "color": "#333333",
    "fontSize": "30",
    "marginTop": "61",
    "marginBottom": "50",
    "width": "516",
    "textAlign": "center"
  },
  "regionBtnBox": {
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "cencelAdd": {
    "width": "195",
    "height": "56",
    "borderColor": "#DCDCDC",
    "borderStyle": "solid",
    "borderWidth": "1",
    "borderRadius": "30",
    "textAlign": "center",
    "lineHeight": "58",
    "color": "#666666",
    "fontSize": "19",
    "marginRight": "28"
  },
  "submitAdd": {
    "width": "195",
    "height": "56",
    "borderColor": "#1890FF",
    "backgroundColor": "#1890FF",
    "borderStyle": "solid",
    "borderWidth": "1",
    "borderRadius": "30",
    "textAlign": "center",
    "lineHeight": "58",
    "color": "#ffffff",
    "fontSize": "19"
  }
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var modal = weex.requireModule("modal");
var storage = weex.requireModule('storage');
var animation = weex.requireModule('animation');
var stream = weex.requireModule('stream');
var nativeMoudle = weex.requireModule('nativeModule');
exports.default = {
    data: function data() {
        return {
            list: [],
            height: '',
            showDeleteRegion: '',
            regionId: '',
            nowIndex: -1,
            deleteIndex: '',
            token: 'eyJuYW1lIjoiRWxpemEiLCJwaG9uZSI6IjEzMjkxODM0OTQyIiwiYWNjb3VudElkIjo2LCJhY2NvdW50VHlwZSI6Miwid2VjaGF0SWQiOm51bGwsInRpY2tzIjoxNTU4NjAyNDQ0NzEyfQ==.pOk8SKFjMUjap+JjBQyEbnfYpVdYj4qnhzvui+DgoTQ=',
            webHost: 'http://10.0.0.216:9090',
            actionRegionId: null,
            popHeight: '',
            componentVisibility: 'hidden'
        };
    },
    created: function created() {
        var that = this;
        nativeMoudle.showProgressDialog();
        that.height = 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight + 30;
        that.regionId = that.$route.query.id;
        nativeMoudle.getMetaData(function (map) {
            that.token = map.token;
        });
        setTimeout(function () {
            that.getCoachList();
        }, 50);
        weex.requireModule('globalEvent').addEventListener('androidback', function (e) {
            that.returnMain();
        });
    },

    methods: {
        returnMain: function returnMain() {
            this.$router.go(-1);
        },
        empty: function empty() {},
        hideDeleteRegion: function hideDeleteRegion() {
            this.showDeleteRegion = false;
        },
        submitDeleteRegion: function submitDeleteRegion() {
            var that = this;
            nativeMoudle.showProgressDialog();
            stream.fetch({
                method: 'DELETE',
                url: that.webHost + '/api/region/trainer/delete/' + that.actionRegionId,
                type: 'json',
                headers: {
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN': that.token
                }
            }, function (ret) {
                if (ret.ok) {
                    nativeMoudle.progressDialogDismiss();
                    if (ret.data.status == 0) {
                        nativeMoudle.toastSuccess('删除成功');
                        that.showDeleteRegion = false;
                        setTimeout(function () {
                            that.goRight(that.deleteIndex, 0);
                            that.list.splice(that.deleteIndex, 1);
                            that.getCoachList();
                        }, 500);
                    } else {
                        nativeMoudle.toastError(ret.data.message);
                        that.showDeleteRegion = false;
                    }
                } else {
                    nativeMoudle.toastError('网络错误！');
                }
            }, function (response) {});
        },
        getCoachList: function getCoachList() {
            var that = this;
            nativeMoudle.showProgressDialog();
            stream.fetch({
                method: 'GET',
                url: that.webHost + '/api/region/trainer/1/list/' + that.regionId,
                type: 'json',
                headers: {
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN': that.token
                }
            }, function (ret) {
                if (ret.ok) {
                    nativeMoudle.progressDialogDismiss();
                    if (ret.data.status == 0) {
                        that.list = [];
                        var list = ret.data.data;
                        for (var i = 0, len = list.length; i < len; i++) {
                            if (list[i].authType != 5) {
                                that.list.push(list[i]);
                            }
                        }
                        if (that.list.length == 0) {
                            that.componentVisibility = 'visible';
                        }
                    } else {
                        nativeMoudle.toastError(ret.data.message);
                    }
                } else {
                    nativeMoudle.toastError('网络错误！');
                }
            }, function (response) {});
        },
        handleSwipe: function handleSwipe(e, index) {
            if (e.direction == "left") {
                this.goRight(this.nowIndex);
                this.goLeft(index);
            } else if (e.direction == "right") {
                this.goRight(index);
            }
            // modal.toast({message:"==" + e.direction + "==" + index, duration:1});
        },
        goLeft: function goLeft(index) {
            var itemEl = this.$refs.itemDev[index];
            //第二左滑条目与前一次左滑条目相同时，不处理
            if (index == this.currentIndex) {
                return;
            }
            //当前有划出的条目的时候，左滑其他条目，当前的条目归位，
            if (this.currentIndex != -1) {
                this.goRight(this.currentIndex);
            }
            //左滑当前条目
            if (this.currentIndex != index) {
                animation.transition(itemEl, {
                    styles: {
                        transform: 'translate(-94px, 0px)',
                        transformOrigin: 'center center'
                    },
                    duration: 200, //ms
                    timingFunction: 'linear',
                    delay: 0 //ms
                }, function () {});
                this.currentIndex = index;
                this.nowIndex = index;
            }
        },

        //time是动画时间，给个默认值 200毫秒，不传就表明这个值为200毫秒
        goRight: function goRight(index) {
            var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;

            var itemEl = this.$refs.itemDev[index];
            animation.transition(itemEl, {
                styles: {
                    transform: 'translate(0px, 0px)',
                    transformOrigin: 'center center'
                },
                duration: time, //动画时间
                timingFunction: 'linear', //线性运动
                delay: 0 //ms
            }, function () {});
            this.currentIndex = -1;
        },

        //点击删除
        removeItem: function removeItem(id, index) {
            this.showDeleteRegion = true;
            this.deleteIndex = index;
            this.actionRegionId = id;
        },
        addAdminEvent: function addAdminEvent() {
            var that = this;
            that.$router.push({ name: 'chooseAdmin', query: { areaId: that.regionId } });
        }
    }
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["warpper"]
  }, [_c('div', {
    staticClass: ["regionBox"],
    style: {
      height: _vm.height
    }
  }, [_c('div', {
    staticClass: ["headerBox"]
  }, [_c('div', {
    staticClass: ["leftBox"]
  }, [_c('img', {
    staticClass: ["returnIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/whiteBack.png"
    },
    on: {
      "click": _vm.returnMain
    }
  }), _c('text', {
    staticStyle: {
      color: "#ffffff"
    },
    on: {
      "click": _vm.returnMain
    }
  }, [_vm._v("设置区域负责人")])]), _c('text', {
    staticClass: ["rightBox"]
  }, [_vm._v("取消")])]), _c('list', {
    staticClass: ["scroller"]
  }, [_c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('div', {
    staticClass: ["centerBox"]
  }, [(_vm.list.length != 0) ? _c('list', {
    staticClass: ["centerScroll"]
  }, _vm._l((_vm.list), function(item, index) {
    return _c('cell', {
      key: index,
      staticClass: ["cell"],
      appendAsTree: true,
      attrs: {
        "append": "tree"
      }
    }, [_c('div', {
      staticClass: ["swiperBox"]
    }, [_c('div', {
      ref: "itemDev",
      refInFor: true,
      staticClass: ["swiperItem"],
      on: {
        "swipe": function($event) {
          _vm.handleSwipe($event, index)
        }
      }
    }, [_c('div', {
      staticClass: ["centerItem"]
    }, [_c('img', {
      staticClass: ["personIcon"],
      attrs: {
        "src": item.trainerPhoto == null ? 'https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/defaultAvata.png' : item.trainerPhoto
      }
    }), _c('div', {
      staticClass: ["centerMess"]
    }, [_c('text', {
      staticClass: ["centerName"]
    }, [_vm._v(_vm._s(item.trainerName))]), _c('text', {
      staticClass: ["centerPhone"]
    }, [_vm._v(_vm._s(item.trainerPhone))])])]), _c('div', {
      staticClass: ["swiperBtn"]
    }, [_c('div', {
      staticClass: ["remove"],
      on: {
        "click": function($event) {
          _vm.removeItem(item.regionTrainerId, index)
        }
      }
    }, [_c('text', {
      staticStyle: {
        color: "#FFFFFF",
        fontSize: "19px"
      }
    }, [_vm._v("移除")])])])])])])
  })) : _c('div', {
    staticClass: ["emptyBox"],
    style: {
      height: _vm.height - 120,
      visibility: _vm.componentVisibility
    }
  }, [_c('img', {
    staticClass: ["emptyIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/emptyIcon.png"
    }
  }), _c('text', {
    staticClass: ["emptyTxt"]
  }, [_vm._v("这片区域无人管辖")])])])])]), _c('div', {
    staticClass: ["bottomBox"]
  }, [_c('text', {
    staticClass: ["addAdmin"],
    on: {
      "click": _vm.addAdminEvent
    }
  }, [_vm._v("添加负责人")])])]), (_vm.showDeleteRegion) ? _c('div', {
    staticClass: ["bg"],
    style: {
      height: _vm.height
    },
    on: {
      "click": _vm.hideDeleteRegion
    }
  }, [_c('div', {
    staticClass: ["addregionBox"],
    on: {
      "click": _vm.empty
    }
  }, [_c('text', {
    staticClass: ["addReginTxt"]
  }, [_vm._v("确认要删除当前负责人么？")]), _c('div', {
    staticClass: ["regionBtnBox"]
  }, [_c('text', {
    staticClass: ["cencelAdd"],
    on: {
      "click": _vm.hideDeleteRegion
    }
  }, [_vm._v("取消")]), _c('text', {
    staticClass: ["submitAdd"],
    on: {
      "click": _vm.submitDeleteRegion
    }
  }, [_vm._v("确认")])])])]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(16)
)

/* script */
__vue_exports__ = __webpack_require__(17)

/* template */
var __vue_template__ = __webpack_require__(18)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\weex项目\\教练派区域门店管理\\regionManage\\src\\components\\chooseAdmin.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-325e6090"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = {
  "emptyBox": {
    "width": "750",
    "alignItems": "center",
    "justifyContent": "center",
    "borderTopStyle": "solid",
    "borderTopWidth": "10",
    "borderTopColor": "#F6F6F6",
    "backgroundColor": "#ffffff"
  },
  "emptyIcon": {
    "width": "455",
    "height": "233"
  },
  "emptyTxt": {
    "color": "rgba(0,0,0,0.45)",
    "fontSize": "23"
  },
  "regionBox": {
    "backgroundColor": "#F6F6F6"
  },
  "headerBox": {
    "width": "750",
    "height": "70",
    "alignItems": "center",
    "backgroundColor": "#4C5160",
    "paddingLeft": "19",
    "paddingRight": "19",
    "flexDirection": "row"
  },
  "leftBox": {
    "alignItems": "center",
    "justifyContent": "space-between",
    "color": "#ffffff",
    "flexDirection": "row"
  },
  "returnIcon": {
    "width": "28",
    "height": "28",
    "marginRight": "23"
  },
  "searchBox": {
    "width": "600",
    "height": "45",
    "backgroundColor": "#444856",
    "borderRadius": "4",
    "marginRight": "19",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "searchImg": {
    "width": "19",
    "height": "19",
    "marginLeft": "19"
  },
  "searchInput": {
    "flex": 1,
    "borderWidth": "0",
    "fontSize": "19",
    "height": "45",
    "color": "#ffffff",
    "paddingLeft": "23"
  },
  "centerScroll": {
    "width": "750",
    "backgroundColor": "#ffffff"
  },
  "centerItem": {
    "height": "93",
    "borderBottomWidth": "1",
    "borderBottomColor": "#F6F6F6",
    "borderBottomStyle": "solid",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "centerItems": {
    "height": "93",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "peopleLeft": {
    "height": "93",
    "width": "750",
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "space-between",
    "backgroundColor": "#ffffff",
    "borderBottomWidth": "1",
    "borderBottomColor": "#F6F6F6",
    "borderBottomStyle": "solid"
  },
  "personIcon": {
    "width": "41",
    "height": "41",
    "marginRight": "14",
    "marginLeft": "24",
    "borderRadius": "100"
  },
  "centerName": {
    "color": "#333333",
    "fontSize": "19"
  },
  "centerPhone": {
    "color": "#999999",
    "fontSize": "16"
  },
  "centerManage": {
    "height": "64",
    "justifyContent": "space-between",
    "width": "750",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "centerTxt": {
    "fontSize": "17",
    "color": "#999999",
    "marginLeft": "23"
  },
  "manageBtn": {
    "flexDirection": "row"
  },
  "selectedBtn": {
    "width": "28",
    "height": "28",
    "marginRight": "23"
  },
  "bottomBox": {
    "position": "absolute",
    "bottom": "0",
    "borderTopWidth": "1",
    "borderTopStyle": "solid",
    "borderTopColor": "#CCCCCC",
    "width": "750",
    "height": "60",
    "alignItems": "center",
    "justifyContent": "center",
    "backgroundColor": "#ffffff",
    "flexDirection": "row"
  },
  "addAdmin": {
    "width": "750",
    "height": "60",
    "textAlign": "center",
    "lineHeight": "60",
    "backgroundColor": "#108EE9",
    "color": "#ffffff"
  }
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var modal = weex.requireModule("modal");
var stream = weex.requireModule('stream');
var nativeMoudle = weex.requireModule('nativeModule');
exports.default = {
    data: function data() {
        return {
            list: [],
            height: '',
            regionId: '',
            adminList: [],
            token: 'eyJuYW1lIjoiRWxpemEiLCJwaG9uZSI6IjEzMjkxODM0OTQyIiwiYWNjb3VudElkIjo2LCJhY2NvdW50VHlwZSI6Miwid2VjaGF0SWQiOm51bGwsInRpY2tzIjoxNTU4NjAyNDQ0NzEyfQ==.pOk8SKFjMUjap+JjBQyEbnfYpVdYj4qnhzvui+DgoTQ=',
            webHost: 'http://10.0.0.216:9090',
            chooseList: [],
            searchTxt: '',
            btnTxt: '搜索',
            popHeight: '',
            componentVisibility: 'hidden'
        };
    },
    created: function created() {
        var that = this;
        nativeMoudle.showProgressDialog();
        that.popHeight = weex.config.env.deviceHeight;
        that.height = 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight + 30;
        that.regionId = that.$route.query.areaId;
        nativeMoudle.getMetaData(function (map) {
            that.token = map.token;
        });
        setTimeout(function () {
            that.getCoachList();
        }, 50);
        weex.requireModule('globalEvent').addEventListener('androidback', function (e) {
            that.returnMain();
        });
    },

    methods: {
        returnMain: function returnMain() {
            this.$router.go(-1);
            this.$refs.inputText.blur();
        },
        selectCenter: function selectCenter(id) {
            for (var i = 0, len = this.chooseList.length; i < len; i++) {
                if (id == this.chooseList[i].trainerId) {
                    if (this.adminList.indexOf(id) == -1) {
                        this.adminList.push(id);
                    } else {
                        var index = this.adminList.indexOf(id);
                        this.adminList.splice(index, 1);
                    }
                    this.chooseList[i].selected = !this.chooseList[i].selected;
                }
            }
        },
        getCoachList: function getCoachList() {
            var that = this;
            nativeMoudle.showProgressDialog();
            stream.fetch({
                method: 'GET',
                url: that.webHost + '/api/region/trainer/2/list/' + that.regionId,
                type: 'json',
                headers: {
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN': that.token
                }
            }, function (ret) {
                if (ret.ok) {
                    nativeMoudle.progressDialogDismiss();
                    if (ret.data.status == 0) {
                        var list = ret.data.data;
                        for (var i = 0, len = list.length; i < len; i++) {
                            list[i].selected = false;
                            if (list[i].authType != 5) {
                                that.list.push(list[i]);
                            } else {
                                that.chooseList.push(list[i]);
                            }
                        }
                        if (that.list.length == 0 && that.chooseList.length) {
                            that.componentVisibility = 'visible';
                        } else {
                            that.componentVisibility = 'hidden';
                        }
                    } else {
                        nativeMoudle.toastError(ret.data.message);
                    }
                } else {
                    nativeMoudle.toastError('网络错误！');
                }
            }, function (response) {});
        },
        addAdminEvent: function addAdminEvent() {
            var that = this;
            nativeMoudle.showProgressDialog();
            var centerStr = that.adminList.join(',');
            stream.fetch({
                method: 'POST',
                url: that.webHost + '/api/region/trainer/add/' + that.regionId + '?trainerIds=' + centerStr,
                type: 'json',
                headers: {
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN': that.token
                },
                body: JSON.stringify([])
            }, function (ret) {
                if (ret.ok) {
                    nativeMoudle.progressDialogDismiss();
                    that.showMoveRegion = false;
                    if (ret.data.status == 0) {
                        nativeMoudle.toastSuccess('添加成功');
                        setTimeout(function () {
                            that.$router.go(-1);
                        }, 500);
                    } else {
                        nativeMoudle.toastError(ret.data.message);
                    }
                } else {
                    nativeMoudle.toastError('网络错误！');
                }
            }, function (response) {});
        },
        serarchEvent: function serarchEvent() {
            this.$refs.inputText.blur();
            var that = this;
            nativeMoudle.showProgressDialog();
            if (that.btnTxt == '搜索') {
                that.btnTxt = '取消';
                stream.fetch({
                    method: 'GET',
                    url: that.webHost + '/api/region/trainer/2/list/' + that.regionId + '?search=' + that.searchTxt,
                    type: 'json',
                    headers: {
                        "Content-Type": 'application/json',
                        'X-AUTH-TOKEN': that.token
                    }
                }, function (ret) {
                    if (ret.ok) {
                        nativeMoudle.progressDialogDismiss();
                        if (ret.data.status == 0) {
                            var list = ret.data.data;
                            that.list = [];
                            that.chooseList = [];
                            for (var i = 0, len = list.length; i < len; i++) {
                                list[i].selected = false;
                                if (list[i].authType != 5) {
                                    that.list.push(list[i]);
                                } else {
                                    that.chooseList.push(list[i]);
                                }
                            }
                            if (that.list.length == 0 && that.chooseList.length == 0) {
                                that.componentVisibility = 'visible';
                            } else {
                                that.componentVisibility = 'hidden';
                            }
                        } else {
                            nativeMoudle.toastError(ret.data.message);
                        }
                    } else {
                        nativeMoudle.toastError('网络错误！');
                    }
                }, function (response) {});
            } else {
                that.btnTxt = '搜索';
                that.searchTxt = '';
                that.adminList = [];
                that.getCoachList();
            }
        }
    }
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["warpper"]
  }, [_c('div', {
    staticClass: ["regionBox"],
    style: {
      height: _vm.height
    }
  }, [_c('div', {
    staticClass: ["headerBox"]
  }, [_c('img', {
    staticClass: ["returnIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/whiteBack.png"
    },
    on: {
      "click": _vm.returnMain
    }
  }), _c('div', {
    staticClass: ["searchBox"]
  }, [_c('img', {
    staticClass: ["searchImg"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/searchIcon.png"
    }
  }), _c('input', {
    ref: "inputText",
    staticClass: ["searchInput"],
    attrs: {
      "placeholder": "搜索姓名/手机号",
      "placeholderColor": "#8E9199",
      "value": (_vm.searchTxt)
    },
    on: {
      "input": function($event) {
        _vm.searchTxt = $event.target.attr.value
      }
    }
  })]), _c('text', {
    staticStyle: {
      color: "#ffffff",
      fontSize: "19px"
    },
    on: {
      "click": _vm.serarchEvent
    }
  }, [_vm._v(_vm._s(_vm.btnTxt))])]), _c('list', [_c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [(_vm.list.length != 0 || _vm.chooseList.length != 0) ? _c('div', [(_vm.list.length != 0) ? _c('div', {
    staticClass: ["centerBox"]
  }, [_vm._m(0), _vm._l((_vm.list), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: ["centerItem"],
      staticStyle: {
        width: "750px",
        backgroundColor: "#ffffff"
      }
    }, [_c('img', {
      staticClass: ["personIcon"],
      attrs: {
        "src": item.trainerPhoto == null ? 'https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/defaultAvata.png' : item.trainerPhoto
      }
    }), _c('div', {
      staticClass: ["centerMess"]
    }, [_c('text', {
      staticClass: ["centerName"]
    }, [_vm._v(_vm._s(item.trainerName))]), _c('text', {
      staticClass: ["centerPhone"]
    }, [_vm._v(_vm._s(item.trainerPhone))])])])
  })], 2) : _vm._e(), (_vm.chooseList.length != 0) ? _c('div', {
    staticClass: ["centerBox"]
  }, [_vm._m(1), _vm._l((_vm.chooseList), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: ["peopleLeft"]
    }, [_c('div', {
      staticClass: ["centerItem"]
    }, [_c('img', {
      staticClass: ["personIcon"],
      attrs: {
        "src": item.trainerPhoto == null ? 'https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/defaultAvata.png' : item.trainerPhoto
      }
    }), _c('div', {
      staticClass: ["centerMess"]
    }, [_c('text', {
      staticClass: ["centerName"]
    }, [_vm._v(_vm._s(item.trainerName))]), _c('text', {
      staticClass: ["centerPhone"]
    }, [_vm._v(_vm._s(item.trainerPhone))])])]), _c('img', {
      staticClass: ["selectedBtn"],
      attrs: {
        "src": item.selected ? 'https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/selected.png' : 'https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/emptySelected.png'
      },
      on: {
        "click": function($event) {
          _vm.selectCenter(item.trainerId)
        }
      }
    })])
  })], 2) : _vm._e()]) : _vm._e(), (_vm.list.length == 0 && _vm.chooseList.length == 0) ? _c('div', {
    staticClass: ["emptyBox"],
    style: {
      height: _vm.height,
      visibility: _vm.componentVisibility
    }
  }, [_c('img', {
    staticClass: ["emptyIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/emptyIcon.png"
    }
  }), _c('text', {
    staticClass: ["emptyTxt"]
  }, [_vm._v("这片区域无人管辖")])]) : _vm._e()])]), (_vm.adminList.length != 0) ? _c('div', {
    staticClass: ["bottomBox"]
  }, [_c('text', {
    staticClass: ["addAdmin"],
    on: {
      "click": _vm.addAdminEvent
    }
  }, [_vm._v("确认添加(" + _vm._s(_vm.adminList.length) + ")")])]) : _c('div', {
    staticClass: ["bottomBox"]
  }, [_c('text', {
    staticClass: ["addAdmin"]
  }, [_vm._v("确认添加")])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["centerManage"]
  }, [_c('text', {
    staticClass: ["centerTxt"]
  }, [_vm._v("上级区域负责人")]), _c('div', {
    staticClass: ["manageBtn"]
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["centerManage"]
  }, [_c('text', {
    staticClass: ["centerTxt"]
  }, [_vm._v("可选人员")]), _c('div', {
    staticClass: ["manageBtn"]
  })])
}]}
module.exports.render._withStripped = true

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(20)
)

/* script */
__vue_exports__ = __webpack_require__(21)

/* template */
var __vue_template__ = __webpack_require__(22)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\weex项目\\教练派区域门店管理\\regionManage\\src\\components\\subpages.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-db047518"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = {
  "greyTxt": {
    "color": "#999999",
    "fontSize": "19"
  },
  "blueTtxt": {
    "color": "#108EE9",
    "fontSize": "19"
  },
  "beforeStepBox": {
    "alignItems": "center",
    "flexDirection": "row",
    "borderRightColor": "#999999",
    "borderRightStyle": "solid",
    "paddingRight": "12",
    "borderRightWidth": "1",
    "marginRight": "12"
  },
  "beforeIcon": {
    "width": "23",
    "height": "23"
  },
  "beforeImg": {
    "width": "23",
    "height": "23",
    "marginLeft": "8",
    "marginRight": "8"
  },
  "areaList": {
    "width": "750",
    "height": "75",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "rightRegionBox": {
    "flexDirection": "row",
    "alignItems": "center"
  },
  "navBox": {
    "width": "750",
    "height": "75",
    "backgroundColor": "#ffffff",
    "marginBottom": "9",
    "alignItems": "center",
    "flexDirection": "row",
    "paddingLeft": "23"
  },
  "emptyBox": {
    "width": "750",
    "alignItems": "center",
    "justifyContent": "center",
    "borderTopStyle": "solid",
    "borderTopWidth": "10",
    "borderTopColor": "#F6F6F6",
    "backgroundColor": "#ffffff"
  },
  "emptyIcon": {
    "width": "455",
    "height": "233"
  },
  "emptyTxt": {
    "color": "rgba(0,0,0,0.45)",
    "fontSize": "23"
  },
  "deleteRegionBox": {
    "width": "516",
    "height": "263",
    "backgroundColor": "#ffffff",
    "borderRadius": "6",
    "alignItems": "center"
  },
  "swiperBox": {
    "width": "725",
    "height": "93"
  },
  "swiperItem": {
    "flexDirection": "row",
    "width": "1007"
  },
  "regionItem": {
    "width": "725",
    "height": "93",
    "backgroundColor": "#ffffff",
    "flexDirection": "row",
    "alignItems": "center",
    "borderBottomWidth": "1",
    "borderBottomColor": "#EAEAEA",
    "borderBottomStyle": "solid"
  },
  "regionItems": {
    "width": "600",
    "height": "93",
    "backgroundColor": "#FFFFFF",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "swiperBtn": {
    "width": "282",
    "height": "93",
    "flexDirection": "row"
  },
  "setting": {
    "width": "94",
    "height": "93",
    "alignItems": "center",
    "justifyContent": "center",
    "backgroundColor": "#108EE9",
    "color": "#ffffff",
    "fontSize": "19"
  },
  "edit": {
    "width": "94",
    "height": "93",
    "alignItems": "center",
    "justifyContent": "center",
    "backgroundColor": "#7570FF",
    "color": "#ffffff",
    "fontSize": "19"
  },
  "remove": {
    "width": "94",
    "height": "93",
    "alignItems": "center",
    "justifyContent": "center",
    "backgroundColor": "#E65142",
    "color": "#ffffff",
    "fontSize": "19"
  },
  "regionBox": {
    "backgroundColor": "#F6F6F6"
  },
  "centerScroll": {
    "width": "750",
    "backgroundColor": "#ffffff",
    "paddingLeft": "23"
  },
  "headerBox": {
    "width": "750",
    "height": "70",
    "alignItems": "center",
    "backgroundColor": "#4C5160",
    "justifyContent": "space-between",
    "paddingLeft": "19",
    "paddingRight": "19",
    "flexDirection": "row"
  },
  "leftBox": {
    "alignItems": "center",
    "justifyContent": "space-between",
    "color": "#ffffff",
    "flexDirection": "row"
  },
  "returnIcon": {
    "width": "28",
    "height": "28",
    "marginRight": "8"
  },
  "addIcon": {
    "width": "28",
    "height": "28"
  },
  "centerTxt": {
    "fontSize": "17",
    "color": "#999999",
    "marginLeft": "23"
  },
  "manageBtn": {
    "flexDirection": "row"
  },
  "centerManage": {
    "height": "64",
    "justifyContent": "space-between",
    "width": "750",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "submitBtn": {
    "width": "80",
    "height": "34",
    "lineHeight": "34",
    "textAlign": "center",
    "backgroundColor": "#108EE9",
    "color": "#FFFFFF",
    "fontSize": "15",
    "borderRadius": "4",
    "marginRight": "19",
    "borderColor": "#108EE9",
    "borderWidth": "1",
    "borderStyle": "solid"
  },
  "cancelBtn": {
    "width": "80",
    "height": "34",
    "color": "#666666",
    "lineHeight": "34",
    "textAlign": "center",
    "fontSize": "15",
    "borderRadius": "4",
    "marginRight": "23",
    "borderColor": "#666666",
    "borderWidth": "1",
    "borderStyle": "solid"
  },
  "centerItem": {
    "height": "93",
    "width": "725",
    "borderBottomWidth": "1",
    "borderBottomColor": "#EAEAEA",
    "borderBottomStyle": "solid",
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "space-between"
  },
  "centerMess": {
    "alignItems": "center",
    "flexDirection": "row"
  },
  "centerIcon": {
    "width": "34",
    "height": "34",
    "marginRight": "19"
  },
  "centerName": {
    "color": "#333333",
    "fontSize": "19"
  },
  "selectedBtn": {
    "width": "28",
    "height": "28",
    "marginRight": "23"
  },
  "bg": {
    "backgroundColor": "rgba(0,0,0,0.6)",
    "position": "absolute",
    "top": 0,
    "left": 0,
    "width": "750",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "addregionBox": {
    "width": "516",
    "height": "383",
    "backgroundColor": "#ffffff",
    "borderRadius": "6",
    "alignItems": "center"
  },
  "addReginTxt": {
    "color": "#333333",
    "fontSize": "30",
    "marginTop": "58",
    "marginBottom": "50",
    "width": "516",
    "textAlign": "center"
  },
  "nameBox": {
    "width": "375",
    "borderBottomColor": "#f6d6f6",
    "borderBottomStyle": "solid",
    "borderBottomWidth": "1",
    "paddingBottom": "23",
    "alignItems": "center",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "marginBottom": "58"
  },
  "nameInput": {
    "width": "315",
    "height": "40",
    "fontSize": "22",
    "textAlign": "left",
    "paddingLeft": "10",
    "borderColor": "#ffffff"
  },
  "cancelIcon": {
    "width": "28",
    "height": "28"
  },
  "regionBtnBox": {
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "cencelAdd": {
    "width": "195",
    "height": "56",
    "borderColor": "#DCDCDC",
    "borderStyle": "solid",
    "borderWidth": "1",
    "borderRadius": "30",
    "textAlign": "center",
    "lineHeight": "58",
    "color": "#666666",
    "fontSize": "19",
    "marginRight": "28"
  },
  "submitAdd": {
    "width": "195",
    "height": "56",
    "borderColor": "#1890FF",
    "backgroundColor": "#1890FF",
    "borderStyle": "solid",
    "borderWidth": "1",
    "borderRadius": "30",
    "textAlign": "center",
    "lineHeight": "58",
    "color": "#ffffff",
    "fontSize": "19"
  }
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var modal = weex.requireModule("modal");
var storage = weex.requireModule('storage');
var animation = weex.requireModule('animation');
var stream = weex.requireModule('stream');
var nativeMoudle = weex.requireModule('nativeModule');
exports.default = {
    data: function data() {
        return {
            regionList: [],
            clubList: [],
            height: '',
            popHeight: '',
            showChooseCenter: false,
            centerIdList: [],
            currentIndex: -1,
            showAddRegion: false,
            regionName: '',
            nowIndex: -1,
            showDeleteRegion: false,
            deleteIndex: '',
            title: '',
            token: 'eyJuYW1lIjoiRWxpemEiLCJwaG9uZSI6IjEzMjkxODM0OTQyIiwiYWNjb3VudElkIjo2LCJhY2NvdW50VHlwZSI6Miwid2VjaGF0SWQiOm51bGwsInRpY2tzIjoxNTU4NjAyNDQ0NzEyfQ==.pOk8SKFjMUjap+JjBQyEbnfYpVdYj4qnhzvui+DgoTQ=',
            webHost: 'http://10.0.0.216:9090',
            actionRegionId: '',
            regionId: '',
            parentId: '',
            lastHeaderRegionId: -1,
            beforeHeaderRegionId: -1,
            superRegionId: '',
            isAllHeader: 0,
            componentVisibility: 'hidden'
        };
    },
    mounted: function mounted() {
        nativeMoudle.showProgressDialog();
    },
    created: function created() {
        var that = this;
        // that.height = 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight+50;
        that.height = weex.config.env.deviceHeight;
        that.popHeight = 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight + 30;
        nativeMoudle.getMetaData(function (map) {
            that.token = map.token;
        });
        //查询是否存在本地保存的id
        storage.getItem('regionId', function (res) {
            if (res.result == 'success') {
                that.regionId = JSON.parse(res.data);
            } else {
                that.regionId = that.$route.query.id;
            }
        });
        that.parentId = that.$route.query.parentId;
        setTimeout(function () {
            that.getRegionList(that.regionId);
        }, 50);
        weex.requireModule('globalEvent').addEventListener('androidback', function (e) {
            that.returnMain();
        });
    },

    methods: {
        returnMain: function returnMain() {
            storage.removeItem('regionId');
            if (this.isAllHeader == -1) {
                nativeMoudle.close();
            } else {
                this.$router.go(-1);
            }
        },
        nextPage: function nextPage(id) {
            var that = this;
            //记录当前点击的门店，保证移动后返回i的门店正确
            storage.setItem('regionId', JSON.stringify(id), function (res) {
                if (res.result == 'success') {
                    that.getRegionList(id);
                    that.showChooseCenter = false;
                    that.centerIdList = [];
                }
            });
        },
        getRegionList: function getRegionList(id) {
            var that = this;
            if (id == -1) {
                that.isAllHeader = -1;
            } else {
                that.isAllHeader = 0;
            }
            nativeMoudle.showProgressDialog();
            stream.fetch({
                method: 'GET',
                url: that.webHost + '/api/region/list/' + id,
                type: 'json',
                headers: {
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN': that.token
                }
            }, function (ret) {
                if (ret.ok) {
                    nativeMoudle.progressDialogDismiss();
                    if (ret.data.status == 0) {
                        if (ret.data.data.regionInfo == null || ret.data.data.regionInfo == '' || ret.data.data.regionInfo == undefined) {
                            that.regionList = [];
                        } else {
                            that.regionList = ret.data.data.regionInfo;
                        }
                        if (ret.data.data.regionClub == null || ret.data.data.regionClub == '' || ret.data.data.regionClub == undefined) {
                            that.clubList = [];
                        } else {
                            if (id == -1) {
                                var list = ret.data.data.regionClub;
                                var arr = [];
                                for (var i = 0, len = list.length; i < len; i++) {
                                    list[i].selected = false;
                                    if (list[i].regionId == null) {
                                        arr.push(list[i]);
                                    }
                                }
                                that.clubList = arr;
                            } else {
                                var list = ret.data.data.regionClub;
                                for (var i = 0, len = list.length; i < len; i++) {
                                    list[i].selected = false;
                                }
                                that.clubList = list;
                            }
                        }
                        if (that.clubList.length == 0 && that.regionList.length == 0) {
                            that.componentVisibility = 'visible';
                        } else {
                            that.componentVisibility = 'hidden';
                        }
                        if (ret.data.data.headerRegions == null || ret.data.data.headerRegions == '' || ret.data.data.headerRegions == undefined) {
                            that.headerRegionList = [];
                        } else {
                            that.headerRegionList = ret.data.data.headerRegions;
                            that.regionId = ret.data.data.headerRegions[ret.data.data.headerRegions.length - 1].headerRegionId;
                            if (ret.data.data.headerRegions.length >= 2) {
                                that.beforeHeaderRegionId = ret.data.data.headerRegions[ret.data.data.headerRegions.length - 2].headerRegionId;
                            } else {
                                that.beforeHeaderRegionId = -1;
                            }
                        }
                        if (ret.data.data.superRegionInfo == null || ret.data.data.superRegionInfo == '' || ret.data.data.superRegionInfo == undefined) {
                            that.superRegionId = '';
                        } else {
                            that.superRegionId = ret.data.data.superRegionInfo.id;
                        }
                    } else {
                        nativeMoudle.toastError(ret.data.message);
                    }
                } else {
                    nativeMoudle.toastError('网络错误！');
                }
            }, function (response) {});
        },
        moveCenterEvent: function moveCenterEvent() {
            this.showChooseCenter = true;
        },
        selectCenter: function selectCenter(id) {
            for (var i = 0, len = this.clubList.length; i < len; i++) {
                if (id == this.clubList[i].clubId) {
                    if (this.centerIdList.indexOf(id) == -1) {
                        this.centerIdList.push(id);
                    } else {
                        var index = this.centerIdList.indexOf(id);
                        this.centerIdList.splice(index, 1);
                    }
                    this.clubList[i].selected = !this.clubList[i].selected;
                }
            }
        },
        handleSwipe: function handleSwipe(e, index) {
            if (e.direction == "left") {
                this.goRight(this.nowIndex);
                this.goLeft(index);
            } else if (e.direction == "right") {
                this.goRight(index);
            }
            // modal.toast({message:"==" + e.direction + "==" + index, duration:1});
        },
        goLeft: function goLeft(index) {
            var itemEl = this.$refs.itemDev[index];
            //第二左滑条目与前一次左滑条目相同时，不处理
            if (index == this.currentIndex) {
                return;
            }
            //当前有划出的条目的时候，左滑其他条目，当前的条目归位，
            if (this.currentIndex != -1) {
                this.goRight(this.currentIndex);
            }
            //左滑当前条目
            if (this.currentIndex != index) {
                animation.transition(itemEl, {
                    styles: {
                        transform: 'translate(-282px, 0px)',
                        transformOrigin: 'center center'
                    },
                    duration: 200, //ms
                    timingFunction: 'linear',
                    delay: 0 //ms
                }, function () {});
                this.currentIndex = index;
                this.nowIndex = index;
            }
        },

        //time是动画时间，给个默认值 200毫秒，不传就表明这个值为200毫秒
        goRight: function goRight(index) {
            var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;

            var itemEl = this.$refs.itemDev[index];
            animation.transition(itemEl, {
                styles: {
                    transform: 'translate(0px, 0px)',
                    transformOrigin: 'center center'
                },
                duration: time, //动画时间
                timingFunction: 'linear', //线性运动
                delay: 0 //ms
            }, function () {});
            this.currentIndex = -1;
        },

        //点击删除
        removeItem: function removeItem(id, index) {
            this.showDeleteRegion = true;
            this.deleteIndex = index;
            this.actionRegionId = id;
        },
        cancelSelect: function cancelSelect() {
            this.showChooseCenter = false;
            this.centerIdList = [];
        },
        moveRegion: function moveRegion() {
            var that = this;
            storage.setItem('centerIdList', JSON.stringify(that.centerIdList), function (res) {
                if (res.result == 'success') {
                    that.$router.push('/selectRegion');
                }
            });
        },
        empty: function empty() {},
        clearName: function clearName() {
            this.regionName = '';
            this.$refs.inputText.blur();
        },
        addRegion: function addRegion() {
            this.showAddRegion = true;
            this.title = '添加区域';
        },
        hideAddRegion: function hideAddRegion() {
            this.$refs.inputText.blur();
            this.regionName = '';
            this.showAddRegion = false;
        },
        submitAddRegion: function submitAddRegion() {
            this.$refs.inputText.blur();
            var that = this;
            if (that.regionName == '') {
                nativeMoudle.toastError('请输入区域名称');
                return;
            }
            if (that.title == '添加区域') {
                var arr = JSON.stringify({
                    parentId: that.regionId,
                    regionName: that.regionName
                });
                var URL = that.webHost + '/api/region/add';
                var method = 'POST';
            } else {
                var arr = JSON.stringify({
                    id: that.actionRegionId,
                    regionName: that.regionName
                });
                var URL = that.webHost + '/api/region/update';
                var method = 'PUT';
            }
            nativeMoudle.showProgressDialog();
            stream.fetch({
                method: method,
                url: URL,
                type: 'json',
                headers: {
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN': that.token
                },
                body: arr
            }, function (ret) {
                if (ret.ok) {
                    nativeMoudle.progressDialogDismiss();
                    if (ret.data.status == 0) {
                        nativeMoudle.toastSuccess('操作成功');
                        that.hideAddRegion();
                        if (that.title == '编辑区域') {
                            that.goRight(that.currentIndex, 0);
                        }
                        setTimeout(function () {
                            that.getRegionList(that.regionId);
                        }, 500);
                    } else {
                        nativeMoudle.toastError(ret.data.message);
                        that.showAddRegion = false;
                    }
                } else {
                    nativeMoudle.toastError('网络错误！');
                }
            }, function (response) {});
        },
        setAdministrator: function setAdministrator(regionId) {
            this.$router.push({ name: 'adminList', query: { id: regionId } });
        },
        editRegion: function editRegion(regionId, name) {
            this.showAddRegion = true;
            this.title = '编辑区域';
            this.regionName = name;
            this.actionRegionId = regionId;
        },
        hideDeleteRegion: function hideDeleteRegion() {
            this.showDeleteRegion = false;
        },
        submitDeleteRegion: function submitDeleteRegion() {
            nativeMoudle.showProgressDialog();
            var that = this;
            stream.fetch({
                method: 'DELETE',
                url: that.webHost + '/api/region/delete/' + that.actionRegionId,
                type: 'json',
                headers: {
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN': that.token
                }
            }, function (ret) {
                if (ret.ok) {
                    nativeMoudle.progressDialogDismiss();
                    if (ret.data.status == 0) {
                        nativeMoudle.toastSuccess('删除成功');
                        that.showDeleteRegion = false;
                        setTimeout(function () {
                            that.goRight(that.deleteIndex, 0);
                            that.regionList.splice(that.deleteIndex, 1);
                            that.getRegionList(that.regionId);
                        }, 500);
                    } else {
                        nativeMoudle.toastError(ret.data.message);
                    }
                } else {
                    nativeMoudle.toastError('网络错误！');
                }
            }, function (response) {});
        }
    }
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["warpper"]
  }, [_c('div', {
    staticClass: ["regionBox"],
    style: {
      height: _vm.height
    }
  }, [_c('div', {
    staticClass: ["headerBox"]
  }, [_c('div', {
    staticClass: ["leftBox"]
  }, [_c('img', {
    staticClass: ["returnIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/whiteBack.png"
    },
    on: {
      "click": _vm.returnMain
    }
  }), _c('text', {
    staticStyle: {
      color: "#ffffff"
    },
    on: {
      "click": _vm.returnMain
    }
  }, [_vm._v("区域管理")])]), _c('img', {
    staticClass: ["addIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/whiteAdd.png"
    },
    on: {
      "click": _vm.addRegion
    }
  })]), (_vm.isAllHeader != -1) ? _c('div', {
    staticClass: ["navBox"]
  }, [_c('div', {
    staticClass: ["beforeStepBox"]
  }, [_c('text', {
    staticStyle: {
      color: "#108EE9",
      fontSize: "19px"
    },
    on: {
      "click": function($event) {
        _vm.getRegionList(_vm.beforeHeaderRegionId)
      }
    }
  }, [_vm._v("返回上一级")]), _c('img', {
    staticClass: ["beforeIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/beforeStep.png"
    }
  })]), _c('div', {
    staticClass: ["areaList"]
  }, [_c('text', {
    staticClass: ["blueTtxt"],
    on: {
      "click": function($event) {
        _vm.nextPage(-1)
      }
    }
  }, [_vm._v("全部")]), _vm._l((_vm.headerRegionList), function(item, index) {
    return (_vm.headerRegionList.length != 0) ? _c('div', {
      key: index,
      staticClass: ["rightRegionBox"]
    }, [_c('img', {
      staticClass: ["beforeImg"],
      attrs: {
        "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/nextIcon.png"
      }
    }), (item.headerRegionId != _vm.regionId) ? _c('text', {
      staticClass: ["blueTtxt"],
      on: {
        "click": function($event) {
          _vm.nextPage(item.headerRegionId)
        }
      }
    }, [_vm._v(_vm._s(item.headerRegionName))]) : _vm._e(), (item.headerRegionId == _vm.regionId) ? _c('text', {
      staticClass: ["greyTxt"]
    }, [_vm._v(_vm._s(item.headerRegionName))]) : _vm._e()]) : _vm._e()
  })], 2)]) : _vm._e(), (_vm.regionList.length != 0 || _vm.clubList.length != 0) ? _c('list', [_c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [(_vm.regionList.length != 0) ? _c('div', {
    staticClass: ["centerBox"]
  }, [_vm._m(0), _c('list', {
    staticClass: ["centerScroll"]
  }, _vm._l((_vm.regionList), function(item, index) {
    return _c('cell', {
      key: index,
      staticClass: ["cell"],
      appendAsTree: true,
      attrs: {
        "append": "tree"
      }
    }, [_c('div', {
      staticClass: ["swiperBox"]
    }, [_c('div', {
      ref: "itemDev",
      refInFor: true,
      staticClass: ["swiperItem"],
      on: {
        "swipe": function($event) {
          _vm.handleSwipe($event, index)
        }
      }
    }, [_c('div', {
      staticClass: ["regionItem"]
    }, [_c('div', {
      staticClass: ["regionItems"],
      on: {
        "click": function($event) {
          _vm.nextPage(item.id)
        }
      }
    }, [_c('img', {
      staticClass: ["centerIcon"],
      attrs: {
        "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/regionIcon.png"
      }
    }), _c('text', {
      staticClass: ["centerName"]
    }, [_vm._v(_vm._s(item.name))])])]), _c('div', {
      staticClass: ["swiperBtn"]
    }, [_c('div', {
      staticClass: ["setting"],
      on: {
        "click": function($event) {
          _vm.setAdministrator(item.id)
        }
      }
    }, [_c('text', {
      staticStyle: {
        color: "#FFFFFF",
        fontSize: "19px"
      }
    }, [_vm._v("设置")]), _c('text', {
      staticStyle: {
        color: "#FFFFFF",
        fontSize: "19px"
      }
    }, [_vm._v("负责人")])]), _c('div', {
      staticClass: ["edit"],
      on: {
        "click": function($event) {
          _vm.editRegion(item.id, item.name)
        }
      }
    }, [_c('text', {
      staticStyle: {
        color: "#FFFFFF",
        fontSize: "19px"
      }
    }, [_vm._v("编辑")])]), _c('div', {
      staticClass: ["remove"],
      on: {
        "click": function($event) {
          _vm.removeItem(item.id, index)
        }
      }
    }, [_c('text', {
      staticStyle: {
        color: "#FFFFFF",
        fontSize: "19px"
      }
    }, [_vm._v("删除")])])])])])])
  }))]) : _vm._e(), (_vm.clubList.length != 0) ? _c('div', {
    staticClass: ["centerBox"]
  }, [_c('div', {
    staticClass: ["centerManage"]
  }, [_c('text', {
    staticClass: ["centerTxt"]
  }, [_vm._v("门店")]), (_vm.showChooseCenter) ? _c('div', {
    staticClass: ["manageBtn"]
  }, [(_vm.centerIdList.length == 0) ? _c('text', {
    staticClass: ["submitBtn"]
  }, [_vm._v("确认")]) : _c('text', {
    staticClass: ["submitBtn"],
    on: {
      "click": _vm.moveRegion
    }
  }, [_vm._v("确认(" + _vm._s(_vm.centerIdList.length) + ")")]), _c('text', {
    staticClass: ["cancelBtn"],
    on: {
      "click": _vm.cancelSelect
    }
  }, [_vm._v("取消")])]) : _c('div', {
    staticClass: ["manageBtn"]
  }, [_c('text', {
    staticClass: ["cancelBtn"],
    on: {
      "click": _vm.moveCenterEvent
    }
  }, [_vm._v("移动门店")])])]), _c('list', {
    staticClass: ["centerScroll"]
  }, _vm._l((_vm.clubList), function(item, index) {
    return _c('cell', {
      key: index,
      staticClass: ["cell"],
      appendAsTree: true,
      attrs: {
        "append": "tree"
      },
      on: {
        "click": function($event) {
          _vm.selectCenter(item.clubId)
        }
      }
    }, [_c('div', {
      staticClass: ["centerItem"]
    }, [_c('div', {
      staticClass: ["centerMess"]
    }, [_c('img', {
      staticClass: ["centerIcon"],
      attrs: {
        "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/centerImg.png"
      }
    }), _c('text', {
      staticClass: ["centerName"]
    }, [_vm._v(_vm._s(item.clubName || '未命名'))])]), (_vm.showChooseCenter) ? _c('img', {
      staticClass: ["selectedBtn"],
      attrs: {
        "src": item.selected ? 'https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/selected.png' : 'https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/emptySelected.png'
      },
      on: {
        "click": function($event) {
          _vm.selectCenter(item.clubId)
        }
      }
    }) : _vm._e()])])
  }))]) : _vm._e()])]) : _vm._e(), (_vm.regionList.length == 0 && _vm.clubList.length == 0) ? _c('div', {
    staticClass: ["emptyBox"],
    style: {
      height: _vm.popHeight - 78,
      visibility: _vm.componentVisibility
    }
  }, [_c('img', {
    staticClass: ["emptyIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/emptyIcon.png"
    }
  }), _c('text', {
    staticClass: ["emptyTxt"]
  }, [_vm._v("该区域暂无内容")])]) : _vm._e()]), (_vm.showAddRegion) ? _c('div', {
    staticClass: ["bg"],
    style: {
      height: _vm.popHeight
    },
    on: {
      "click": _vm.hideAddRegion
    }
  }, [_c('div', {
    staticClass: ["addregionBox"],
    on: {
      "click": _vm.empty
    }
  }, [_c('text', {
    staticClass: ["addReginTxt"]
  }, [_vm._v(_vm._s(_vm.title))]), _c('div', {
    staticClass: ["nameBox"]
  }, [_c('input', {
    ref: "inputText",
    staticClass: ["nameInput"],
    attrs: {
      "placeholder": "请输入区域名称，不超过八个字",
      "placeholderColor": "#CCCCCC",
      "maxlength": "8",
      "value": (_vm.regionName)
    },
    on: {
      "input": function($event) {
        _vm.regionName = $event.target.attr.value
      }
    }
  }), (_vm.regionName != '') ? _c('img', {
    staticClass: ["cancelIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/greyCancel.png"
    },
    on: {
      "click": _vm.clearName
    }
  }) : _vm._e()]), _c('div', {
    staticClass: ["regionBtnBox"]
  }, [_c('text', {
    staticClass: ["cencelAdd"],
    on: {
      "click": _vm.hideAddRegion
    }
  }, [_vm._v("取消")]), _c('text', {
    staticClass: ["submitAdd"],
    on: {
      "click": _vm.submitAddRegion
    }
  }, [_vm._v("确认")])])])]) : _vm._e(), (_vm.showDeleteRegion) ? _c('div', {
    staticClass: ["bg"],
    style: {
      height: _vm.popHeight
    },
    on: {
      "click": _vm.hideDeleteRegion
    }
  }, [_c('div', {
    staticClass: ["deleteRegionBox"],
    on: {
      "click": _vm.empty
    }
  }, [_c('text', {
    staticClass: ["addReginTxt"]
  }, [_vm._v("确认要删除当前区域么？")]), _c('div', {
    staticClass: ["regionBtnBox"]
  }, [_c('text', {
    staticClass: ["cencelAdd"],
    on: {
      "click": _vm.hideDeleteRegion
    }
  }, [_vm._v("取消")]), _c('text', {
    staticClass: ["submitAdd"],
    on: {
      "click": _vm.submitDeleteRegion
    }
  }, [_vm._v("确认")])])])]) : _vm._e()])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["centerManage"]
  }, [_c('text', {
    staticClass: ["centerTxt"]
  }, [_vm._v("区域")]), _c('div', {
    staticClass: ["manageBtn"]
  })])
}]}
module.exports.render._withStripped = true

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(24)
)

/* script */
__vue_exports__ = __webpack_require__(25)

/* template */
var __vue_template__ = __webpack_require__(26)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\weex项目\\教练派区域门店管理\\regionManage\\src\\index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-1a4d8e3c"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = {}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//

exports.default = {
  name: 'App',
  data: function data() {
    return {
      logo: 'https://gw.alicdn.com/tfs/TB1yopEdgoQMeJjy1XaXXcSsFXa-640-302.png'
    };
  }
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_c('router-view')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })
/******/ ]);