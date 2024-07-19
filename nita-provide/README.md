### Use Vue 2's Provide and Inject for state management.
### 使用 Vue 2 的 Provide 和 Inject 进行状态管理，解决了状态的初始化、持久化、外部js引用问题。
### 此版本需要通过 mixin 混入，如需 vue3 版本请安装 susi-provide 包。
### 请使用 Vue 2.2.0+ 版本，之前的版本没有 Provide 和 Inject API。

[项目demo及源码](https://github.com/blcyzycc/vue-provide-state)


### 参数
```
/**
 * @param options[object]
 *    global[boolean] 模块是否注入 nitaProvide 对象下，默认 false 不注入
 *    local[array]    需要缓存在 localStorage 中的状态
 *    session[array]  需要缓存在 sessionStorage 中的状态
 *    data[object]    状态属性，即使用 provide 需要声明的状态
 * */
```

## 全局状态可以在 main.js 和 App.vue 使用 provide 即可，见下面案例。

## 使用案例，Vue组件内定义状态，如果是 App.vue，那么所有组件都能 inject 状态

```
<script>
import nitaProvide from 'nata-provide'

const state = {
  global: true, // true 则将 homeState 注入到 nitaProvide 对象下
  local: [
    'homeState.number',
  ],
  session: [
    'homeState.show',
    'homeState.count',
  ],
  data: {
    homeState: {
      show: false,
      number: 1,
      count: {
        number: 10,
      },
      addNumber() {
        // 注意，这里的this不是指向vue实例，指向的是 state.data.homeState
        // 因为没有脱离引用关系，所以直接赋值也是双向绑定的
        // 如果需要实例的this，可以在调用方法时传参
        this.number++
      }
    }
  }
}

// vue instance
export default {
  name: 'HomeView',
  mixins: [nitaProvide(state)],
  mounted() {
    console.log(nitaProvide.homeState);
  },
  ...
}
</script>
```

## 使用案例，定义全局状态，在 main.js 中 Vue 实例化阶段注入

```
const state = {
  global: true, // true 则将 appState 注入到 nitaProvide 对象下
  local: [],
  session: [],
  data: {
    appState: {
      ...
    }
  }
}

new Vue({
  router,
  render: h => h(App),
  mixins: [nitaProvide(state)],
}).$mount('#app')

```

## 其它 js 文件中使用全局状态，需要将 global 设为true

```
import nitaProvide from 'nita-provide'

console.log(nitaProvide.appState)

```

## 注意，当缓存的是json时，如果json的属性发生变化，那么初始化时会进行合并。<br>
如下面示例中 appState.userInfo，如果之前缓存了 name age sex 三个属性。<br>
而后更新，新增了 tel 字段，删除了 sex 字段。<br>
则进入初始化之后，appState.userInfo 会同时包含 name age sex tel 字段。<br>
这样设计的原因是，一些数据如 appState.userInfo 的开始值可能为空 {}，如果以开始值的属性从缓存取值会失败。<br>
而一般来说，多一些用不到的属性也并不会出什么问题。<br>

```
const state = {
  global: true,
  local: [
    'appState.userInfo'
  ],
  session: [],
  data: {
    appState: {
      userInfo: {
        name: '张三',
        age: 18,
        sex: 1,
      }
    }
  }
}

new Vue({
  router,
  render: h => h(App),
  mixins: [nitaProvide(state)],
}).$mount('#app')

```
