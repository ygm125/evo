# Evo

一个精简的、参考 Vue 的 MVVM 框架

## 依赖

- snabbdom 模块化的虚拟 DOM
- observer-util 采用 Proxy 代理响应数据变动

## API

数据

```js
new Evo({
  el : '#app',
  data: {
      first : 'x',
      last : 'x'
      get full(){ // setter getter 省去计算属性
          return this.first + this.last
      }
  }
})
```

插值

- {{ data }}

指令

- v-if、v-else-if、v-else
- v-for
- v-on | @
    修饰符
    - .stop
    - .prevent 
    - .capture 
    - .self 
    - .{keyCode | keyAlias} 
- v-bind | :

生命周期

- beforeCreate
- created
- beforeMount
- beforeUpdate
- updated
- mounted
- destroy

## Demo

```html
<div id="app">
    <div :message="message">{{ message }}</div>

    <a v-for="(item,index) in list" @click="popMsg(item.text)">{{index}}、{{item.text}}</a>

    <my-component :message="message"></my-component>

    <div v-if="first">first</div>
    <div v-else>not</div>
</div>
<script src="../dist/evo.js"></script>
<script>

    var Child = {
        data: {
            text: 'component'
        },
        template: '<div>A custom {{text}} {{message}}!</div>'
    }

    var app = new Evo({
        components: {
            'my-component': Child
        },
        el: "#app",
        data: {
            first: true,
            message: "Hello Evo!",
            list: [{
                text: "Im one"
            }, {
                text: "Im two"
            }]
        },
        methods: {
            popMsg(msg) {
                alert(msg)
            }
        }
    })
</script>
```

## Other

待完善~
