# Evo

一个小型的、类 Vue 的 MVVM 框架，由于响应数据采用 Proxy，兼容性如下

![](https://gmiam.com/static/upload/201701/gIPAUQXBqyRRk8UgLxuWgKSi.png)

## [在线 demo](https://jsfiddle.net/lxx2013/bo840n13/)

## 项目运行的方法
```bash
git clone https://github.com/ygm125/evo.git
cd evo
npm install   #或 yarn
npm run dev   #此时启动 rollup 来将代码打包至 dist/evo.js
simple-server #使用任意一个静态文件服务器工具(例如 simple-server/little-server/live-server), 
              #然后访问`localhost:3000/example/index.html`即可
```
成功运行后, 可以在检查器中鼠标点击断点来调试代码执行过程, 也可以在`src/evo.js`中添加`debugger`,
我们要感谢`rollup`这个工具, 你在`src/evo.js`中做的改动可以立即反应到`dist/evo.js`中
>rollup 打包出的代码具有较高的易读性
## API

### 数据

```js
var app = new Evo({
  data: {
      first : 'x',
      last : 'x',
      get full(){
          return this.first + this.last
      },
      set full(){
          this.first = 'xx'
          this.last = 'xx'
      }
  }
})

/* 说明
 * data 所有属性可通过 app.$data 访问，也可通过 app 实例本身直接访问
 * 动态设置新属性需通过 $data 设置
 * 更多支持说明看这里 https://github.com/nx-js/observer-util
*/

app.$data.first // x
app.$data.first = 'y'

app.$data.first // y
app.first // y

app.$data.expando = 'xy'
```

### 插值

```js

{{ data }}

/* 
 * 示例
*/

<div id="app">{{message}}</div>

new Evo({
  el : '#app',
  data: {
    message : 'hello'
  }
})
```

### 指令

- `v-if`、`v-else-if`、`v-else`
- `v-for`
- `v-on` | `@`
    修饰符
    - `.stop`
    - `.prevent` 
    - `.capture` 
    - `.self` 
    - `.{keyCode | keyAlias}`  // keyAlias 可选值 `esc、tab、enter、space、up、left、right、down、delete`
- `v-bind` | `:`

### 示例代码
```html
<div id="app">
    <a href="" v-for="item in list" @click.prevent="popMsg(item.text)">{{item.text}}</a>
</div>
<script>
var app = new Evo({
  el : '#app',
  data: {
     list: [
         { text: "Im one" }, 
         { text: "Im two" }
     ]
  },
  methods: {
      popMsg(text){
          alert(text)
      }
  }
})
</script>
```

## 生命周期

```js

- beforeCreate  // data、methods 等未挂载
- created       // data、methods 等已挂载
- beforeMount   // 字符或 html 模板解析完成
- mounted       // 界面初始渲染时调用，此时 dom 未生成
- beforeUpdate  // 界面更新前
- updated       // 界面更新后
- destroy       // 实例销毁时

```
## 对 component 的支持
修改了 snabbdom 的 createElm 函数处理组件时的返回值来达到对组件的支持,测试用例可以参考 `example/index.html`


## 未实现的功能
未实现数据双向绑定

## 存在的问题
1. 子组件识别` attr `后直接去父亲的` $data `取值,根本不考虑`:message="message"`还是`message="Else message"`
1. Evo 对于数据刷新的处理是:
一旦vm.$data 这个 Proxy 检测到数据变化就调用 vm._update(vm._render()),之后比较新旧 vnode 是否相同来决定是否更新 DOM,也就是说,没有收集数据依赖, 把全村希望寄托在 vnode 比较算法上.
>坏处举例:初始化时生成了一个超大的 vnode1,后来赋值 vm.$data.xx = 2, 又生成了一个超大的 vnode2,此时比较 vnode1 和 vnode2的不同

后期可以仿照 Vue 加入数据依赖的检测

## Other
待完善~
