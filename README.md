# Vue 2 和 Vue 3 通过 provide 和 inject 实现状态管理功能

/*
// 使用案例
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

susProvide({
  global: true, // true 则将 homeState 注入到 susProvide 对象下
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
*/

/**
 * 通过Vue3.0框架的provide和inject实现状态管理
 *
 * @param options[object]
 *    global[boolean] 模块是否注入 susProvide 对象下，默认 false 不注入
 *    local[array]    需要缓存在 localStorage 中的状态
 *    session[array]  需要缓存在 sessionStorage 中的状态
 *    data[object]    状态
 * @return 返回 provide 部分混入代码
 * */
