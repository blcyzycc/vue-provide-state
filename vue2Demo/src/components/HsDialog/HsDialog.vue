<template>
  <div class="hs-dialog" :class="[className, show?'hs-dialog-active':'']" :style="{width:width}" v-show="show">
    <div class="hs-dialog-header">
      <span v-text="title"></span>
      <i class="hs-dialog-icon-close hs-icon-x" v-if="showCloseIcon" @click="handleCancel"></i>
    </div>
    <div class="hs-dialog-ct-bg" v-if="showTypeIcon">
      <i class="hs-dialog-icon" :class="hs_dialog_icon"></i>
    </div>
    <div class="hs-dialog-content" :style="{textAlign:textAlign}" v-html="message"></div>
    <div class="hs-dialog-footer" :style="{textAlign:buttonAlign}" v-if="showFooter">
      <span class="hs-dialog-footer-btn hs-dialog-footer-btn-cancel" v-if="showCancelButton" @click="handleCancel" v-text="cancelButtonText"></span>
      <span class="hs-dialog-footer-btn hs-dialog-footer-btn-confirm" v-if="showConfirmButton" @click="handleConfirm" v-text="confirmButtonText"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hs-dialog',
  data: function () {
    return {
      show: false,
      showFooter: true,
      timer: null, // 轻提示计时器

      title: '',
      type: 'default',
      message: '',
      width: '',
      className: '',
      showTypeIcon: true,
      textAlign: 'center',
      buttonAlign: 'center',
      showCloseIcon: true,
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: '取消',
      confirmButtonText: '确定',
      overlay: true,
      overlayClass: '',
      closeOnClickOverlay: true,
      duration: 0,
      beforeClose: null,

      resolve: null,
      reject: null,
    }
  },
  watch: {
    show: function (val) {
      if (val) {
        if (this.overlay) this.createdDialogWrapper()
      } else {
        this.clearDialogWrapper()
      }
    }
  },
  computed: {
    hs_dialog_icon: function () {
      return 'hs-icon-' + this.type
    },
  },
  methods: {
    init: function (options, sugar) {
      if (typeof options === 'string') options = { message: options }

      this.clearDialogWrapper()

      // 重置配置
      var op = {
        showFooter: true,
        title: '',
        type: 'default',
        message: '',
        width: '',
        className: '',
        showTypeIcon: true,
        textAlign: 'center',
        buttonAlign: 'center',
        showCloseIcon: true,
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        overlay: true,
        overlayClass: '',
        closeOnClickOverlay: true,
        duration: 0,
        beforeClose: null
      }

      for (var key in sugar) {
        op[key] = sugar[key]
      }

      for (var key0 in options) {
        op[key0] = options[key0]
      }

      for (var key1 in op) {
        this[key1] = op[key1]
      }

      this.show = true

      if (this.reject) this.reject()
      this.reject = null
    },
    createdDialogWrapper: function () {
      var d = document.createElement('div')
      d.className = 'hs-dialog-wrapper ' + this.overlayClass
      d.addEventListener('click', function () {
        if (this.closeOnClickOverlay) {
          this.handleCancel()
        }
      }.bind(this))
      document.body.appendChild(d)
    },
    clearDialogWrapper: function () {
      var d = document.querySelectorAll('.hs-dialog-wrapper')
      for (var i = 0; i < d.length; i++) {
        document.body.removeChild(d[i])
      }
    },
    handleCancel: function () {
      var done = function () {
        this.show = false
        this.reject && this.reject()
      }.bind(this)

      if (this.beforeClose) {
        this.beforeClose('cancel', done)
      } else {
        done()
      }
    },
    handleConfirm: function () {
      var done = function () {
        this.show = false
        this.resolve && this.resolve()
      }.bind(this)

      if (this.beforeClose) {
        this.beforeClose('confirm', done)
      } else {
        done()
      }
    }
  }
}
</script>

<style>
@import '../components.css';
</style>

<style scoped>
.hs-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 400px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 2000;
  /*transition: 2s linear;*/
  /*opacity: 0;*/
}

.hs-dialog-active {
  /*opacity: 1;*/
}

.hs-dialog-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  margin: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 999;
}

.hs-dialog-header {
  height: 50px;
  padding: 0 15px;
  background: #EDF5FF;
  text-align: left;
  font-size: 16px;
  line-height: 50px;
}

.hs-dialog-icon-close {
  position: absolute;
  right: 15px;
  top: 15px;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 10px;
  cursor: pointer;
}

.hs-dialog-ct-bg {
  position: relative;
  height: 50px;
  margin: 0 auto;
  background-color: #EDF5FF;
  z-index: 2;
  overflow: hidden;
}

.hs-dialog-ct-bg .hs-dialog-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  margin: -25px 0 0 -25px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50px;
  z-index: 2;
}

.hs-dialog-ct-bg::after {
  content: '';
  position: absolute;
  top: 25px;
  left: 50%;
  width: 100%;
  height: 50px;
  transform: translateX(-50%);
  border-radius: 100%;
  background-color: #fff;
  z-index: 1;
}

.hs-dialog-content {
  max-height: 300px;
  padding: 15px;
  font-size: 16px;
  line-height: 22px;
  word-break: break-word;
  overflow: auto;
}

.hs-dialog-footer {
  width: 100%;
  height: 70px;
  background: #fff;
  text-align: right;
  line-height: 60px;
}

.hs-dialog-footer-btn {
  display: inline-block;
  width: 96px;
  height: 30px;
  margin: 0 10px;
  border-radius: 16px;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
}

.hs-dialog-footer-btn-confirm {
  background: #6BA3F6;
  color: #FFFFFF;
}

.hs-dialog-footer-btn-confirm:hover {
  background: #5F91DB;
}

.hs-dialog-footer-btn-cancel {
  background: #CCCCCC;
  color: #FFFFFF;
}

.hs-dialog-footer-btn-cancel:hover {
  background: #B3B3B3;
}
</style>
