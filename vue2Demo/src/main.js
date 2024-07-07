import Vue from 'vue'
import App from './App.vue'
import router from './router'
import nita from 'nita-provide'
import { appState, userInfo } from './nitaState'

Vue.config.productionTip = false

export default new Vue({
  router,
  render: h => h(App),
  mixins: [nita(appState), nita(userInfo)],
}).$mount('#app')
