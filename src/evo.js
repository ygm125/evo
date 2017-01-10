import { bind, noop, warn, query, getOuterHTML, idToTemplate, _toString, isObject } from './util'
import { observe, Watcher } from './observer'
import { compileToFunctions } from './parser/index'

import snabbdom from 'snabbdom'
import _class from 'snabbdom/modules/class'
import _props from 'snabbdom/modules/props'
import _attributes from 'snabbdom/modules/attributes'
import _style from 'snabbdom/modules/style'
import _eventlisteners from 'snabbdom/modules/eventlisteners'
import _h from 'snabbdom/h'

const _patch = snabbdom.init([
    _class,
    _props,
    _attributes,
    _style,
    _eventlisteners
])

export class Evo {
    constructor(options) {
        let vm = this

        vm.$options = options
        vm._watchers = []

        callHook(vm, 'beforeCreate')

        if (options.data) {
            initData(vm)
        }

        if (options.methods) {
            initMethods(vm, options.methods)
        }

        callHook(vm, 'created')

        vm.$mount(vm.$options.el)
    }

    $mount(el) {
        let vm = this
        let options = vm.$options
        vm.$el = el = el && query(el)
        if (!options.render) {
            let template = options.template
            if (template) {
                if (typeof template === 'string') {
                    if (template[0] === '#') {
                        template = idToTemplate(template)
                    }
                } else if (template.nodeType) {
                    template = template.innerHTML;
                }
            } else if (el) {
                template = getOuterHTML(el)
            }
            if (template) {
                const render = compileToFunctions(template, vm)
                options.render = render
            }
        }

        callHook(vm, 'beforeMount')

        // vm._watcher = new Watcher(vm, () => {
        vm._update(vm._render())
        // })

        callHook(vm, 'mounted')

        return vm
    }

    _render() {
        let vm = this
        let render = vm.$options.render
        let vnode
        try {
            vnode = render.call(vm)
        } catch (e) {
            warn(e)
        }

        return vnode
    }

    _update(vnode) {
        let vm = this
        if (vm._isMounted) {
            callHook(vm, 'beforeUpdate')
        }
        const prevVnode = vm._vnode
        vm._vnode = vnode

        if (!prevVnode) {
            vm.$el = vm._patch(vm.$el, vnode)
        } else {
            vm.$el = vm._patch(prevVnode, vnode)
        }

        if (vm._isMounted) {
            callHook(vm, 'updated')
        }
    }

    _patch = _patch
    _s = _toString

    _e() { return '' }

    _h(sel, data, children) {
        let faltChildren = []

        if (Array.isArray(data)) {
            children = data
            data = null
        }

        if (Array.isArray(children)) {
            children.forEach((item) => {
                if (Array.isArray(item)) {
                    faltChildren = faltChildren.concat(item)
                } else {
                    faltChildren.push(item)
                }
            })
        }

        return _h(sel, data, faltChildren.length ? faltChildren : children)
    }

    _l(val, render) {
        let ret, i, l, keys, key
        if (Array.isArray(val) || typeof val === 'string') {
            ret = new Array(val.length)
            for (i = 0, l = val.length; i < l; i++) {
                ret[i] = render(val[i], i)
            }
        } else if (typeof val === 'number') {
            ret = new Array(val)
            for (i = 0; i < val; i++) {
                ret[i] = render(i + 1, i)
            }
        } else if (isObject(val)) {
            keys = Object.keys(val)
            ret = new Array(keys.length)
            for (i = 0, l = keys.length; i < l; i++) {
                key = keys[i]
                ret[i] = render(val[key], key, i)
            }
        }
        return ret
    }
}

function initMethods(vm, methods) {
    for (const key in methods) {
        vm[key] = methods[key] == null ? noop : bind(methods[key], vm)
    }
}

function initData(vm) {
    let data = vm._data = vm.$options.data
    const keys = Object.keys(data)
    let i = keys.length
    while (i--) {
        proxy(vm, keys[i])
    }
    observe(data)
}

function proxy(vm, key) {
    Object.defineProperty(vm, key, {
        configurable: true,
        enumerable: true,
        get: function proxyGetter() {
            return vm._data[key]
        },
        set: function proxySetter(val) {
            vm._data[key] = val
        }
    })
}

function callHook(vm, hook) {
    const handlers = vm.$options[hook]
    if (handlers) {
        for (let i = 0, j = handlers.length; i < j; i++) {
            handlers[i].call(vm)
        }
    }
}