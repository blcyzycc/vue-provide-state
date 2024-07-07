import nita from 'nita-provide'

// 全局状态
export const appState = {
  global: true,
  local: [],
  session: [
    'appState.token',
    'appState.number',
  ],
  data: {
    appState: {
      // 用于测试注入状态
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
        nita.appState.keepAliveInclude = nita.appState.keepAliveInclude.filter(m => m != name)
        setTimeout(() => {
          nita.appState.keepAliveInclude.push(name)
        }, 500)
      },

      token: '',
      // 更新用户信息
      updateUserInfo(This) {
        // 注意，这里的this不指向vue实例，指向的是 data.appState，实例的This需要通过参数传递
        // 此处对接api更新用户信息
        console.log('this', this, This);
      },
    }
  }
}

export const userInfo = {
  global: true,
  local: [],
  session: [
    'userInfo',
  ],
  data: {
    userInfo: {
      token: '',
      data: {
        id: '',
        name: '',
      },
      updateUserInfo() {

      },
    }
  }
}
