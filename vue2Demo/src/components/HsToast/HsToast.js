import Vue from 'vue'
import toast from './HsToast.vue'

// 组件实例化，并创建虚拟DOM
const _toast = Vue.extend(toast)
const toastInstance = new _toast()
toastInstance.$mount()
document.body.appendChild(toastInstance.$el)

const $toast = function (options) {
  toastInstance.init(options)
  return toastInstance
}
$toast.success = function (options) {
  toastInstance.init(options, { type: 'success' })
  return toastInstance
}
$toast.warning = function (options) {
  toastInstance.init(options, { type: 'warning' })
  return toastInstance
}
$toast.error = function (options) {
  toastInstance.init(options, { type: 'error' })
  return toastInstance
}
$toast.loading = function (options) {
  toastInstance.init(options, { type: 'loading', message: '加载中...', duration: 0 })
  return toastInstance
}

// 注入方法
Vue.prototype.$toast = $toast

export default $toast
