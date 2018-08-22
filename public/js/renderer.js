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
window.Autocomplete = __webpack_require__(152);

window.getDate = function () {
  var d = new Date();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[d.getDay()] + ', ' + months[d.getMonth()] + ' ' + d.getDate();
};

/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (f) {
  if (( false ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    var g;if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }g.ejs = f();
  }
})(function () {
  var define, module, exports;return function () {
    function e(t, n, r) {
      function s(o, u) {
        if (!n[o]) {
          if (!t[o]) {
            var a = typeof require == "function" && require;if (!u && a) return require(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
          }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
            var n = t[o][1][e];return s(n ? n : e);
          }, l, l.exports, e, t, n, r);
        }return n[o].exports;
      }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
        s(r[o]);
      }return s;
    }return e;
  }()({ 1: [function (require, module, exports) {
      "use strict";
      var fs = require("fs");var path = require("path");var utils = require("./utils");var scopeOptionWarned = false;var _VERSION_STRING = require("../package.json").version;var _DEFAULT_DELIMITER = "%";var _DEFAULT_LOCALS_NAME = "locals";var _NAME = "ejs";var _REGEX_STRING = "(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)";var _OPTS = ["delimiter", "scope", "context", "debug", "compileDebug", "client", "_with", "rmWhitespace", "strict", "filename"];var _OPTS_EXPRESS = _OPTS.concat("cache");var _BOM = /^\uFEFF/;exports.cache = utils.cache;exports.fileLoader = fs.readFileSync;exports.localsName = _DEFAULT_LOCALS_NAME;exports.promiseImpl = new Function("return this;")().Promise;exports.resolveInclude = function (name, filename, isDir) {
        var dirname = path.dirname;var extname = path.extname;var resolve = path.resolve;var includePath = resolve(isDir ? filename : dirname(filename), name);var ext = extname(name);if (!ext) {
          includePath += ".ejs";
        }return includePath;
      };function getIncludePath(path, options) {
        var includePath;var filePath;var views = options.views;if (path.charAt(0) == "/") {
          includePath = exports.resolveInclude(path.replace(/^\/*/, ""), options.root || "/", true);
        } else {
          if (options.filename) {
            filePath = exports.resolveInclude(path, options.filename);if (fs.existsSync(filePath)) {
              includePath = filePath;
            }
          }if (!includePath) {
            if (Array.isArray(views) && views.some(function (v) {
              filePath = exports.resolveInclude(path, v, true);return fs.existsSync(filePath);
            })) {
              includePath = filePath;
            }
          }if (!includePath) {
            throw new Error('Could not find the include file "' + options.escapeFunction(path) + '"');
          }
        }return includePath;
      }function handleCache(options, template) {
        var func;var filename = options.filename;var hasTemplate = arguments.length > 1;if (options.cache) {
          if (!filename) {
            throw new Error("cache option requires a filename");
          }func = exports.cache.get(filename);if (func) {
            return func;
          }if (!hasTemplate) {
            template = fileLoader(filename).toString().replace(_BOM, "");
          }
        } else if (!hasTemplate) {
          if (!filename) {
            throw new Error("Internal EJS error: no file name or template " + "provided");
          }template = fileLoader(filename).toString().replace(_BOM, "");
        }func = exports.compile(template, options);if (options.cache) {
          exports.cache.set(filename, func);
        }return func;
      }function tryHandleCache(options, data, cb) {
        var result;if (!cb) {
          if (typeof exports.promiseImpl == "function") {
            return new exports.promiseImpl(function (resolve, reject) {
              try {
                result = handleCache(options)(data);resolve(result);
              } catch (err) {
                reject(err);
              }
            });
          } else {
            throw new Error("Please provide a callback function");
          }
        } else {
          try {
            result = handleCache(options)(data);
          } catch (err) {
            return cb(err);
          }cb(null, result);
        }
      }function fileLoader(filePath) {
        return exports.fileLoader(filePath);
      }function includeFile(path, options) {
        var opts = utils.shallowCopy({}, options);opts.filename = getIncludePath(path, opts);return handleCache(opts);
      }function includeSource(path, options) {
        var opts = utils.shallowCopy({}, options);var includePath;var template;includePath = getIncludePath(path, opts);template = fileLoader(includePath).toString().replace(_BOM, "");opts.filename = includePath;var templ = new Template(template, opts);templ.generateSource();return { source: templ.source, filename: includePath, template: template };
      }function rethrow(err, str, flnm, lineno, esc) {
        var lines = str.split("\n");var start = Math.max(lineno - 3, 0);var end = Math.min(lines.length, lineno + 3);var filename = esc(flnm);var context = lines.slice(start, end).map(function (line, i) {
          var curr = i + start + 1;return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");err.path = filename;err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;throw err;
      }function stripSemi(str) {
        return str.replace(/;(\s*$)/, "$1");
      }exports.compile = function compile(template, opts) {
        var templ;if (opts && opts.scope) {
          if (!scopeOptionWarned) {
            console.warn("`scope` option is deprecated and will be removed in EJS 3");scopeOptionWarned = true;
          }if (!opts.context) {
            opts.context = opts.scope;
          }delete opts.scope;
        }templ = new Template(template, opts);return templ.compile();
      };exports.render = function (template, d, o) {
        var data = d || {};var opts = o || {};if (arguments.length == 2) {
          utils.shallowCopyFromList(opts, data, _OPTS);
        }return handleCache(opts, template)(data);
      };exports.renderFile = function () {
        var args = Array.prototype.slice.call(arguments);var filename = args.shift();var cb;var opts = { filename: filename };var data;if (typeof arguments[arguments.length - 1] == "function") {
          cb = args.pop();
        }if (args.length) {
          data = args.shift();if (args.length) {
            utils.shallowCopy(opts, args.pop());
          } else {
            if (data.settings) {
              if (data.settings.views) {
                opts.views = data.settings.views;
              }if (data.settings["view cache"]) {
                opts.cache = true;
              }
            } else {
              utils.shallowCopyFromList(opts, data, _OPTS_EXPRESS);
            }
          }opts.filename = filename;
        } else {
          data = {};
        }return tryHandleCache(opts, data, cb);
      };exports.clearCache = function () {
        exports.cache.reset();
      };function Template(text, opts) {
        opts = opts || {};var options = {};this.templateText = text;this.mode = null;this.truncate = false;this.currentLine = 1;this.source = "";this.dependencies = [];options.client = opts.client || false;options.escapeFunction = opts.escape || utils.escapeXML;options.compileDebug = opts.compileDebug !== false;options.debug = !!opts.debug;options.filename = opts.filename;options.delimiter = opts.delimiter || exports.delimiter || _DEFAULT_DELIMITER;options.strict = opts.strict || false;options.context = opts.context;options.cache = opts.cache || false;options.rmWhitespace = opts.rmWhitespace;options.root = opts.root;options.localsName = opts.localsName || exports.localsName || _DEFAULT_LOCALS_NAME;options.views = opts.views;if (options.strict) {
          options._with = false;
        } else {
          options._with = typeof opts._with != "undefined" ? opts._with : true;
        }this.opts = options;this.regex = this.createRegex();
      }Template.modes = { EVAL: "eval", ESCAPED: "escaped", RAW: "raw", COMMENT: "comment", LITERAL: "literal" };Template.prototype = { createRegex: function createRegex() {
          var str = _REGEX_STRING;var delim = utils.escapeRegExpChars(this.opts.delimiter);str = str.replace(/%/g, delim);return new RegExp(str);
        }, compile: function compile() {
          var src;var fn;var opts = this.opts;var prepended = "";var appended = "";var escapeFn = opts.escapeFunction;if (!this.source) {
            this.generateSource();prepended += "  var __output = [], __append = __output.push.bind(__output);" + "\n";if (opts._with !== false) {
              prepended += "  with (" + opts.localsName + " || {}) {" + "\n";appended += "  }" + "\n";
            }appended += '  return __output.join("");' + "\n";this.source = prepended + this.source + appended;
          }if (opts.compileDebug) {
            src = "var __line = 1" + "\n" + "  , __lines = " + JSON.stringify(this.templateText) + "\n" + "  , __filename = " + (opts.filename ? JSON.stringify(opts.filename) : "undefined") + ";" + "\n" + "try {" + "\n" + this.source + "} catch (e) {" + "\n" + "  rethrow(e, __lines, __filename, __line, escapeFn);" + "\n" + "}" + "\n";
          } else {
            src = this.source;
          }if (opts.client) {
            src = "escapeFn = escapeFn || " + escapeFn.toString() + ";" + "\n" + src;if (opts.compileDebug) {
              src = "rethrow = rethrow || " + rethrow.toString() + ";" + "\n" + src;
            }
          }if (opts.strict) {
            src = '"use strict";\n' + src;
          }if (opts.debug) {
            console.log(src);
          }try {
            fn = new Function(opts.localsName + ", escapeFn, include, rethrow", src);
          } catch (e) {
            if (e instanceof SyntaxError) {
              if (opts.filename) {
                e.message += " in " + opts.filename;
              }e.message += " while compiling ejs\n\n";e.message += "If the above error is not helpful, you may want to try EJS-Lint:\n";e.message += "https://github.com/RyanZim/EJS-Lint";
            }throw e;
          }if (opts.client) {
            fn.dependencies = this.dependencies;return fn;
          }var returnedFn = function returnedFn(data) {
            var include = function include(path, includeData) {
              var d = utils.shallowCopy({}, data);if (includeData) {
                d = utils.shallowCopy(d, includeData);
              }return includeFile(path, opts)(d);
            };return fn.apply(opts.context, [data || {}, escapeFn, include, rethrow]);
          };returnedFn.dependencies = this.dependencies;return returnedFn;
        }, generateSource: function generateSource() {
          var opts = this.opts;if (opts.rmWhitespace) {
            this.templateText = this.templateText.replace(/\r/g, "").replace(/^\s+|\s+$/gm, "");
          }this.templateText = this.templateText.replace(/[ \t]*<%_/gm, "<%_").replace(/_%>[ \t]*/gm, "_%>");var self = this;var matches = this.parseTemplateText();var d = this.opts.delimiter;if (matches && matches.length) {
            matches.forEach(function (line, index) {
              var opening;var closing;var include;var includeOpts;var includeObj;var includeSrc;if (line.indexOf("<" + d) === 0 && line.indexOf("<" + d + d) !== 0) {
                closing = matches[index + 2];if (!(closing == d + ">" || closing == "-" + d + ">" || closing == "_" + d + ">")) {
                  throw new Error('Could not find matching close tag for "' + line + '".');
                }
              }if (include = line.match(/^\s*include\s+(\S+)/)) {
                opening = matches[index - 1];if (opening && (opening == "<" + d || opening == "<" + d + "-" || opening == "<" + d + "_")) {
                  includeOpts = utils.shallowCopy({}, self.opts);includeObj = includeSource(include[1], includeOpts);if (self.opts.compileDebug) {
                    includeSrc = "    ; (function(){" + "\n" + "      var __line = 1" + "\n" + "      , __lines = " + JSON.stringify(includeObj.template) + "\n" + "      , __filename = " + JSON.stringify(includeObj.filename) + ";" + "\n" + "      try {" + "\n" + includeObj.source + "      } catch (e) {" + "\n" + "        rethrow(e, __lines, __filename, __line, escapeFn);" + "\n" + "      }" + "\n" + "    ; }).call(this)" + "\n";
                  } else {
                    includeSrc = "    ; (function(){" + "\n" + includeObj.source + "    ; }).call(this)" + "\n";
                  }self.source += includeSrc;self.dependencies.push(exports.resolveInclude(include[1], includeOpts.filename));return;
                }
              }self.scanLine(line);
            });
          }
        }, parseTemplateText: function parseTemplateText() {
          var str = this.templateText;var pat = this.regex;var result = pat.exec(str);var arr = [];var firstPos;while (result) {
            firstPos = result.index;if (firstPos !== 0) {
              arr.push(str.substring(0, firstPos));str = str.slice(firstPos);
            }arr.push(result[0]);str = str.slice(result[0].length);result = pat.exec(str);
          }if (str) {
            arr.push(str);
          }return arr;
        }, _addOutput: function _addOutput(line) {
          if (this.truncate) {
            line = line.replace(/^(?:\r\n|\r|\n)/, "");this.truncate = false;
          } else if (this.opts.rmWhitespace) {
            line = line.replace(/^\n/, "");
          }if (!line) {
            return line;
          }line = line.replace(/\\/g, "\\\\");line = line.replace(/\n/g, "\\n");line = line.replace(/\r/g, "\\r");line = line.replace(/"/g, '\\"');this.source += '    ; __append("' + line + '")' + "\n";
        }, scanLine: function scanLine(line) {
          var self = this;var d = this.opts.delimiter;var newLineCount = 0;newLineCount = line.split("\n").length - 1;switch (line) {case "<" + d:case "<" + d + "_":
              this.mode = Template.modes.EVAL;break;case "<" + d + "=":
              this.mode = Template.modes.ESCAPED;break;case "<" + d + "-":
              this.mode = Template.modes.RAW;break;case "<" + d + "#":
              this.mode = Template.modes.COMMENT;break;case "<" + d + d:
              this.mode = Template.modes.LITERAL;this.source += '    ; __append("' + line.replace("<" + d + d, "<" + d) + '")' + "\n";break;case d + d + ">":
              this.mode = Template.modes.LITERAL;this.source += '    ; __append("' + line.replace(d + d + ">", d + ">") + '")' + "\n";break;case d + ">":case "-" + d + ">":case "_" + d + ">":
              if (this.mode == Template.modes.LITERAL) {
                this._addOutput(line);
              }this.mode = null;this.truncate = line.indexOf("-") === 0 || line.indexOf("_") === 0;break;default:
              if (this.mode) {
                switch (this.mode) {case Template.modes.EVAL:case Template.modes.ESCAPED:case Template.modes.RAW:
                    if (line.lastIndexOf("//") > line.lastIndexOf("\n")) {
                      line += "\n";
                    }}switch (this.mode) {case Template.modes.EVAL:
                    this.source += "    ; " + line + "\n";break;case Template.modes.ESCAPED:
                    this.source += "    ; __append(escapeFn(" + stripSemi(line) + "))" + "\n";break;case Template.modes.RAW:
                    this.source += "    ; __append(" + stripSemi(line) + ")" + "\n";break;case Template.modes.COMMENT:
                    break;case Template.modes.LITERAL:
                    this._addOutput(line);break;}
              } else {
                this._addOutput(line);
              }}if (self.opts.compileDebug && newLineCount) {
            this.currentLine += newLineCount;this.source += "    ; __line = " + this.currentLine + "\n";
          }
        } };exports.escapeXML = utils.escapeXML;exports.__express = exports.renderFile;if (require.extensions) {
        require.extensions[".ejs"] = function (module, flnm) {
          var filename = flnm || module.filename;var options = { filename: filename, client: true };var template = fileLoader(filename).toString();var fn = exports.compile(template, options);module._compile("module.exports = " + fn.toString() + ";", filename);
        };
      }exports.VERSION = _VERSION_STRING;exports.name = _NAME;if (typeof window != "undefined") {
        window.ejs = exports;
      }
    }, { "../package.json": 6, "./utils": 2, fs: 3, path: 4 }], 2: [function (require, module, exports) {
      "use strict";
      var regExpChars = /[|\\{}()[\]^$+*?.]/g;exports.escapeRegExpChars = function (string) {
        if (!string) {
          return "";
        }return String(string).replace(regExpChars, "\\$&");
      };var _ENCODE_HTML_RULES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&#34;", "'": "&#39;" };var _MATCH_HTML = /[&<>'"]/g;function encode_char(c) {
        return _ENCODE_HTML_RULES[c] || c;
      }var escapeFuncStr = "var _ENCODE_HTML_RULES = {\n" + '      "&": "&amp;"\n' + '    , "<": "&lt;"\n' + '    , ">": "&gt;"\n' + '    , \'"\': "&#34;"\n' + '    , "\'": "&#39;"\n' + "    }\n" + "  , _MATCH_HTML = /[&<>'\"]/g;\n" + "function encode_char(c) {\n" + "  return _ENCODE_HTML_RULES[c] || c;\n" + "};\n";exports.escapeXML = function (markup) {
        return markup == undefined ? "" : String(markup).replace(_MATCH_HTML, encode_char);
      };exports.escapeXML.toString = function () {
        return Function.prototype.toString.call(this) + ";\n" + escapeFuncStr;
      };exports.shallowCopy = function (to, from) {
        from = from || {};for (var p in from) {
          to[p] = from[p];
        }return to;
      };exports.shallowCopyFromList = function (to, from, list) {
        for (var i = 0; i < list.length; i++) {
          var p = list[i];if (typeof from[p] != "undefined") {
            to[p] = from[p];
          }
        }return to;
      };exports.cache = { _data: {}, set: function set(key, val) {
          this._data[key] = val;
        }, get: function get(key) {
          return this._data[key];
        }, reset: function reset() {
          this._data = {};
        } };
    }, {}], 3: [function (require, module, exports) {}, {}], 4: [function (require, module, exports) {
      (function (process) {
        function normalizeArray(parts, allowAboveRoot) {
          var up = 0;for (var i = parts.length - 1; i >= 0; i--) {
            var last = parts[i];if (last === ".") {
              parts.splice(i, 1);
            } else if (last === "..") {
              parts.splice(i, 1);up++;
            } else if (up) {
              parts.splice(i, 1);up--;
            }
          }if (allowAboveRoot) {
            for (; up--; up) {
              parts.unshift("..");
            }
          }return parts;
        }var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;var splitPath = function splitPath(filename) {
          return splitPathRe.exec(filename).slice(1);
        };exports.resolve = function () {
          var resolvedPath = "",
              resolvedAbsolute = false;for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
            var path = i >= 0 ? arguments[i] : process.cwd();if (typeof path !== "string") {
              throw new TypeError("Arguments to path.resolve must be strings");
            } else if (!path) {
              continue;
            }resolvedPath = path + "/" + resolvedPath;resolvedAbsolute = path.charAt(0) === "/";
          }resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function (p) {
            return !!p;
          }), !resolvedAbsolute).join("/");return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
        };exports.normalize = function (path) {
          var isAbsolute = exports.isAbsolute(path),
              trailingSlash = substr(path, -1) === "/";path = normalizeArray(filter(path.split("/"), function (p) {
            return !!p;
          }), !isAbsolute).join("/");if (!path && !isAbsolute) {
            path = ".";
          }if (path && trailingSlash) {
            path += "/";
          }return (isAbsolute ? "/" : "") + path;
        };exports.isAbsolute = function (path) {
          return path.charAt(0) === "/";
        };exports.join = function () {
          var paths = Array.prototype.slice.call(arguments, 0);return exports.normalize(filter(paths, function (p, index) {
            if (typeof p !== "string") {
              throw new TypeError("Arguments to path.join must be strings");
            }return p;
          }).join("/"));
        };exports.relative = function (from, to) {
          from = exports.resolve(from).substr(1);to = exports.resolve(to).substr(1);function trim(arr) {
            var start = 0;for (; start < arr.length; start++) {
              if (arr[start] !== "") break;
            }var end = arr.length - 1;for (; end >= 0; end--) {
              if (arr[end] !== "") break;
            }if (start > end) return [];return arr.slice(start, end - start + 1);
          }var fromParts = trim(from.split("/"));var toParts = trim(to.split("/"));var length = Math.min(fromParts.length, toParts.length);var samePartsLength = length;for (var i = 0; i < length; i++) {
            if (fromParts[i] !== toParts[i]) {
              samePartsLength = i;break;
            }
          }var outputParts = [];for (var i = samePartsLength; i < fromParts.length; i++) {
            outputParts.push("..");
          }outputParts = outputParts.concat(toParts.slice(samePartsLength));return outputParts.join("/");
        };exports.sep = "/";exports.delimiter = ":";exports.dirname = function (path) {
          var result = splitPath(path),
              root = result[0],
              dir = result[1];if (!root && !dir) {
            return ".";
          }if (dir) {
            dir = dir.substr(0, dir.length - 1);
          }return root + dir;
        };exports.basename = function (path, ext) {
          var f = splitPath(path)[2];if (ext && f.substr(-1 * ext.length) === ext) {
            f = f.substr(0, f.length - ext.length);
          }return f;
        };exports.extname = function (path) {
          return splitPath(path)[3];
        };function filter(xs, f) {
          if (xs.filter) return xs.filter(f);var res = [];for (var i = 0; i < xs.length; i++) {
            if (f(xs[i], i, xs)) res.push(xs[i]);
          }return res;
        }var substr = "ab".substr(-1) === "b" ? function (str, start, len) {
          return str.substr(start, len);
        } : function (str, start, len) {
          if (start < 0) start = str.length + start;return str.substr(start, len);
        };
      }).call(this, require("_process"));
    }, { _process: 5 }], 5: [function (require, module, exports) {
      var process = module.exports = {};var cachedSetTimeout;var cachedClearTimeout;function defaultSetTimout() {
        throw new Error("setTimeout has not been defined");
      }function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined");
      }(function () {
        try {
          if (typeof setTimeout === "function") {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }try {
          if (typeof clearTimeout === "function") {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
        }
      })();function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          return setTimeout(fun, 0);
        }if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;return setTimeout(fun, 0);
        }try {
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e) {
            return cachedSetTimeout.call(this, fun, 0);
          }
        }
      }function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          return clearTimeout(marker);
        }if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;return clearTimeout(marker);
        }try {
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            return cachedClearTimeout.call(null, marker);
          } catch (e) {
            return cachedClearTimeout.call(this, marker);
          }
        }
      }var queue = [];var draining = false;var currentQueue;var queueIndex = -1;function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }draining = false;if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }if (queue.length) {
          drainQueue();
        }
      }function drainQueue() {
        if (draining) {
          return;
        }var timeout = runTimeout(cleanUpNextTick);draining = true;var len = queue.length;while (len) {
          currentQueue = queue;queue = [];while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }queueIndex = -1;len = queue.length;
        }currentQueue = null;draining = false;runClearTimeout(timeout);
      }process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }queue.push(new Item(fun, args));if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };function Item(fun, array) {
        this.fun = fun;this.array = array;
      }Item.prototype.run = function () {
        this.fun.apply(null, this.array);
      };process.title = "browser";process.browser = true;process.env = {};process.argv = [];process.version = "";process.versions = {};function noop() {}process.on = noop;process.addListener = noop;process.once = noop;process.off = noop;process.removeListener = noop;process.removeAllListeners = noop;process.emit = noop;process.prependListener = noop;process.prependOnceListener = noop;process.listeners = function (name) {
        return [];
      };process.binding = function (name) {
        throw new Error("process.binding is not supported");
      };process.cwd = function () {
        return "/";
      };process.chdir = function (dir) {
        throw new Error("process.chdir is not supported");
      };process.umask = function () {
        return 0;
      };
    }, {}], 6: [function (require, module, exports) {
      module.exports = { name: "ejs", description: "Embedded JavaScript templates", keywords: ["template", "engine", "ejs"], version: "2.5.7", author: "Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)", contributors: ["Timothy Gu <timothygu99@gmail.com> (https://timothygu.github.io)"], license: "Apache-2.0", main: "./lib/ejs.js", repository: { type: "git", url: "git://github.com/mde/ejs.git" }, bugs: "https://github.com/mde/ejs/issues", homepage: "https://github.com/mde/ejs", dependencies: {}, devDependencies: { browserify: "^13.0.1", eslint: "^4.14.0", "git-directory-deploy": "^1.5.1", istanbul: "~0.4.3", jake: "^8.0.0", jsdoc: "^3.4.0", "lru-cache": "^4.0.1", mocha: "^3.0.2", "uglify-js": "^2.6.2" }, engines: { node: ">=0.10.0" }, scripts: { test: "jake test", lint: 'eslint "**/*.js" Jakefile', coverage: "istanbul cover node_modules/mocha/bin/_mocha", doc: "jake doc", devdoc: "jake doc[dev]" } };
    }, {}] }, {}, [1])(1);
});

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

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ejs = __webpack_require__(138);

var Autocomplete = function () {
  var $$ = new WeakMap();
  var $n = function $n(el, where, html) {
    el.insertAdjacentHTML(where, html);
    if (where === 'beforeend') return el.previousSibling;
    if (where === 'afterbegin') return el.firstElementChild;
    if (where === 'beforeend') return el.lastElementChild;
    if (where === 'afterend') return el.nextSibling;
    return null;
  };

  var Autocomplete = function () {
    function Autocomplete(el) {
      _classCallCheck(this, Autocomplete);

      this.$el = el;
      this.$options = Object.assign(new Object(), el.dataset);
      this.$options.insert = this.$options.insert || 'beforeend';
      this.$options.search = this.$options.search || 'name';
      this.$options.limit = this.$options.limit || 10;
      this.$options.results = el.querySelector('.autocomplete-results');
      this.$options.input = el.querySelector('input');
      this.$options.data = function (data) {
        return data;
      };
      this.$data = {};
      this.$results = {};
      this.$match = function () {
        return true;
      };
    }

    _createClass(Autocomplete, [{
      key: 'init',
      value: function init() {
        var _this = this;

        return new Promise(function (resolve, reject) {
          console.log(_this.$options);
          _this.fetchSource().then(function (data) {
            _this.$data = _this.$options.data(data);
            if (!_this.$options.input) {
              _this.$options.input = $n(_this.$el, 'afterbegin', '<input type="text" />');
            }
            if (!_this.$options.results) {
              _this.$options.results = $n(_this.$el, _this.$options.insert, '<div class="autocomplete-results"></div>');
            }
            _this.watch();
            resolve(_this);
          });
        });
      }
    }, {
      key: 'watch',
      value: function watch() {
        this.$el.oninput = this.change.bind(this);
      }
    }, {
      key: 'change',
      value: function change(e) {
        var _this2 = this;

        var query = this.$options.input.value;
        if (!query) {
          this.$options.results.innerHTML = '';
          return;
        }
        this.$results = JSON.parse(JSON.stringify(this.$data.filter(function (item) {
          return _this2.$match(item, query);
        }).slice(0, this.$options.limit)));

        this.$options.results.innerHTML = '';
        console.log(this.$results);
        this.$results.forEach(function (item) {
          var obj = item;
          var props = _this2.$options.search.split('.');
          var prop = props.pop();
          props.forEach(function (p) {
            item[p] = item[p] || {};
            obj = item[p];
          });
          obj[prop] = obj[prop].split(new RegExp(query, 'i')).join('<span class="autocomplete-match">' + query + '</span>');
          // console.log(item);
          _this2.$options.results.insertAdjacentHTML('beforeend', ejs.render(_this2.$template, item, Object.assign({
            context: item
          }, _this2.$templateOptions)));
        });
      }
    }, {
      key: 'template',
      value: function template(val, options) {
        this.$template = val;
        this.$templateOptions = options;
        return this;
      }
    }, {
      key: 'match',
      value: function match(cb) {
        this.$match = cb;
        return this;
      }
    }, {
      key: 'settings',
      value: function settings(val) {
        this.$options = Object.assign(this.$options, val);
        return this;
      }
    }, {
      key: 'fetchSource',
      value: function fetchSource() {
        var _this3 = this;

        return new Promise(function (resolve, reject) {
          fetch(_this3.$options.source).then(function (res) {
            return res.json();
          }).then(function (json) {
            return resolve(json);
          }).catch(function (err) {
            return reject(err);
          });
        });
      }
    }]);

    return Autocomplete;
  }();

  return Autocomplete;
}();

module.exports = Autocomplete;

/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(100);


/***/ })

/******/ });