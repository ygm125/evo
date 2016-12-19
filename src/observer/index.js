export function observe(value) {
    if (!isObject(value)) {
        return
    }
    return new Observer(value)
}

export class Observer {
    constructor(value) {
        if (Array.isArray(value)) {
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }

    walk(obj) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i], obj[keys[i]])
        }
    }
}

export function defineReactive(obj, key, val) {
    const dep = new Dep()
    let childOb = observe(val)
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            if (Dep.target) {
                dep.depend()
            }
            return val
        },
        set: function reactiveSetter(newVal) {
            if (newVal === value || (newVal !== newVal && value !== value)) {
                return
            }
            val = newVal
            childOb = observe(newVal)
            dep.notify()
        }
    })
}