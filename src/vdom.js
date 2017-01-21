import snabbdom from 'snabbdom'

import klass from 'snabbdom/modules/class'
import props from 'snabbdom/modules/props'
import attrs from 'snabbdom/modules/attributes'
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'

export { createElement } from 'snabbdom/htmldomapi'
export h from 'snabbdom/h'
export VNode from 'snabbdom/vnode'

export const patch = snabbdom.init([klass, props, attrs, style, eventlisteners])