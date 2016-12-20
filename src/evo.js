import { bind, noop, query, getOuterHTML } from './util'
import { observe, Watcher } from './observer'

function Evo(options) {
    this._init(options)
}

Evo.prototype._init = (options) => {
    let vm = this
    vm.$options = options

    callHook(vm, 'beforeCreate')

    if (options.methods) {
        initMethods(vm, options.methods)
    }

    if (options.data) {
        initData(vm)
    }

    callHook(vm, 'created')

    initRender(vm)
}

Vue.prototype.$mount = (el) => {
    let vm = this
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

    callHook(vm, 'beforeMount')

    vm._watcher = new Watcher(vm, () => {
        vm._update(vm._render())
    })

    callHook(vm, 'mounted')

    return vm
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

export default Evo