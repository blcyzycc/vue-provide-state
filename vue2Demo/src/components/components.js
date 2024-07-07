import './HsToast/HsToast.js'
import './HsDialog/HsDialog.js'


import HsDialog from './HsDialog/HsDialog.vue'


const components = [
  HsDialog,
]

export default {
  install: function (Vue) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}