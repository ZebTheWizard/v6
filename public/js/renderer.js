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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 99);
/******/ })
/************************************************************************/
/******/ ({

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {


window.cookie = __webpack_require__(148);
window.Time = __webpack_require__(149);
window.Size = __webpack_require__(150);
window.Size = __webpack_require__(151);

window.getDate = function () {
  var d = new Date();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[d.getDay()] + ', ' + months[d.getMonth()] + ' ' + d.getDate();
};

/***/ }),

/***/ 148:
/***/ (function(module, exports) {

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cookie = function () {
  function Cookie() {
    var _this = this;

    _classCallCheck(this, Cookie);

    var cookies = document.cookie.split(';');
    this.cookies = this.cookies || new Object();
    cookies.forEach(function (cookie) {
      var _cookie$split = cookie.split('='),
          _cookie$split2 = _slicedToArray(_cookie$split, 2),
          key = _cookie$split2[0],
          value = _cookie$split2[1];

      _this.cookies[key] = value;
    });
  }

  _createClass(Cookie, [{
    key: 'get',
    value: function get(key) {
      return this.cookies[key];
    }
  }]);

  return Cookie;
}();

module.exports = new Cookie();

/***/ }),

/***/ 149:
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Time = function () {
  var $$ = new WeakMap();

  var Time = function (_Date) {
    _inherits(Time, _Date);

    function Time() {
      _classCallCheck(this, Time);

      var _this = _possibleConstructorReturn(this, (Time.__proto__ || Object.getPrototypeOf(Time)).call(this));

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      $$.set(_this, {
        date: new (Function.prototype.bind.apply(Date, [null].concat(args)))()
      });
      return _this;
    }

    _createClass(Time, [{
      key: "date",
      value: function date() {
        return $$.get(this).date;
      }
    }, {
      key: "ago",
      value: function ago() {
        return Time.msToAgo(Time.now() - this.date());
      }
    }], [{
      key: "format",
      value: function format($date, string) {
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var date = $date.getDate();
        var day = $date.getDay();
        var month = $date.getMonth();
        var year = $date.getFullYear();
        // var string = string.split('d').join(date.padStart(2, '0'))
        // var string = string.split('D').join(days[day].substring(0,3))
        var string = string.split('j').join(date);
        // var string = string.split('l').join(days[day])
        // var string = string.split('N').join(() => day ? day : 7)
        // var string = string.split('S').join(() => {
        //   var d = date < 4 ? date : 4
        //   var ord = ['st', 'nd', 'rd', 'th']
        //   return ord[d-1]
        // })
        // var string = string.split('w').join(day)
        var string = string.split('M').join(months[month].substring(0, 3));
        var string = string.split('Y').join(year);
        return string;
      }
    }, {
      key: "msToAgo",
      value: function msToAgo(ms) {
        var _ = function _(a, b) {
          return Math.floor(a / b);
        };
        var t = { year: 31104000000, month: 2592000000, week: 604800000, day: 86400000, hour: 3600000, minute: 60000, second: 1000 };
        if (ms < t.second) return this.config.now;
        if (ms < t.minute) return _(ms, t.second) + this.config.s;
        if (ms < t.hour) return _(ms, t.minute) + this.config.m;
        if (ms < t.day) return _(ms, t.hour) + this.config.h;
        if (ms < t.week) return _(ms, t.day) + this.config.d;
        if (ms < t.month) return _(ms, t.week) + this.config.w;
        if (ms < t.year) return this.format(new Date(this.now() - ms), this.config.month);
        return this.format(new Date(this.now() - ms), this.config.year);
      }
    }]);

    return Time;
  }(Date);

  Time.config = {
    now: "just now",
    s: "s",
    m: "m",
    h: "h",
    d: "d",
    w: "w",
    month: "M j",
    year: "j M Y"
  };

  return Time;
}();

module.exports = Time;

/***/ }),

/***/ 150:
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Size = function () {
  var $$ = new WeakMap();

  var Size = function () {
    function Size(int) {
      _classCallCheck(this, Size);

      $$.set(this, {
        int: int
      });
    }

    _createClass(Size, [{
      key: 'toInt',
      value: function toInt() {
        return $$.get(this).int;
      }
    }, {
      key: 'toString',
      value: function toString() {
        var decimals = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        var i = this.toInt();
        var s = Size.config.sizes;
        var a = Size.config.abbr;
        var t = function t(num, abbr) {
          return num.toFixed(decimals) + ' ' + abbr.toUpperCase();
        };
        if (i < s.kb) return t(i, a.b);
        if (i < s.mb) return t(i / s.kb, a.kb);
        if (i < s.gb) return t(i / s.mb, a.mb);
        if (i < s.tb) return t(i / s.gb, a.gb);
        if (i < s.pb) return t(i / s.tb, a.tb);
        return t(i / s.pb, a.pb);
      }
    }]);

    return Size;
  }();

  Size.config = {
    sizes: {
      b: 1,
      kb: 1000,
      mb: 1000000,
      gb: 1000000000,
      tb: 1000000000000,
      pb: 1000000000000000
    },
    abbr: {
      b: 'b',
      kb: 'kb',
      mb: 'mb',
      gb: 'gb',
      tb: 'tb',
      pb: 'pb'
    }

  };

  return Size;
}();

module.exports = Size;

/***/ }),

/***/ 151:
/***/ (function(module, exports) {

(function (doc) {
	// Use JavaScript strict mode
	"use strict";

	/*global Element, Promise */

	var pollute = true,
	    api,
	    vendor,
	    apis = {
		// http://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html
		w3: {
			enabled: "fullscreenEnabled",
			element: "fullscreenElement",
			request: "requestFullscreen",
			exit: "exitFullscreen",
			events: {
				change: "fullscreenchange",
				error: "fullscreenerror"
			}
		},
		webkit: {
			enabled: "webkitFullscreenEnabled",
			element: "webkitCurrentFullScreenElement",
			request: "webkitRequestFullscreen",
			exit: "webkitExitFullscreen",
			events: {
				change: "webkitfullscreenchange",
				error: "webkitfullscreenerror"
			}
		},
		moz: {
			enabled: "mozFullScreenEnabled",
			element: "mozFullScreenElement",
			request: "mozRequestFullScreen",
			exit: "mozCancelFullScreen",
			events: {
				change: "mozfullscreenchange",
				error: "mozfullscreenerror"
			}
		},
		ms: {
			enabled: "msFullscreenEnabled",
			element: "msFullscreenElement",
			request: "msRequestFullscreen",
			exit: "msExitFullscreen",
			events: {
				change: "MSFullscreenChange",
				error: "MSFullscreenError"
			}
		}
	},
	    w3 = apis.w3;

	// Loop through each vendor's specific API
	for (vendor in apis) {
		// Check if document has the "enabled" property
		if (apis[vendor].enabled in doc) {
			// It seems this browser support the fullscreen API
			api = apis[vendor];
			break;
		}
	}

	function dispatch(type, target) {
		var event = doc.createEvent("Event");

		event.initEvent(type, true, false);
		target.dispatchEvent(event);
	} // end of dispatch()

	function handleChange(e) {
		e.stopPropagation();
		e.stopImmediatePropagation();

		// Recopy the enabled and element values
		doc[w3.enabled] = doc[api.enabled];
		doc[w3.element] = doc[api.element];

		dispatch(w3.events.change, e.target);
	} // end of handleChange()

	function handleError(e) {
		dispatch(w3.events.error, e.target);
	} // end of handleError()

	// Prepare a resolver to use for the requestFullscreen and exitFullscreen's promises
	// Use a closure since we need to check which method was used
	function createResolver(method) {
		return function resolver(resolve, reject) {
			// Reject the promise if asked to exitFullscreen and there is no element currently in fullscreen
			if (method === w3.exit && !doc[api.element]) {
				setTimeout(function () {
					reject(new TypeError());
				}, 1);
				return;
			}

			// When receiving an internal fullscreenchange event, fulfill the promise
			function change() {
				resolve();
				doc.removeEventListener(api.events.change, change, false);
			}

			// When receiving an internal fullscreenerror event, reject the promise
			function error() {
				reject(new TypeError());
				doc.removeEventListener(api.events.error, error, false);
			}

			doc.addEventListener(api.events.change, change, false);
			doc.addEventListener(api.events.error, error, false);
		};
	}

	// Pollute only if the API doesn't already exists
	if (pollute && !(w3.enabled in doc) && api) {
		// Add listeners for fullscreen events
		doc.addEventListener(api.events.change, handleChange, false);
		doc.addEventListener(api.events.error, handleError, false);

		// Copy the default value
		doc[w3.enabled] = doc[api.enabled];
		doc[w3.element] = doc[api.element];

		// Match the reference for exitFullscreen
		doc[w3.exit] = function () {
			var result = doc[api.exit]();
			return !result && window.Promise ? new Promise(createResolver(w3.exit)) : result;
		};

		// Add the request method to the Element's prototype
		Element.prototype[w3.request] = function () {
			var result = this[api.request].apply(this, arguments);
			return !result && window.Promise ? new Promise(createResolver(w3.request)) : result;
		};
	}

	// Return the API found (or undefined if the Fullscreen API is unavailable)
	return api;
})(document);

/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(100);


/***/ })

/******/ });