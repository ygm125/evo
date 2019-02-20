可能存在的问题:
1. initMethods 分 call 和 apply 没看懂
2. initMethods 时未对 key 进行校验,可能出现 method 覆盖 data 的现象
3. this_isMounted 始终未赋值 //FIXME:在Vue 源码中此处对应的是 vm.$vnode == null 的判断,然而 Vue 和 Evo 毕竟有些不同,Vue 对 vm.$vnode 和 vm._vnode 做了不同的处理,而 Evo 中仅有 this._vnode 这一个. 所以在此设置条件为真来让 mounted 钩子成功触发

## 问题

Evo 对于数据刷新的处理是:
一旦vm.$data 这个 Proxy 检测到数据变化就调用 vm._update(vm._render()),之后比较新旧 vnode 是否相同来决定是否更新 DOM,也就是说,没有收集数据依赖, 把全村希望寄托在 vnode 比较算法上.
>坏处举例:初始化时生成了一个超大的 vnode1,后来赋值 vm.$data.xx = 2, 又生成了一个超大的 vnode2,此时比较 vnode1 和 vnode2的不同

那么问题来了, Vue 中是否也是如此处理?如何设计代码验证?
