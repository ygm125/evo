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

export function isFunction(obj) {
    return typeof obj === 'function'
}

const _toString = Object.prototype.toString
export function isPlainObject(obj) {
    return _toString.call(obj) === '[object Object]'
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
/**
 * @breif 短横线转驼峰
 * @description 输入一个字符串,将所有紧跟着'-'的第一个字符转为大写.附带了cached 来存储
 * @param {string} str - 输入短横线分割的字符串, 例如 my-com-name
 * @returns 返回myComName
 */
export const camelize = cached((str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})
 
/**
 * 将输入的字符串首字母大写后返回
 * 例如输入 myComonent,返回 MyComponent
 */
export const capitalize = cached((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
})

export const idToTemplate = cached((id) => {
    var el = query(id)
    return el && el.innerHTML
})

export function toString(val) {
    return val == null
        ? ''
        : typeof val === 'object'
            ? JSON.stringify(val, null, 2)
            : String(val)
}

const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key)
}

/**
 * 根据输入的 id 来在 $options 中查找组件,依次查找原名,普通驼峰命名,首字母大写驼峰命名
 * @description 例如输入my-com,则依次查找['my-com','myCom','MyCom']
 */
export function resolveAsset(options, type, id) {
    /* istanbul ignore if */
    if (typeof id !== 'string') {
        return
    }
    let assets = options[type]
    if (!assets) {
        return
    }
    // check local registration variations first
    if (hasOwn(assets, id)) { return assets[id] }
    var camelizedId = camelize(id)
    if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
    var PascalCaseId = capitalize(camelizedId)
    if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
}