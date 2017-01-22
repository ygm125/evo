# Evo

一个小型的、类 Vue 的 MVVM 框架

底层依赖 snabbdom 这个模块化的虚拟 DOM，响应数据采用 Proxy 做代理处理

## API

数据

```js
new Evo({
  data: {
      first : 'x',
      last : 'x'
      get full(){
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
