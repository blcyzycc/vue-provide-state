### Implementing state management using Vue 3's provide and inject features.
### 使用 Vue 3 的 provide 和 inject 实现状态管理，解决了状态的初始化、持久化、外部js引用问题。
### 此版本需要使用 setup 语法糖，如需 vue2 版本请安装 nita-provite 包。

### 参数
```
/**
 * @param options[object]
 *    global[boolean] 模块是否注入 susiProvide 对象下，默认 false 不注入
 *    local[array]    需要缓存在 localStorage 中的状态
 *    session[array]  需要缓存在 sessionStorage 中的状态
 *    data[object]    状态属性，即使用 provide 需要声明的状态
 * */
```

# 使用案例

```
const homeState = reactive({
  show: false,
  number: 1,
  count: {
    number: 10,
  },
  addNumber() {
    homeState.count.number++
  }
})

susiProvide({
  global: true, // true 则将 homeState 注入到 susiProvide 对象下
  data: {
    homeState
  },
  local: [
    'homeState.number',
  ],
  session: [
    'homeState.show',
    'homeState.count.number',
  ]
})

provide('homeState', homeState)

console.log(susiProvide.homeState);

```