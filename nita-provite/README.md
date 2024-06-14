### Implementing state management using Vue 2's provide and inject features.
### 使用 Vue 2 的 provide 和 inject 实现状态管理，解决了状态的初始化、持久化、外部js引用问题。
### 此版本需要通过 mixin 混入，如需 vue3 版本请安装 susi-provite 包。

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

# 使用案例

```
import nitaProvide from 'nata-provite'

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
```
