import { makeFunction } from './helpers'

export default function codeGen(ast) {

    const code = ast ? genElement(ast) : '_c("div")'

    return makeFunction(`with(this){return ${code}}`)
}

function genElement(el) {
    if (el.for) {
        return genFor(el)
    } else if (el.if) {
        return genIf(el)
    } else {
        let code
        const data = genData(el)
        const children = genChildren(el, true)
        code = `_c('${el.tag}'${
            data ? `,${data}` : '' // data
            }${
            children ? `,${children}` : '' // children
        }`
        return code
    }
}