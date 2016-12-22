(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Evo = factory());
}(this, (function () { 'use strict';

function bind(fn, ctx) {
    function boundFn(a) {
        const l = arguments.length;
        return l
            ? l > 1
                ? fn.apply(ctx, arguments)
                : fn.call(ctx, a)
            : fn.call(ctx)
    }
    // record original fn length
    boundFn._length = fn.length;
    return boundFn
}

function noop() { }

function warn$1(msg) {
    console.error(`[Evo warn]: ${msg} `);
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}

function query(el) {
    if (typeof el === 'string') {
        const selector = el;
        el = document.querySelector(el);
        if (!el) {
            return document.createElement('div')
        }
    }
    return el
}

function getOuterHTML(el) {
    if (el.outerHTML) {
        return el.outerHTML
    } else {
        const container = document.createElement('div');
        container.appendChild(el.cloneNode(true));
        return container.innerHTML
    }
}


function cached(fn) {
    const cache = Object.create(null);
    return function cachedFn(str) {
        const hit = cache[str];
        return hit || (cache[str] = fn(str))
    }
}

const camelizeRE = /-(\w)/g;
const camelize = cached((str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
});

function observe(value) {
    if (!isObject(value)) {
        return
    }
    return new Observer(value)
}

class Watcher {
    constructor(vm, expOrFn) {
        this.vm = vm;
        vm._watchers.push(this);
        this.getter = expOrFn;
        this.value = this.get();
    }

    get() {
        pushTarget(this);
        const value = this.getter.call(this.vm, this.vm);
        popTarget();
        return value
    }
}

class Observer {
    constructor(value) {
        if (Array.isArray(value)) {
            this.observeArray(value);
        } else {
            this.walk(value);
        }
    }

    walk(obj) {
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i], obj[keys[i]]);
        }
    }

    observeArray(items) {
        for (let i = 0, l = items.length; i < l; i++) {
            observe(items[i]);
        }
    }
}

function defineReactive(obj, key, val) {
    const dep = new Dep();
    let childOb = observe(val);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            if (Dep.target) {
                dep.depend();
            }
            return val
        },
        set: function reactiveSetter(newVal) {
            if (newVal === value || (newVal !== newVal && value !== value)) {
                return
            }
            val = newVal;
            childOb = observe(newVal);
            dep.notify();
        }
    });
}

class Dep {
    constructor() {
        this.subs = [];
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    depend() {
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    }

    notify() {
        // stablize the subscriber list first
        const subs = this.subs.slice();
        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update();
        }
    }
}

Dep.target = null;
const targetStack = [];

function pushTarget(_target) {
    if (Dep.target) targetStack.push(Dep.target);
    Dep.target = _target;
}

function popTarget() {
    Dep.target = targetStack.pop();
}

/*
 * Modified at https://github.com/blowsie/Pure-JavaScript-HTML5-Parser
 */

// Regular Expressions for parsing tags and attributes
let startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:@][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
let endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
let attr = /([a-zA-Z_:@][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

// Empty Elements - HTML 5
let empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");

// Block Elements - HTML 5
let block = makeMap("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");

// Inline Elements - HTML 5
let inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

// Elements that you can, intentionally, leave open
// (and which close themselves)
let closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

// Attributes that have their values filled in disabled="disabled"
let fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

// Special Elements (can contain anything)
let special = makeMap("script,style");

function makeMap(str) {
    var obj = {}, items = str.split(",");
    for (var i = 0; i < items.length; i++)
        obj[items[i]] = true;
    return obj;
}

function HTMLParser(html, handler) {
    var index, chars, match, stack = [], last = html;
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
                    if (handler.comment)
                        handler.comment(html.substring(4, index));
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

                if (handler.chars)
                    handler.chars(text);
            }

        } else {
            html = html.replace(new RegExp("([\\s\\S]*?)<\/" + stack.last() + "[^>]*>"), function (all, text) {
                text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
                if (handler.chars)
                    handler.chars(text);

                return "";
            });

            parseEndTag("", stack.last());
        }

        if (html == last)
            throw "Parse Error: " + html;
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

        if (!unary)
            stack.push(tagName);

        if (handler.start) {
            var attrs = [];

            rest.replace(attr, function (match, name) {
                var value = arguments[2] ? arguments[2] :
                    arguments[3] ? arguments[3] :
                        arguments[4] ? arguments[4] :
                            fillAttrs[name] ? name : "";

                attrs.push({
                    name: name,
                    value: value,
                    escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
                });
            });

            if (handler.start)
                handler.start(tagName, attrs, unary);
        }
    }

    function parseEndTag(tag, tagName) {
        // If no tag name is provided, clean shop
        if (!tagName)
            var pos = 0;

        // Find the closest opened tag of the same type
        else
            for (var pos = stack.length - 1; pos >= 0; pos--)
                if (stack[pos] == tagName)
                    break;

        if (pos >= 0) {
            // Close all the open elements, up the stack
            for (var i = stack.length - 1; i >= pos; i--)
                if (handler.end)
                    handler.end(stack[i]);

            // Remove the open elements from the stack
            stack.length = pos;
        }
    }
}

const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
const regexEscapeRE = /[-.*+?^${}()|[\]/\\]/g;

const buildRegex = cached(delimiters => {
    const open = delimiters[0].replace(regexEscapeRE, '\\$&');
    const close = delimiters[1].replace(regexEscapeRE, '\\$&');
    return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function TextParser(text, delimiters) {
    const tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
    if (!tagRE.test(text)) {
        return
    }
    const tokens = [];
    let lastIndex = tagRE.lastIndex = 0;
    let match, index;
    while ((match = tagRE.exec(text))) {
        index = match.index;
        // push text token
        if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)));
        }
        // tag token
        const exp = match[1].trim();
        tokens.push(`_s(${exp})`);
        lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)));
    }
    return tokens.join('+')
}

function codegen(){

}

const dirRE = /^v-|^@|^:/;
const forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
const forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;
const onRE = /^@|^v-on:/;
const bindRE = /^:|^v-bind:/;
const modifierRE = /\.[^.]+/g;

function addIfCondition(el, condition) {
    if (!el.conditions) {
        el.conditions = [];
    }
    el.conditions.push(condition);
}

function parseModifiers(name) {
    const match = name.match(modifierRE);
    if (match) {
        const ret = {};
        match.forEach(m => { ret[m.slice(1)] = true; });
        return ret
    }
}

function getAndRemoveAttr(el, name) {
    let val;
    if ((val = el.attrsMap[name]) != null) {
        const list = el.attrsList;
        for (let i = 0, l = list.length; i < l; i++) {
            if (list[i].name === name) {
                list.splice(i, 1);
                break
            }
        }
    }
    return val
}

function makeAttrsMap(attrs) {
    const map = {};
    for (let i = 0, l = attrs.length; i < l; i++) {
        map[attrs[i].name] = attrs[i].value;
    }
    return map
}

function addAttr(el, name, value) {
    (el.attrs || (el.attrs = [])).push({ name, value });
}

function addProp(el, name, value) {
    (el.props || (el.props = [])).push({ name, value });
}

function addHandler(el, name, value, modifiers, important) {
    // check capture modifier
    if (modifiers && modifiers.capture) {
        delete modifiers.capture;
        name = '!' + name; // mark the event as captured
    }
    let events;
    if (modifiers && modifiers.native) {
        delete modifiers.native;
        events = el.nativeEvents || (el.nativeEvents = {});
    } else {
        events = el.on || (el.on = {});
    }
    const newHandler = { value, modifiers };
    const handlers = events[name];
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
    let i = children.length;
    while (i--) {
        if (children[i].tag) return children[i]
    }
}

function processIfConditions(el, parent) {
    const prev = findPrevElement(parent.children);
    if (prev && prev.if) {
        addIfCondition(prev, {
            exp: el.elseif,
            block: el
        });
    } else {
        warn(
            `v-${el.elseif ? ('else-if="' + el.elseif + '"') : 'else'} ` +
            `used on element <${el.tag}> without corresponding v-if.`
        );
    }
}

function compileToFunctions(template, vm) {
    let root;
    let currentParent;
    let options = vm.$options;

    HTMLParser(template, {
        start: function (tag, attrs, unary) {
            const element = {
                type: 1,
                tag,
                attrsList: attrs,
                attrsMap: makeAttrsMap(attrs),
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
                    processIfConditions(element, currentParent);
                } else if (element.slotScope) { // scoped slot

                } else {
                    currentParent.children.push(element);
                    element.parent = currentParent;
                }
            }

            if (!unary) {
                currentParent = element;
            }
        },
        end: function (tag) {

        },
        chars: function (text) {
            text = text.trim();
            if(!text) return
            
            let expression = TextParser(text, options.delimiters);
            if (expression) {
                currentParent.children.push({
                    type: 2,
                    expression,
                    text
                });
            } else {
                currentParent.children.push({
                    type: 3,
                    text
                });
            }

        },
        comment: function (text) { }
    });

    let render = codegen(root);

    return render
}

function processFor(el) {
    let exp;
    if ((exp = getAndRemoveAttr(el, 'v-for'))) {
        const inMatch = exp.match(forAliasRE);
        if (!inMatch) {
            warn$1(`Invalid v-for expression: ${exp}`);
            return
        }
        el.for = inMatch[2].trim();
        const alias = inMatch[1].trim();
        const iteratorMatch = alias.match(forIteratorRE);
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
    const exp = getAndRemoveAttr(el, 'v-if');
    if (exp) {
        el.if = exp;
        addIfCondition(el, {
            exp: exp,
            block: el
        });
    } else {
        if (getAndRemoveAttr(el, 'v-else') != null) {
            el.else = true;
        }
        const elseif = getAndRemoveAttr(el, 'v-else-if');
        if (elseif) {
            el.elseif = elseif;
        }
    }
}

function processKey(el) {
    // TODO
}

function processAttrs(el) {
    const list = el.attrsList;
    let i, l, name, rawName, value, arg, modifiers, isProp;
    for (i = 0, l = list.length; i < l; i++) {
        name = rawName = list[i].name;
        value = list[i].value;
        if (dirRE.test(name)) {
            // modifiers
            modifiers = parseModifiers(name);
            if (modifiers) {
                name = name.replace(modifierRE, '');
            }
            if (bindRE.test(name)) { // v-bind
                name = name.replace(bindRE, '');
                if (modifiers) {
                    if (modifiers.prop) {
                        isProp = true;
                        name = camelize(name);
                        if (name === 'innerHtml') name = 'innerHTML';
                    }
                    if (modifiers.camel) {
                        name = camelize(name);
                    }
                }
                if (isProp) {
                    addProp(el, name, value);
                } else {
                    addAttr(el, name, value);
                }
            } else if (onRE.test(name)) { // v-on
                name = name.replace(onRE, '');
                addHandler(el, name, value, modifiers);
            } else { // normal directives

            }
        } else {
            addAttr(el, name, JSON.stringify(value));
        }
    }
}

class Evo {
    constructor(options) {
        let vm = this;
        vm.$options = options;
        vm._watchers = [];

        callHook(vm, 'beforeCreate');

        if (options.data) {
            initData(vm);
        }

        if (options.methods) {
            initMethods(vm, options.methods);
        }

        callHook(vm, 'created');

        initRender(vm);
    }

    $mount(el) {
        let vm = this;
        let options = vm.$options;
        el = el && query(el);
        if (!options.render) {
            let template = options.template;
            if (template) {
            } else if (el) {
                template = getOuterHTML(el);
            }
            if (template) {
                const { render } = compileToFunctions(template, vm);
                options.render = render;
            }
        }


        return

        callHook(vm, 'beforeMount');

        vm._watcher = new Watcher(vm, () => {
            vm._update(vm._render());
        });

        callHook(vm, 'mounted');

        return vm
    }

    _render() {
        let vm = this;
        let render = vm.$options.render;
        let vnode;
        try {
            vnode = render.call(vm);
        } catch (e) {
            warn$1(e);
        }
        return vnode
    }

    _update(vnode) {
        let vm = this;
        if (vm._isMounted) {
            callHook(vm, 'beforeUpdate');
        }
        const prevVnode = vm._vnode;
        vm._vnode = vnode;

        if (!prevVnode) {
            vm.$el = vm.__patch__(vm.$el, vnode);
        } else {
            vm.$el = vm.__patch__(prevVnode, vnode);
        }

        if (vm._isMounted) {
            callHook(vm, 'updated');
        }
    }
}

function initMethods(vm, methods) {
    for (const key in methods) {
        vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    }
}

function initRender(vm) {
    vm.$mount(vm.$options.el);
}

function initData(vm) {
    let data = vm._data = vm.$options.data;
    const keys = Object.keys(data);
    let i = keys.length;
    while (i--) {
        proxy(vm, keys[i]);
    }
    observe(data);
}

function proxy(vm, key) {
    Object.defineProperty(vm, key, {
        configurable: true,
        enumerable: true,
        get: function proxyGetter() {
            return vm._data[key]
        },
        set: function proxySetter(val) {
            vm._data[key] = val;
        }
    });
}

function callHook(vm, hook) {
    const handlers = vm.$options[hook];
    if (handlers) {
        for (let i = 0, j = handlers.length; i < j; i++) {
            handlers[i].call(vm);
        }
    }
}

return Evo;

})));
