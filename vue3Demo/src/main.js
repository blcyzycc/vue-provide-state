import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { appState, userInfo } from './susiState'

let app = createApp(App)
app.provide('appState', appState)
app.provide('userInfo', userInfo)
app.use(router).mount('#app')
