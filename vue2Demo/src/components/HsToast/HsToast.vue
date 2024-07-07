<template>
  <div class="hs-toast" :class="hs_toast_class" v-if="show">
    <i class="hs-toast-icon" :class="hs_toast_icon_class"></i>
    <p class="hs-toast-message" v-html="message"></p>
  </div>
</template>

<script>
export default {
  name: 'hs-toast',
  data: function () {
    return {
      show: false,
      message: '',
      type: 'default',
      duration: 0,

      timer: null,
      className: '',
    }
  },
  computed: {
    hs_toast_class: function () {
      return 'hs-hs-toast-' + this.type
    },
    hs_toast_icon_class: function () {
      return 'hs-icon-' + this.type
    }
  },
  methods: {
    init: function (options, sugar) {
      if (typeof options === 'string') options = { message: options }

      clearTimeout(this.timer)

      // 默认配置
      var op = {
        show: false,
        message: '',
        type: 'default',
        duration: 2000,
      }

      for (let key in sugar) {
        op[key] = sugar[key]
      }

      for (let key0 in options) {
        op[key0] = options[key0]
      }

      for (let key1 in op) {
        this[key1] = op[key1]
      }

      this.show = true
      if (this.duration != 0) {
        this.timer = setTimeout(function () {
          this.show = false
        }.bind(this), this.duration)
      }
    },
    clear: function () {
      this.message = ''
      this.show = false
    }
  }
}
</script>

<style>
@import '../components.css';
</style>

<style scoped>
.hs-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: #fff;
  max-width: 300px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  z-index: 2021;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.hs-toast-success {

}

.hs-toast-warning {

}

.hs-toast-error {

}

.hs-toast-icon {
  flex: 0 0 32px;
  margin-right: 10px;
  width: 32px;
  height: 32px;
  font-size: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.hs-toast-message {
  flex: 1 1 auto;
  font-size: 18px;
  line-height: 22px;
  word-break: break-word;
}
</style>
