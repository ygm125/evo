import * as snabbdom from 'snabbdom'

import klass from 'snabbdom/modules/class'
import props from 'snabbdom/modules/props'
import attrs from 'snabbdom/modules/attributes'
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'

export const patch = snabbdom.init([klass, props, attrs, style, eventlisteners])

import HTMLDOMAPI from 'snabbdom/htmldomapi'
console.log('HTMLDOMAPI',HTMLDOMAPI)
export const createElement = HTMLDOMAPI.createElement

export { h } from 'snabbdom'
export { vnode as VNode } from 'snabbdom/vnode'