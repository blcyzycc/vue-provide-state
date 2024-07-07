import Vue from 'vue'
import dialog from './HsDialog.vue'

// 组件实例化，并创建虚拟DOM
const _dialog = Vue.extend(dialog)
const dialogInstance = new _dialog()
dialogInstance.$mount()
document.body.appendChild(dialogInstance.$el)

let $dialog = function (options) {
  if (typeof options === 'string') options = { message: options }
  dialogInstance.init(options, {})

  return new Promise(function (resolve, reject) {
    dialogInstance.resolve = resolve
    dialogInstance.reject = reject
  })
}

$dialog.alert = function (options) {
  if (typeof options === 'string') options = { message: options }
  dialogInstance.init(options, {
    showCloseIcon: false,
    showCancelButton: false,
  })

  return new Promise(function (resolve, reject) {
    dialogInstance.resolve = resolve
    dialogInstance.reject = reject
  })
}

// 注入方法
Vue.prototype.$dialog = $dialog

export default $dialog
