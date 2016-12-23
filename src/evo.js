import { bind, noop, warn, query, getOuterHTML } from './util'
import { observe, Watcher } from './observer'
import { compileToFunctions } from './parser/index'

import snabbdom from 'snabbdom'
import _class from 'snabbdom/modules/class'
import _props from 'snabbdom/modules/props'
import _style from 'snabbdom/modules/style'
import _eventlisteners from 'snabbdom/modules/eventlisteners'
import _h from 'snabbdom/h'

const _patch = snabbdom.init([
    _class,
    _props,
    _style,
    _eventlisteners
])

export default class Evo {
    _h = _h
    _patch = _patch
    
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

        initRender(vm)
    }

    $mount(el) {
        let vm = this
        let options = vm.$options
        el = el && query(el)
        if (!options.render) {
            let template = options.template
            if (template) {
            } else if (el) {
                template = getOuterHTML(el)
            }
            if (template) {
                const { render } = compileToFunctions(template, vm)
                options.render = render
            }
        }


        return

        callHook(vm, 'beforeMount')

        vm._watcher = new Watcher(vm, () => {
            vm._update(vm._render())
        })

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
            vm.$el = vm.__patch__(vm.$el, vnode)
        } else {
            vm.$el = vm.__patch__(prevVnode, vnode)
        }

        if (vm._isMounted) {
            callHook(vm, 'updated')
        }
    }
}

function initMethods(vm, methods) {
    for (const key in methods) {
        vm[key] = methods[key] == null ? noop : bind(methods[key], vm)
    }
}

function initRender(vm) {
    vm.$mount(vm.$options.el)
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