import { makeFunction } from './helpers'

export default function codeGen(ast) {

    

    return makeFunction(`with(this){return ${code}}`)
}
