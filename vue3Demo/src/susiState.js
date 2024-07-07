import { reactive } from 'vue'
import susi from 'susi-provide'

// 全局状态

export const appState = reactive({
  // 用于测试注入 susiProvide 状态
  number: 1,
  /**
   * 需要缓存的页面的name
   * */
  keepAliveInclude: [
    'HomeView',
    'AboutView',
  ],
  /**
   * 根据组件的 name 去掉指定页面的缓存
   * @param name[string] 缓存组件的name
   * */
  keepAliveClear(name) {
    appState.keepAliveInclude = appState.keepAliveInclude.filter(m => m != name)
    setTimeout(() => {
      appState.keepAliveInclude.push(name)
    }, 500)
  },
})

export const userInfo = reactive({
  token: '',
  data: {
    id: '',
    name: '',
  },
  updateUserInfo() {

  },
})

susi({
  global: true,
  data: {
    appState,
    userInfo,
  },
  local: [
    'appState.number',
    'userInfo',
  ],
  session: [],
})
