(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["i"] = bind;
/* harmony export (immutable) */ exports["h"] = noop;
/* harmony export (immutable) */ exports["e"] = warn;
/* harmony export (immutable) */ exports["g"] = isObject;
/* harmony export (immutable) */ exports["b"] = query;
/* harmony export (immutable) */ exports["d"] = getOuterHTML;
/* harmony export (immutable) */ exports["k"] = cached;
/* harmony export (binding) */ __webpack_require__.d(exports, "j", function() { return camelize; });
/* unused harmony export capitalize */
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return idToTemplate; });
/* harmony export (immutable) */ exports["a"] = _toString;
/* unused harmony export hasOwn */
/* harmony export (immutable) */ exports["f"] = resolveAsset;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function bind(fn, ctx) {
    function boundFn(a) {
        var l = arguments.length;
        return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
    }
    // record original fn length
    boundFn._length = fn.length;
    return boundFn;
}

function noop() {}

function warn(msg) {
    console.error('[Evo warn]: ' + msg + ' ');
}

function isObject(obj) {
    return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

function query(el) {
    if (typeof el === 'string') {
        var selector = el;
        el = document.querySelector(el);
        if (!el) {
            return document.createElement('div');
        }
    }
    return el;
}

function getOuterHTML(el) {
    if (el.outerHTML) {
        return el.outerHTML;
    } else {
        var container = document.createElement('div');
        container.appendChild(el.cloneNode(true));
        return container.innerHTML;
    }
}

function cached(fn) {
    var cache = Object.create(null);
    return function cachedFn(str) {
        var hit = cache[str];
        return hit || (cache[str] = fn(str));
    };
}

var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
    return str.replace(camelizeRE, function (_, c) {
        return c ? c.toUpperCase() : '';
    });
});

var capitalize = cached(function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
});

var idToTemplate = cached(function (id) {
    var el = query(id);
    return el && el.innerHTML;
});

function _toString(val) {
    return val == null ? '' : (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? JSON.stringify(val, null, 2) : String(val);
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}

function resolveAsset(options, type, id) {
    /* istanbul ignore if */
    if (typeof id !== 'string') {
        return;
    }
    var assets = options[type];
    if (!assets) {
        return;
    }
    // check local registration variations first
    if (hasOwn(assets, id)) {
        return assets[id];
    }
    var camelizedId = camelize(id);
    if (hasOwn(assets, camelizedId)) {
        return assets[camelizedId];
    }
    var PascalCaseId = capitalize(camelizedId);
    if (hasOwn(assets, PascalCaseId)) {
        return assets[PascalCaseId];
    }
}

/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = function(sel, data, children, text, elm) {
  var key = data === undefined ? undefined : data.key;
  return {sel: sel, data: data, children: children,
          text: text, elm: elm, key: key};
};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "g", function() { return dirRE; });
/* harmony export (binding) */ __webpack_require__.d(exports, "d", function() { return forAliasRE; });
/* harmony export (binding) */ __webpack_require__.d(exports, "e", function() { return forIteratorRE; });
/* harmony export (binding) */ __webpack_require__.d(exports, "m", function() { return onRE; });
/* harmony export (binding) */ __webpack_require__.d(exports, "j", function() { return bindRE; });
/* harmony export (binding) */ __webpack_require__.d(exports, "i", function() { return modifierRE; });
/* harmony export (immutable) */ exports["f"] = addIfCondition;
/* harmony export (immutable) */ exports["h"] = parseModifiers;
/* harmony export (immutable) */ exports["c"] = getAndRemoveAttr;
/* harmony export (immutable) */ exports["a"] = makeAttrsMap;
/* harmony export (immutable) */ exports["l"] = addAttr;
/* harmony export (immutable) */ exports["k"] = addProp;
/* harmony export (immutable) */ exports["n"] = addHandler;
/* harmony export (immutable) */ exports["b"] = processIfConditions;
/* harmony export (immutable) */ exports["o"] = makeFunction;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;
var onRE = /^@|^v-on:/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

function addIfCondition(el, condition) {
    if (!el.ifConditions) {
        el.ifConditions = [];
    }
    el.ifConditions.push(condition);
}

function parseModifiers(name) {
    var match = name.match(modifierRE);
    if (match) {
        var _ret = function () {
            var ret = {};
            match.forEach(function (m) {
                ret[m.slice(1)] = true;
            });
            return {
                v: ret
            };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
}

function getAndRemoveAttr(el, name) {
    var val = void 0;
    if ((val = el.attrsMap[name]) != null) {
        var list = el.attrsList;
        for (var i = 0, l = list.length; i < l; i++) {
            if (list[i].name === name) {
                list.splice(i, 1);
                break;
            }
        }
    }
    return val;
}

function makeAttrsMap(attrs) {
    var map = {};
    for (var i = 0, l = attrs.length; i < l; i++) {
        map[attrs[i].name] = attrs[i].value;
    }
    return map;
}

function addAttr(el, name, value) {
    (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addProp(el, name, value) {
    (el.props || (el.props = [])).push({ name: name, value: value });
}

function addHandler(el, name, value, modifiers, important) {
    // check capture modifier
    if (modifiers && modifiers.capture) {
        delete modifiers.capture;
        name = '!' + name; // mark the event as captured
    }
    if (modifiers && modifiers.once) {
        delete modifiers.once;
        name = '~' + name; // mark the event as once
    }
    var events = void 0;
    if (modifiers && modifiers.native) {
        delete modifiers.native;
        events = el.nativeEvents || (el.nativeEvents = {});
    } else {
        events = el.events || (el.events = {});
    }
    var newHandler = { value: value, modifiers: modifiers };
    var handlers = events[name];
    /* istanbul ignore if */
    if (Array.isArray(handlers)) {
        important ? handlers.unshift(newHandler) : handlers.push(newHandler);
    } else if (handlers) {
        events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
    } else {
        events[name] = newHandler;
    }
}

function findPrevElement(children) {
    var i = children.length;
    while (i--) {
        if (children[i].tag) return children[i];
    }
}

function processIfConditions(el, parent) {
    var prev = findPrevElement(parent.children);
    if (prev && prev.if) {
        addIfCondition(prev, {
            exp: el.elseif,
            block: el
        });
    } else {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* warn */])('v-' + (el.elseif ? 'else-if="' + el.elseif + '"' : 'else') + ' ' + ('used on element <' + el.tag + '> without corresponding v-if.'));
    }
}

function makeFunction(code) {
    try {
        return new Function(code);
    } catch (e) {
        return __WEBPACK_IMPORTED_MODULE_0__util__["h" /* noop */];
    }
}

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = {
  array: Array.isArray,
  primitive: function(s) { return typeof s === 'string' || typeof s === 'number'; },
};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(19)


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__html_parser__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__text_parser__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__codegen__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers__ = __webpack_require__(2);
/* harmony export (immutable) */ exports["a"] = compileToFunctions;






function compileToFunctions(template, vm) {
    var root = void 0;
    var currentParent = void 0;
    var options = vm.$options;
    var stack = [];

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__html_parser__["a" /* default */])(template, {
        start: function start(tag, attrs, unary) {
            var element = {
                type: 1,
                tag: tag,
                attrsList: attrs,
                attrsMap: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__helpers__["a" /* makeAttrsMap */])(attrs),
                parent: currentParent,
                children: []
            };

            processFor(element);
            processIf(element);
            processKey(element);
            processAttrs(element);

            if (!root) {
                root = element;
            }

            if (currentParent && !element.forbidden) {
                if (element.elseif || element.else) {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__helpers__["b" /* processIfConditions */])(element, currentParent);
                } else if (element.slotScope) {// scoped slot

                } else {
                    currentParent.children.push(element);
                    element.parent = currentParent;
                }
            }

            if (!unary) {
                currentParent = element;
                stack.push(element);
            }
        },
        end: function end(tag) {
            var element = stack[stack.length - 1];
            var lastNode = element.children[element.children.length - 1];
            if (lastNode && lastNode.type === 3 && lastNode.text === ' ') {
                element.children.pop();
            }
            // pop stack
            stack.length -= 1;
            currentParent = stack[stack.length - 1];
        },
        chars: function chars(text) {
            if (!text.trim()) {
                text = ' ';
            }

            var expression = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__text_parser__["a" /* default */])(text, options.delimiters);
            if (expression) {
                currentParent.children.push({
                    type: 2,
                    expression: expression,
                    text: text
                });
            } else {
                currentParent.children.push({
                    type: 3,
                    text: text
                });
            }
        },
        comment: function comment(text) {}
    });

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__codegen__["a" /* default */])(root);
}

function processFor(el) {
    var exp = void 0;
    if (exp = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__helpers__["c" /* getAndRemoveAttr */])(el, 'v-for')) {
        var inMatch = exp.match(__WEBPACK_IMPORTED_MODULE_4__helpers__["d" /* forAliasRE */]);
        if (!inMatch) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["e" /* warn */])('Invalid v-for expression: ' + exp);
            return;
        }
        el.for = inMatch[2].trim();
        var alias = inMatch[1].trim();
        var iteratorMatch = alias.match(__WEBPACK_IMPORTED_MODULE_4__helpers__["e" /* forIteratorRE */]);
        if (iteratorMatch) {
            el.alias = iteratorMatch[1].trim();
            el.iterator1 = iteratorMatch[2].trim();
            if (iteratorMatch[3]) {
                el.iterator2 = iteratorMatch[3].trim();
            }
        } else {
            el.alias = alias;
        }
    }
}

function processIf(el) {
    var exp = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__helpers__["c" /* getAndRemoveAttr */])(el, 'v-if');
    if (exp) {
        el.if = exp;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__helpers__["f" /* addIfCondition */])(el, {
            exp: exp,
            block: el
        });
    } else {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__helpers__["c" /* getAndRemoveAttr */])(el, 'v-else') != null) {
            el.else = true;
        }
        var elseif = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__helpers__["c" /* getAndRemoveAttr */])(el, 'v-else-if');
        if (elseif) {
            el.elseif = elseif;
        }
    }
}

function processKey(el) {
    // TODO key 优化处理
}

function processAttrs(el) {
    var list = el.attrsList;
    var i = void 0,
        l = void 0,
        name = void 0,
        rawName = void 0,
        value = void 0,
        arg = void 0,
        modifiers = void 0,
        isProp = void 0;
    for (i = 0, l = list.length; i < l; i++) {
        name = rawName = list[i].name;
        value = list[i].value;
        if (__WEBPACK_IMPORTED_MODULE_4__helpers__["g" /* dirRE */].test(name)) {
            // modifiers
            modifiers = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__helpers__["h" /* parseModifiers */])(name);
            if (modifiers) {
                name = name.replace(__WEBPACK_IMPORTED_MODULE_4__helpers__["i" /* modifierRE */], '');
            }
            if (__WEBPACK_IMPORTED_MODULE_4__helpers__["j" /* bindRE */].test(name)) {
                // v-bind
                name = name.replace(__WEBPACK_IMPORTED_MODULE_4__helpers__["j" /* bindRE */], '');
                if (modifiers) {
                    if (modifiers.prop) {
                        isProp = true;
                        name = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["j" /* camelize */])(name);
                        if (name === 'innerHtml') name = 'innerHTML';
                    }
                    if (modifiers.camel) {
                        name = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["j" /* camelize */])(name);
                    }
                }
                if (isProp) {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__helpers__["k" /* addProp */])(el, name, value);
                } else {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__helpers__["l" /* addAttr */])(el, name, value);
                }
            } else if (__WEBPACK_IMPORTED_MODULE_4__helpers__["m" /* onRE */].test(name)) {
                // v-on
                name = name.replace(__WEBPACK_IMPORTED_MODULE_4__helpers__["m" /* onRE */], '');
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__helpers__["n" /* addHandler */])(el, name, value, modifiers);
            } else {// normal directives

            }
        } else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__helpers__["l" /* addAttr */])(el, name, JSON.stringify(value));
        }
    }
}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

var VNode = __webpack_require__(1);
var is = __webpack_require__(3);

function addNS(data, children, sel) {
  data.ns = 'http://www.w3.org/2000/svg';

  if (sel !== 'foreignObject' && children !== undefined) {
    for (var i = 0; i < children.length; ++i) {
      addNS(children[i].data, children[i].children, children[i].sel);
    }
  }
}

module.exports = function h(sel, b, c) {
  var data = {}, children, text, i;
  if (c !== undefined) {
    data = b;
    if (is.array(c)) { children = c; }
    else if (is.primitive(c)) { text = c; }
  } else if (b !== undefined) {
    if (is.array(b)) { children = b; }
    else if (is.primitive(b)) { text = b; }
    else { data = b; }
  }
  if (is.array(children)) {
    for (i = 0; i < children.length; ++i) {
      if (is.primitive(children[i])) children[i] = VNode(undefined, undefined, undefined, children[i]);
    }
  }
  if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g') {
    addNS(data, children, sel);
  }
  return VNode(sel, data, children, text, undefined);
};


/***/ },
/* 7 */
/***/ function(module, exports) {

var NamespaceURIs = {
  "xlink": "http://www.w3.org/1999/xlink"
};

var booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare",
                "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable",
                "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple",
                "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly",
                "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate",
                "truespeed", "typemustmatch", "visible"];

var booleanAttrsDict = Object.create(null);
for(var i=0, len = booleanAttrs.length; i < len; i++) {
  booleanAttrsDict[booleanAttrs[i]] = true;
}

function updateAttrs(oldVnode, vnode) {
  var key, cur, old, elm = vnode.elm,
      oldAttrs = oldVnode.data.attrs, attrs = vnode.data.attrs, namespaceSplit;

  if (!oldAttrs && !attrs) return;
  oldAttrs = oldAttrs || {};
  attrs = attrs || {};

  // update modified attributes, add new attributes
  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      if(!cur && booleanAttrsDict[key])
        elm.removeAttribute(key);
      else {
        namespaceSplit = key.split(":");
        if(namespaceSplit.length > 1 && NamespaceURIs.hasOwnProperty(namespaceSplit[0]))
          elm.setAttributeNS(NamespaceURIs[namespaceSplit[0]], key, cur);
        else
          elm.setAttribute(key, cur);
      }
    }
  }
  //remove removed attributes
  // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
  // the other option is to remove all attributes with value == undefined
  for (key in oldAttrs) {
    if (!(key in attrs)) {
      elm.removeAttribute(key);
    }
  }
}

module.exports = {create: updateAttrs, update: updateAttrs};


/***/ },
/* 8 */
/***/ function(module, exports) {

function updateClass(oldVnode, vnode) {
  var cur, name, elm = vnode.elm,
      oldClass = oldVnode.data.class,
      klass = vnode.data.class;

  if (!oldClass && !klass) return;
  oldClass = oldClass || {};
  klass = klass || {};

  for (name in oldClass) {
    if (!klass[name]) {
      elm.classList.remove(name);
    }
  }
  for (name in klass) {
    cur = klass[name];
    if (cur !== oldClass[name]) {
      elm.classList[cur ? 'add' : 'remove'](name);
    }
  }
}

module.exports = {create: updateClass, update: updateClass};


/***/ },
/* 9 */
/***/ function(module, exports) {

function invokeHandler(handler, vnode, event) {
  if (typeof handler === "function") {
    // call function handler
    handler.call(vnode, event, vnode);
  } else if (typeof handler === "object") {
    // call handler with arguments
    if (typeof handler[0] === "function") {
      // special case for single argument for performance
      if (handler.length === 2) {
        handler[0].call(vnode, handler[1], event, vnode);
      } else {
        var args = handler.slice(1);
        args.push(event);
        args.push(vnode);
        handler[0].apply(vnode, args);
      }
    } else {
      // call multiple handlers
      for (var i = 0; i < handler.length; i++) {
        invokeHandler(handler[i]);
      }
    }
  }
}

function handleEvent(event, vnode) {
  var name = event.type,
      on = vnode.data.on;

  // call event handler(s) if exists
  if (on && on[name]) {
    invokeHandler(on[name], vnode, event);
  }
}

function createListener() {
  return function handler(event) {
    handleEvent(event, handler.vnode);
  }
}

function updateEventListeners(oldVnode, vnode) {
  var oldOn = oldVnode.data.on,
      oldListener = oldVnode.listener,
      oldElm = oldVnode.elm,
      on = vnode && vnode.data.on,
      elm = vnode && vnode.elm,
      name;

  // optimization for reused immutable handlers
  if (oldOn === on) {
    return;
  }

  // remove existing listeners which no longer used
  if (oldOn && oldListener) {
    // if element changed or deleted we remove all existing listeners unconditionally
    if (!on) {
      for (name in oldOn) {
        // remove listener if element was changed or existing listeners removed
        oldElm.removeEventListener(name, oldListener, false);
      }
    } else {
      for (name in oldOn) {
        // remove listener if existing listener removed
        if (!on[name]) {
          oldElm.removeEventListener(name, oldListener, false);
        }
      }
    }
  }

  // add new listeners which has not already attached
  if (on) {
    // reuse existing listener or create new
    var listener = vnode.listener = oldVnode.listener || createListener();
    // update vnode for listener
    listener.vnode = vnode;

    // if element changed or added we add all needed listeners unconditionally
    if (!oldOn) {
      for (name in on) {
        // add listener if element was changed or new listeners added
        elm.addEventListener(name, listener, false);
      }
    } else {
      for (name in on) {
        // add listener if new listener added
        if (!oldOn[name]) {
          elm.addEventListener(name, listener, false);
        }
      }
    }
  }
}

module.exports = {
  create: updateEventListeners,
  update: updateEventListeners,
  destroy: updateEventListeners
};


/***/ },
/* 10 */
/***/ function(module, exports) {

function updateProps(oldVnode, vnode) {
  var key, cur, old, elm = vnode.elm,
      oldProps = oldVnode.data.props, props = vnode.data.props;

  if (!oldProps && !props) return;
  oldProps = oldProps || {};
  props = props || {};

  for (key in oldProps) {
    if (!props[key]) {
      delete elm[key];
    }
  }
  for (key in props) {
    cur = props[key];
    old = oldProps[key];
    if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
      elm[key] = cur;
    }
  }
}

module.exports = {create: updateProps, update: updateProps};


/***/ },
/* 11 */
/***/ function(module, exports) {

var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
var nextFrame = function(fn) { raf(function() { raf(fn); }); };

function setNextFrame(obj, prop, val) {
  nextFrame(function() { obj[prop] = val; });
}

function updateStyle(oldVnode, vnode) {
  var cur, name, elm = vnode.elm,
      oldStyle = oldVnode.data.style,
      style = vnode.data.style;

  if (!oldStyle && !style) return;
  oldStyle = oldStyle || {};
  style = style || {};
  var oldHasDel = 'delayed' in oldStyle;

  for (name in oldStyle) {
    if (!style[name]) {
      elm.style[name] = '';
    }
  }
  for (name in style) {
    cur = style[name];
    if (name === 'delayed') {
      for (name in style.delayed) {
        cur = style.delayed[name];
        if (!oldHasDel || cur !== oldStyle.delayed[name]) {
          setNextFrame(elm.style, name, cur);
        }
      }
    } else if (name !== 'remove' && cur !== oldStyle[name]) {
      elm.style[name] = cur;
    }
  }
}

function applyDestroyStyle(vnode) {
  var style, name, elm = vnode.elm, s = vnode.data.style;
  if (!s || !(style = s.destroy)) return;
  for (name in style) {
    elm.style[name] = style[name];
  }
}

function applyRemoveStyle(vnode, rm) {
  var s = vnode.data.style;
  if (!s || !s.remove) {
    rm();
    return;
  }
  var name, elm = vnode.elm, idx, i = 0, maxDur = 0,
      compStyle, style = s.remove, amount = 0, applied = [];
  for (name in style) {
    applied.push(name);
    elm.style[name] = style[name];
  }
  compStyle = getComputedStyle(elm);
  var props = compStyle['transition-property'].split(', ');
  for (; i < props.length; ++i) {
    if(applied.indexOf(props[i]) !== -1) amount++;
  }
  elm.addEventListener('transitionend', function(ev) {
    if (ev.target === elm) --amount;
    if (amount === 0) rm();
  });
}

module.exports = {create: updateStyle, update: updateStyle, destroy: applyDestroyStyle, remove: applyRemoveStyle};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
// jshint newcap: false
/* global require, module, document, Node */


var VNode = __webpack_require__(1);
var is = __webpack_require__(3);
var domApi = __webpack_require__(24);

function isUndef(s) { return s === undefined; }
function isDef(s) { return s !== undefined; }

var emptyNode = VNode('', {}, [], undefined, undefined);

function sameVnode(vnode1, vnode2) {
  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, map = {}, key;
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }
  return map;
}

var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];

function init(modules, api) {
  var i, j, cbs = {};

  if (isUndef(api)) api = domApi;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (modules[j][hooks[i]] !== undefined) cbs[hooks[i]].push(modules[j][hooks[i]]);
    }
  }

  function emptyNodeAt(elm) {
    var id = elm.id ? '#' + elm.id : '';
    var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
    return VNode(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    return function () {
      if (--listeners === 0) {
        var parent = api.parentNode(childElm);
        api.removeChild(parent, childElm);
      }
    };
  }

  function createElm(vnode, insertedVnodeQueue) {
    var i, data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode);
        data = vnode.data;
      }
    }
    var elm, children = vnode.children, sel = vnode.sel;
    if (isDef(sel)) {
      // Parse selector
      var hashIdx = sel.indexOf('#');
      var dotIdx = sel.indexOf('.', hashIdx);
      var hash = hashIdx > 0 ? hashIdx : sel.length;
      var dot = dotIdx > 0 ? dotIdx : sel.length;
      var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
      elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)
        : api.createElement(tag);
      if (hash < dot) elm.id = sel.slice(hash + 1, dot);
      if (dotIdx > 0) elm.className = sel.slice(dot + 1).replace(/\./g, ' ');
      if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
          api.appendChild(elm, createElm(children[i], insertedVnodeQueue));
        }
      } else if (is.primitive(vnode.text)) {
        api.appendChild(elm, api.createTextNode(vnode.text));
      }
      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
      i = vnode.data.hook; // Reuse variable
      if (isDef(i)) {
        if (i.create) i.create(emptyNode, vnode);
        if (i.insert) insertedVnodeQueue.push(vnode);
      }
    } else {
      elm = vnode.elm = api.createTextNode(vnode.text);
    }
    return vnode.elm;
  }

  function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      api.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j, data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode);
      for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
      if (isDef(i = vnode.children)) {
        for (j = 0; j < vnode.children.length; ++j) {
          invokeDestroyHook(vnode.children[j]);
        }
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var i, listeners, rm, ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.sel)) {
          invokeDestroyHook(ch);
          listeners = cbs.remove.length + 1;
          rm = createRmCb(ch.elm, listeners);
          for (i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm);
          if (isDef(i = ch.data) && isDef(i = i.hook) && isDef(i = i.remove)) {
            i(ch, rm);
          } else {
            rm();
          }
        } else { // Text node
          api.removeChild(parentElm, ch.elm);
        }
      }
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
    var oldStartIdx = 0, newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, before;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        idxInOld = oldKeyToIdx[newStartVnode.key];
        if (isUndef(idxInOld)) { // New element
          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
          oldCh[idxInOld] = undefined;
          api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      before = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
    var i, hook;
    if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm, oldCh = oldVnode.children, ch = vnode.children;
    if (oldVnode === vnode) return;
    if (!sameVnode(oldVnode, vnode)) {
      var parentElm = api.parentNode(oldVnode.elm);
      elm = createElm(vnode, insertedVnodeQueue);
      api.insertBefore(parentElm, elm, oldVnode.elm);
      removeVnodes(parentElm, [oldVnode], 0, 0);
      return;
    }
    if (isDef(vnode.data)) {
      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
      i = vnode.data.hook;
      if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) api.setTextContent(elm, '');
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        api.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      api.setTextContent(elm, vnode.text);
    }
    if (isDef(hook) && isDef(i = hook.postpatch)) {
      i(oldVnode, vnode);
    }
  }

  return function (oldVnode, vnode) {
    var i, elm, parent;
    var insertedVnodeQueue = [];
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();

    if (isUndef(oldVnode.sel)) {
      oldVnode = emptyNodeAt(oldVnode);
    }

    if (sameVnode(oldVnode, vnode)) {
      patchVnode(oldVnode, vnode, insertedVnodeQueue);
    } else {
      elm = oldVnode.elm;
      parent = api.parentNode(elm);

      createElm(vnode, insertedVnodeQueue);

      if (parent !== null) {
        api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
        removeVnodes(parent, [oldVnode], 0, 0);
      }
    }

    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
    }
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
    return vnode;
  };
}

module.exports = { init: init };


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


const native = Map.prototype
const masterKey = Symbol('Map master key')

const getters = ['has', 'get']
const iterators = ['forEach', 'keys', 'values', 'entries', Symbol.iterator]
const all = ['set', 'delete', 'clear'].concat(getters, iterators)

module.exports = function shim (target, registerObserver, queueObservers) {
  target.$raw = {}

  for (let method of all) {
    target.$raw[method] = function () {
      native[method].apply(target, arguments)
    }
  }

  for (let getter of getters) {
    target[getter] = function (key) {
      registerObserver(this, key)
      return native[getter].apply(this, arguments)
    }
  }

  for (let iterator of iterators) {
    target[iterator] = function () {
      registerObserver(this, masterKey)
      return native[iterator].apply(this, arguments)
    }
  }

  target.set = function (key, value) {
    if (this.get(key) !== value) {
      queueObservers(this, key)
      queueObservers(this, masterKey)
    }
    return native.set.apply(this, arguments)
  }

  target.delete = function (key) {
    if (this.has(key)) {
      queueObservers(this, key)
      queueObservers(this, masterKey)
    }
    return native.delete.apply(this, arguments)
  }

  target.clear = function () {
    if (this.size) {
      queueObservers(this, masterKey)
    }
    return native.clear.apply(this, arguments)
  }

  return target
}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


const native = Set.prototype
const masterValue = Symbol('Set master value')

const getters = ['has']
const iterators = ['forEach', 'keys', 'values', 'entries', Symbol.iterator]
const all = ['add', 'delete', 'clear'].concat(getters, iterators)

module.exports = function shim (target, registerObserver, queueObservers) {
  target.$raw = {}

  for (let method of all) {
    target.$raw[method] = function () {
      native[method].apply(target, arguments)
    }
  }

  for (let getter of getters) {
    target[getter] = function (value) {
      registerObserver(this, value)
      return native[getter].apply(this, arguments)
    }
  }

  for (let iterator of iterators) {
    target[iterator] = function () {
      registerObserver(this, masterValue)
      return native[iterator].apply(this, arguments)
    }
  }

  target.add = function (value) {
    if (!this.has(value)) {
      queueObservers(this, value)
      queueObservers(this, masterValue)
    }
    return native.add.apply(this, arguments)
  }

  target.delete = function (value) {
    if (this.has(value)) {
      queueObservers(this, value)
      queueObservers(this, masterValue)
    }
    return native.delete.apply(this, arguments)
  }

  target.clear = function () {
    if (this.size) {
      queueObservers(this, masterValue)
    }
    return native.clear.apply(this, arguments)
  }

  return target
}


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


const native = WeakMap.prototype

const getters = ['has', 'get']
const all = ['set', 'delete'].concat(getters)

module.exports = function shim (target, registerObserver, queueObservers) {
  target.$raw = {}

  for (let method of all) {
    target.$raw[method] = function () {
      native[method].apply(target, arguments)
    }
  }

  for (let getter of getters) {
    target[getter] = function (key) {
      registerObserver(this, key)
      return native[getter].apply(this, arguments)
    }
  }

  target.set = function (key, value) {
    if (this.get(key) !== value) {
      queueObservers(this, key)
    }
    return native.set.apply(this, arguments)
  }

  target.delete = function (key) {
    if (this.has(key)) {
      queueObservers(this, key)
    }
    return native.delete.apply(this, arguments)
  }

  return target
}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


const native = WeakSet.prototype

const getters = ['has']
const all = ['add', 'delete'].concat(getters)

module.exports = function shim (target, registerObserver, queueObservers) {
  target.$raw = {}

  for (let method of all) {
    target.$raw[method] = function () {
      native[method].apply(target, arguments)
    }
  }

  for (let getter of getters) {
    target[getter] = function (value) {
      registerObserver(this, value)
      return native[getter].apply(this, arguments)
    }
  }

  target.add = function (value) {
    if (!this.has(value)) {
      queueObservers(this, value)
    }
    return native.add.apply(this, arguments)
  }

  target.delete = function (value) {
    if (this.has(value)) {
      queueObservers(this, value)
    }
    return native.delete.apply(this, arguments)
  }

  return target
}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


const MapShim = __webpack_require__(13)
const SetShim = __webpack_require__(14)
const WeakMapShim = __webpack_require__(15)
const WeakSetShim = __webpack_require__(16)

module.exports = new Map([
  [Map, MapShim],
  [Set, SetShim],
  [WeakMap, WeakMapShim],
  [WeakSet, WeakSetShim],
  [Date, true],
  [RegExp, true]
])


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


let promise = Promise.resolve()
let mutateWithTask
let currTask

module.exports = function nextTick (task) {
  currTask = task
  if (mutateWithTask) {
    mutateWithTask()
  } else {
    promise = promise.then(task)
  }
}

if (typeof MutationObserver !== 'undefined') {
  let counter = 0
  const observer = new MutationObserver(onTask)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {characterData: true})

  mutateWithTask = function mutateWithTask () {
    counter = (counter + 1) % 2
    textNode.textContent = counter
  }
}

function onTask () {
  if (currTask) {
    currTask()
  }
}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


const nextTick = __webpack_require__(18)
const builtIns = __webpack_require__(17)
const wellKnowSymbols = __webpack_require__(20)

const proxies = new WeakMap()
const observers = new WeakMap()
const queuedObservers = new Set()
const enumerate = Symbol('enumerate')
let queued = false
let currentObserver
const handlers = {get, ownKeys, set, deleteProperty}

module.exports = {
  observe,
  unobserve,
  queue,
  observable,
  isObservable
}

function observe (fn, context, ...args) {
  if (typeof fn !== 'function') {
    throw new TypeError('first argument must be a function')
  }
  args = args.length ? args : undefined
  const observer = {fn, context, args, observedKeys: []}
  queueObserver(observer)
  return observer
}

function unobserve (observer) {
  if (typeof observer === 'object') {
    if (observer.observedKeys) {
      observer.observedKeys.forEach(unobserveKey, observer)
    }
    observer.fn = observer.context = observer.args = observer.observedKeys = undefined
  }
}

function queue (fn, context, ...args) {
  if (typeof fn !== 'function') {
    throw new TypeError('first argument must be a function')
  }
  args = args.length ? args : undefined
  const observer = {fn, context, args, once: true}
  queueObserver(observer)
  return observer
}

function observable (obj) {
  obj = obj || {}
  if (typeof obj !== 'object') {
    throw new TypeError('first argument must be an object or undefined')
  }
  return proxies.get(obj) || toObservable(obj)
}

function toObservable (obj) {
  let observable
  const builtIn = builtIns.get(obj.constructor)
  if (typeof builtIn === 'function') {
    observable = builtIn(obj, registerObserver, queueObservers)
  } else if (!builtIn) {
    observable = new Proxy(obj, handlers)
  } else {
    observable = obj
  }
  proxies.set(obj, observable)
  proxies.set(observable, observable)
  observers.set(obj, new Map())
  return observable
}

function isObservable (obj) {
  if (typeof obj !== 'object') {
    throw new TypeError('first argument must be an object')
  }
  return (proxies.get(obj) === obj)
}

function get (target, key, receiver) {
  if (key === '$raw') return target
  const result = Reflect.get(target, key, receiver)
  if (typeof key === 'symbol' && wellKnowSymbols.has(key)) {
    return result
  }
  const isObject = (typeof result === 'object' && result)
  const observable = isObject && proxies.get(result)
  if (currentObserver) {
    registerObserver(target, key)
    if (isObject) {
      return observable || toObservable(result)
    }
  }
  return observable || result
}

function registerObserver (target, key) {
  if (currentObserver) {
    const observersForTarget = observers.get(target)
    let observersForKey = observersForTarget.get(key)
    if (!observersForKey) {
      observersForKey = new Set()
      observersForTarget.set(key, observersForKey)
    }
    if (!observersForKey.has(currentObserver)) {
      observersForKey.add(currentObserver)
      currentObserver.observedKeys.push(observersForKey)
    }
  }
}

function ownKeys (target) {
  registerObserver(target, enumerate)
  return Reflect.ownKeys(target)
}

function set (target, key, value, receiver) {
  if (key === 'length' || value !== Reflect.get(target, key, receiver)) {
    queueObservers(target, key)
    queueObservers(target, enumerate)
  }
  if (typeof value === 'object' && value) {
    value = value.$raw || value
  }
  return Reflect.set(target, key, value, receiver)
}

function deleteProperty (target, key) {
  if (Reflect.has(target, key)) {
    queueObservers(target, key)
    queueObservers(target, enumerate)
  }
  return Reflect.deleteProperty(target, key)
}

function queueObservers (target, key) {
  const observersForKey = observers.get(target).get(key)
  if (observersForKey) {
    observersForKey.forEach(queueObserver)
  }
}

function queueObserver (observer) {
  if (!queued) {
    nextTick(runObservers)
    queued = true
  }
  queuedObservers.add(observer)
}

function runObservers () {
  queuedObservers.forEach(runObserver)
  queuedObservers.clear()
  queued = false
}

function runObserver (observer) {
  if (observer.fn) {
    if (observer.once) {
      observer.fn.apply(observer.context, observer.args)
      unobserve(observer)
    } else {
      try {
        currentObserver = observer
        observer.fn.apply(observer.context, observer.args)
      } finally {
        currentObserver = undefined
      }
    }
  }
}

function unobserveKey (observersForKey) {
  observersForKey.delete(this)
}


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


const wellKnowSymbols = new Set()

for (let key of Object.getOwnPropertyNames(Symbol)) {
  const value = Symbol[key]
  if (typeof value === 'symbol') {
    wellKnowSymbols.add(value)
  }
}

module.exports = wellKnowSymbols


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers__ = __webpack_require__(2);
/* harmony export (immutable) */ exports["a"] = codeGen;


var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;
var modifierCode = {
    stop: '$event.stopPropagation();',
    prevent: '$event.preventDefault();',
    self: 'if($event.target !== $event.currentTarget)return;',
    ctrl: 'if(!$event.ctrlKey)return;',
    shift: 'if(!$event.shiftKey)return;',
    alt: 'if(!$event.altKey)return;',
    meta: 'if(!$event.metaKey)return;'
};

var keyCodes = {
    esc: 27,
    tab: 9,
    enter: 13,
    space: 32,
    up: 38,
    left: 37,
    right: 39,
    down: 40,
    'delete': [8, 46]
};

function codeGen(ast) {

    var code = ast ? genElement(ast) : '_h("div")';

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__["o" /* makeFunction */])('with(this){return ' + code + '}');
}

function genElement(el) {
    if (el.for && !el.forProcessed) {
        return genFor(el);
    } else if (el.if && !el.ifProcessed) {
        return genIf(el);
    } else {
        var code = void 0;
        var data = genData(el);
        var children = genChildren(el, true);
        code = '_h(\'' + el.tag + '\'' + (data ? ',' + data : '' // data
        ) + (children ? ',' + children : '' // children
        ) + ')';
        return code;
    }
}

function genChildren(el, checkSkip) {
    var children = el.children;
    if (children.length) {
        var _el = children[0];
        // optimize single v-for
        if (children.length === 1 && _el.for) {
            return genElement(_el);
        }
        var normalizationType = 0;
        return '[' + children.map(genNode).join(',') + ']' + (checkSkip ? normalizationType ? ',' + normalizationType : '' : '');
    }
}

function genIf(el) {
    el.ifProcessed = true; // avoid recursion
    return genIfConditions(el.ifConditions.slice());
}

function genIfConditions(conditions) {
    if (!conditions.length) {
        return '';
    }

    var condition = conditions.shift();
    if (condition.exp) {
        return '(' + condition.exp + ')?' + genTernaryExp(condition.block) + ':' + genIfConditions(conditions);
    } else {
        return '' + genTernaryExp(condition.block);
    }

    // v-if with v-once should generate code like (a)?_m(0):_m(1)
    function genTernaryExp(el) {
        return genElement(el);
    }
}

function genFor(el) {
    var exp = el.for;
    var alias = el.alias;
    var iterator1 = el.iterator1 ? ',' + el.iterator1 : '';
    var iterator2 = el.iterator2 ? ',' + el.iterator2 : '';
    el.forProcessed = true; // avoid recursion

    return '_l((' + exp + '),' + ('function(' + alias + iterator1 + iterator2 + '){') + ('return ' + genElement(el)) + '})';
}

function genNode(node) {
    if (node.type === 1) {
        return genElement(node);
    } else {
        return genText(node);
    }
}

function genText(text) {
    return text.type === 2 ? text.expression : JSON.stringify(text.text);
}

function genData(el) {
    var data = '{';

    // attributes
    if (el.attrs) {
        data += 'attrs:{' + genProps(el.attrs) + '},';
    }
    // DOM props
    if (el.props) {
        data += 'props:{' + genProps(el.props) + '},';
    }
    // event handlers
    if (el.events) {
        data += genHandlers(el.events) + ',';
    }
    if (el.nativeEvents) {
        data += genHandlers(el.nativeEvents, true) + ',';
    }

    data = data.replace(/,$/, '') + '}';

    return data;
}

function genProps(props) {
    var res = '';
    for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        res += '"' + prop.name + '":' + prop.value + ',';
    }
    return res.slice(0, -1);
}

function genHandlers(events, native) {
    var res = native ? 'nativeOn:{' : 'on:{';
    for (var name in events) {
        res += '"' + name + '":' + genHandler(name, events[name]) + ',';
    }
    return res.slice(0, -1) + '}';
}

function genHandler(name, handler) {
    if (!handler) {
        return 'function(){}';
    } else if (Array.isArray(handler)) {
        return '[' + handler.map(function (handler) {
            return genHandler(name, handler);
        }).join(',') + ']';
    } else if (!handler.modifiers) {
        return fnExpRE.test(handler.value) || simplePathRE.test(handler.value) ? handler.value : 'function($event){' + handler.value + '}';
    } else {
        var code = '';
        var keys = [];
        for (var key in handler.modifiers) {
            if (modifierCode[key]) {
                code += modifierCode[key];
            } else {
                keys.push(key);
            }
        }
        if (keys.length) {
            code = genKeyFilter(keys) + code;
        }
        var handlerCode = simplePathRE.test(handler.value) ? handler.value + '($event)' : handler.value;
        return 'function($event){' + code + handlerCode + '}';
    }
}

function genKeyFilter(keys) {
    return 'if(' + keys.map(genFilterCode).join('&&') + ')return;';
}

function genFilterCode(key) {
    var keyVal = parseInt(key, 10);
    if (keyVal) {
        return '$event.keyCode!==' + keyVal;
    }
    var alias = keyCodes[key];
    return '_k($event.keyCode,' + JSON.stringify(key) + (alias ? ',' + JSON.stringify(alias) : '') + ')';
}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = HTMLParser;
/*
 * Modified at https://github.com/blowsie/Pure-JavaScript-HTML5-Parser
 */

// Regular Expressions for parsing tags and attributes
var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:@][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
    endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
    attr = /([a-zA-Z_:@][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

// Empty Elements - HTML 5
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");

// Block Elements - HTML 5
var block = makeMap("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");

// Inline Elements - HTML 5
var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

// Special Elements (can contain anything)
var special = makeMap("script,style");

function makeMap(str) {
    var obj = {},
        items = str.split(",");
    for (var i = 0; i < items.length; i++) {
        obj[items[i]] = true;
    }return obj;
}

function HTMLParser(html, handler) {
    var index,
        chars,
        match,
        stack = [],
        last = html;
    stack.last = function () {
        return this[this.length - 1];
    };

    while (html) {
        chars = true;

        // Make sure we're not in a script or style element
        if (!stack.last() || !special[stack.last()]) {

            // Comment
            if (html.indexOf("<!--") == 0) {
                index = html.indexOf("-->");

                if (index >= 0) {
                    if (handler.comment) handler.comment(html.substring(4, index));
                    html = html.substring(index + 3);
                    chars = false;
                }

                // end tag
            } else if (html.indexOf("</") == 0) {
                match = html.match(endTag);

                if (match) {
                    html = html.substring(match[0].length);
                    match[0].replace(endTag, parseEndTag);
                    chars = false;
                }

                // start tag
            } else if (html.indexOf("<") == 0) {
                match = html.match(startTag);

                if (match) {
                    html = html.substring(match[0].length);
                    match[0].replace(startTag, parseStartTag);
                    chars = false;
                }
            }

            if (chars) {
                index = html.indexOf("<");

                var text = index < 0 ? html : html.substring(0, index);
                html = index < 0 ? "" : html.substring(index);

                if (handler.chars) handler.chars(text);
            }
        } else {
            html = html.replace(new RegExp("([\\s\\S]*?)<\/" + stack.last() + "[^>]*>"), function (all, text) {
                text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
                if (handler.chars) handler.chars(text);

                return "";
            });

            parseEndTag("", stack.last());
        }

        if (html == last) throw "Parse Error: " + html;
        last = html;
    }

    // Clean up any remaining tags
    parseEndTag();

    function parseStartTag(tag, tagName, rest, unary) {
        tagName = tagName.toLowerCase();

        if (block[tagName]) {
            while (stack.last() && inline[stack.last()]) {
                parseEndTag("", stack.last());
            }
        }

        if (closeSelf[tagName] && stack.last() == tagName) {
            parseEndTag("", tagName);
        }

        unary = empty[tagName] || !!unary;

        if (!unary) stack.push(tagName);

        if (handler.start) {
            var attrs = [];

            rest.replace(attr, function (match, name) {
                var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : "";

                attrs.push({
                    name: name,
                    value: value,
                    escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
                });
            });

            if (handler.start) handler.start(tagName, attrs, unary);
        }
    }

    function parseEndTag(tag, tagName) {
        // If no tag name is provided, clean shop
        if (!tagName) var pos = 0;

        // Find the closest opened tag of the same type
        else for (var pos = stack.length - 1; pos >= 0; pos--) {
                if (stack[pos] == tagName) break;
            }if (pos >= 0) {
            // Close all the open elements, up the stack
            for (var i = stack.length - 1; i >= pos; i--) {
                if (handler.end) handler.end(stack[i]);
            } // Remove the open elements from the stack
            stack.length = pos;
        }
    }
};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony export (immutable) */ exports["a"] = TextParser;


var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]/\\]/g;

var buildRegex = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["k" /* cached */])(function (delimiters) {
    var open = delimiters[0].replace(regexEscapeRE, '\\$&');
    var close = delimiters[1].replace(regexEscapeRE, '\\$&');
    return new RegExp(open + '((?:.|\\n)+?)' + close, 'g');
});

function TextParser(text, delimiters) {
    var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
    if (!tagRE.test(text)) {
        return;
    }
    var tokens = [];
    var lastIndex = tagRE.lastIndex = 0;
    var match = void 0,
        index = void 0;
    while (match = tagRE.exec(text)) {
        index = match.index;
        // push text token
        if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)));
        }
        // tag token
        var exp = match[1].trim();
        tokens.push('_s(' + exp + ')');
        lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)));
    }
    return tokens.join('+');
}

/***/ },
/* 24 */
/***/ function(module, exports) {

function createElement(tagName){
  return document.createElement(tagName);
}

function createElementNS(namespaceURI, qualifiedName){
  return document.createElementNS(namespaceURI, qualifiedName);
}

function createTextNode(text){
  return document.createTextNode(text);
}


function insertBefore(parentNode, newNode, referenceNode){
  parentNode.insertBefore(newNode, referenceNode);
}


function removeChild(node, child){
  node.removeChild(child);
}

function appendChild(node, child){
  node.appendChild(child);
}

function parentNode(node){
  return node.parentElement;
}

function nextSibling(node){
  return node.nextSibling;
}

function tagName(node){
  return node.tagName;
}

function setTextContent(node, text){
  node.textContent = text;
}

module.exports = {
  createElement: createElement,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  appendChild: appendChild,
  removeChild: removeChild,
  insertBefore: insertBefore,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent
};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__parser_index__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nx_js_observer_util__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nx_js_observer_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__nx_js_observer_util__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_snabbdom__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_snabbdom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_snabbdom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_snabbdom_modules_class__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_snabbdom_modules_class___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_snabbdom_modules_class__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_snabbdom_modules_props__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_snabbdom_modules_props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_snabbdom_modules_props__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_snabbdom_modules_attributes__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_snabbdom_modules_attributes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_snabbdom_modules_attributes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_snabbdom_modules_style__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_snabbdom_modules_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_snabbdom_modules_style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_snabbdom_modules_eventlisteners__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_snabbdom_modules_eventlisteners___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_snabbdom_modules_eventlisteners__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_snabbdom_h__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_snabbdom_h___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_snabbdom_h__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_snabbdom_htmldomapi__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_snabbdom_htmldomapi___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_snabbdom_htmldomapi__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_snabbdom_vnode__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_snabbdom_vnode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_snabbdom_vnode__);
/* harmony export (binding) */ __webpack_require__.d(exports, "Evo", function() { return Evo; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }














var _patch = __WEBPACK_IMPORTED_MODULE_3_snabbdom___default.a.init([__WEBPACK_IMPORTED_MODULE_4_snabbdom_modules_class___default.a, __WEBPACK_IMPORTED_MODULE_5_snabbdom_modules_props___default.a, __WEBPACK_IMPORTED_MODULE_6_snabbdom_modules_attributes___default.a, __WEBPACK_IMPORTED_MODULE_7_snabbdom_modules_style___default.a, __WEBPACK_IMPORTED_MODULE_8_snabbdom_modules_eventlisteners___default.a]);

var Evo = function () {
    function Evo(options) {
        _classCallCheck(this, Evo);

        this._patch = _patch;
        this._s = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* _toString */];

        var vm = this;

        vm.$options = options;

        callHook(vm, 'beforeCreate');

        if (options.data) {
            initData(vm, options.data);
        }

        if (options.methods) {
            initMethods(vm, options.methods);
        }

        callHook(vm, 'created');

        vm.$mount(vm.$options.el);
    }

    _createClass(Evo, [{
        key: '$mount',
        value: function $mount(el) {
            var vm = this;
            var options = vm.$options;
            vm.$el = el = el && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* query */])(el);

            if (!options.render) {
                var template = options.template;
                if (template) {
                    if (typeof template === 'string') {
                        if (template[0] === '#') {
                            template = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* idToTemplate */])(template);
                        }
                    } else if (template.nodeType) {
                        template = template.innerHTML;
                    }
                } else if (el) {
                    template = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* getOuterHTML */])(el);
                }
                if (template) {
                    var render = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__parser_index__["a" /* compileToFunctions */])(template, vm);
                    options.render = render;
                }
            }

            callHook(vm, 'beforeMount');

            __WEBPACK_IMPORTED_MODULE_2__nx_js_observer_util___default.a.observe(function () {
                vm._update(vm._render());
            });

            callHook(vm, 'mounted');

            vm._isMounted = true;

            return vm;
        }
    }, {
        key: '_render',
        value: function _render() {
            var vm = this;
            var render = vm.$options.render;
            var vnode = void 0;
            try {
                vnode = render.call(vm);
            } catch (e) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* warn */])(e);
            }

            return vnode;
        }
    }, {
        key: '_update',
        value: function _update(vnode) {
            var vm = this;
            if (vm._isMounted) {
                callHook(vm, 'beforeUpdate');
            }
            var prevVnode = vm._vnode || vm.$options._vnode;
            vm._vnode = vnode;

            if (!prevVnode) {
                vm.$el = vm._patch(vm.$el, vnode);
            } else {
                vm.$el = vm._patch(prevVnode, vnode);
            }

            if (vm._isMounted) {
                callHook(vm, 'updated');
            }
        }
    }, {
        key: '_createComponent',
        value: function _createComponent(Ctor, data, children, sel) {
            Ctor._isComponent = true;
            var Factory = this.constructor;
            data.hook = data.hook || {};
            data.hook.init = function (vnode) {
                new Factory(Ctor);
            };
            return Ctor._vnode = new __WEBPACK_IMPORTED_MODULE_11_snabbdom_vnode___default.a('vue-component-' + sel, data, children, undefined, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10_snabbdom_htmldomapi__["createElement"])(sel));
        }
    }, {
        key: '_k',
        value: function _k(eventKeyCode, key, builtInAlias) {
            var keyCodes = builtInAlias;
            if (Array.isArray(keyCodes)) {
                return keyCodes.indexOf(eventKeyCode) === -1;
            } else {
                return keyCodes !== eventKeyCode;
            }
        }
    }, {
        key: '_h',
        value: function _h(sel, data, children) {
            var vm = this;

            if (typeof sel == 'string') {
                var Ctor = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* resolveAsset */])(vm.$options, 'components', sel);
                if (Ctor) {
                    return vm._createComponent(Ctor, data, children, sel);
                }
            }

            var faltChildren = [];

            if (Array.isArray(data)) {
                children = data;
                data = null;
            }

            if (Array.isArray(children)) {
                children.forEach(function (item) {
                    if (Array.isArray(item)) {
                        faltChildren = faltChildren.concat(item);
                    } else {
                        faltChildren.push(item);
                    }
                });
            }

            return __WEBPACK_IMPORTED_MODULE_9_snabbdom_h___default()(sel, data, faltChildren.length ? faltChildren : children);
        }
    }, {
        key: '_l',
        value: function _l(val, render) {
            var ret = void 0,
                i = void 0,
                l = void 0,
                keys = void 0,
                key = void 0;
            if (Array.isArray(val) || typeof val === 'string') {
                ret = new Array(val.length);
                for (i = 0, l = val.length; i < l; i++) {
                    ret[i] = render(val[i], i);
                }
            } else if (typeof val === 'number') {
                ret = new Array(val);
                for (i = 0; i < val; i++) {
                    ret[i] = render(i + 1, i);
                }
            } else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["g" /* isObject */])(val)) {
                keys = Object.keys(val);
                ret = new Array(keys.length);
                for (i = 0, l = keys.length; i < l; i++) {
                    key = keys[i];
                    ret[i] = render(val[key], key, i);
                }
            }
            return ret;
        }
    }]);

    return Evo;
}();

function callHook(vm, hook) {
    var handlers = vm.$options[hook];
    if (handlers) {
        for (var i = 0, j = handlers.length; i < j; i++) {
            handlers[i].call(vm);
        }
    }
}

function initData(vm, data) {
    vm.$data = __WEBPACK_IMPORTED_MODULE_2__nx_js_observer_util___default.a.observable(data);

    var keys = Object.keys(data);
    var i = keys.length;
    while (i--) {
        proxy(vm, keys[i]);
    }
}

function proxy(vm, key) {
    Object.defineProperty(vm, key, {
        configurable: true,
        enumerable: true,
        get: function proxyGetter() {
            return vm.$data[key];
        },
        set: function proxySetter(val) {
            vm.$data[key] = val;
        }
    });
}

function initMethods(vm, methods) {
    for (var key in methods) {
        vm[key] = methods[key] == null ? __WEBPACK_IMPORTED_MODULE_0__util__["h" /* noop */] : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["i" /* bind */])(methods[key], vm);
    }
}

/***/ }
/******/ ])));