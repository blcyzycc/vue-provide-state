<template>
  <div class="main">
    <nav>
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </nav>

    <div style="padding: 30px 0;"><input type="text"></div>

    <div style="padding: 10px 0;">
      <button @click="onClick">显示/隐藏</button>
    </div>

    <HelloWorld v-if="homeState.show"></HelloWorld>

  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>
<script setup>
import { reactive, provide, watch } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import susi from 'susi-provide'

const homeState = reactive({
  show: true,
  number: 1,
  count: {
    number: 10,
  },
  addNumber() {
    homeState.count.number++
  }
})

susi({
  data: {
    homeState
  },
  local: [
    'homeState.number',
  ],
  session: [
    'homeState.show',
    'homeState.count',
  ]
})

provide('homeState', homeState)

const onClick = () => {
  homeState.show = !homeState.show
}
</script>

<style lang="scss" scoped>
.main {
  text-align: center;
}
</style>
