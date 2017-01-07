export function bind(fn, ctx) {
    function boundFn(a) {
        const l = arguments.length
        return l
            ? l > 1
                ? fn.apply(ctx, arguments)
                : fn.call(ctx, a)
            : fn.call(ctx)
    }
    // record original fn length
    boundFn._length = fn.length
    return boundFn
}

export function noop() { }

export function warn(msg) {
    console.error(`[Evo warn]: ${msg} `)
}

export function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}

export function query(el) {
    if (typeof el === 'string') {
        const selector = el
        el = document.querySelector(el)
        if (!el) {
            return document.createElement('div')
        }
    }
    return el
}

export function getOuterHTML(el) {
    if (el.outerHTML) {
        return el.outerHTML
    } else {
        const container = document.createElement('div')
        container.appendChild(el.cloneNode(true))
        return container.innerHTML
    }
}


export function cached(fn) {
    const cache = Object.create(null)
    return function cachedFn(str) {
        const hit = cache[str]
        return hit || (cache[str] = fn(str))
    }
}

const camelizeRE = /-(\w)/g
export const camelize = cached((str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})

export const idToTemplate = cached((id) => {
    var el = query(id)
    return el && el.innerHTML
})

export function _toString(val) {
    return val == null
        ? ''
        : typeof val === 'object'
            ? JSON.stringify(val, null, 2)
            : String(val)
}