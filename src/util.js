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