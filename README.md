# Evo

一个小型的、类 Vue 的 MVVM 框架，由于响应数据采用 Proxy，兼容性如下

![](https://gmiam.com/static/upload/201701/gIPAUQXBqyRRk8UgLxuWgKSi.png)

## API

数据

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
```

*说明：*

```js
// data 所有属性可通过 app.$data 访问，也可通过 app 实例本身直接访问
// 动态设置新属性需通过 $data 设置
// 更多支持说明看这里 https://github.com/nx-js/observer-util

app.$data.first // x
app.$data.first = 'y'

app.$data.first // y
app.first // y

app.$data.expando = 'xy'
app.expando // xy
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

```js
- beforeCreate  // data、methods 等未挂载
- created       // data、methods 等已挂载
- beforeMount   // 字符或 html 模板解析完成
- mounted       // 界面初始渲染时调用，此时 dom 未生成
- beforeUpdate  // 界面更新前
- updated       // 界面更新后
- destroy       // 实例销毁时
```
*用法：*

```js
new Evo({
  created(){
     // this.xxx
  }
})
```

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
