<template>
  <div class="main">
    <nav>
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </nav>

    <div style="padding: 30px 0;"><input type="text"></div>

    <div style="padding: 10px 0;">
      <button @click="clearHomeKeep">清除Home页面缓存</button>
    </div>

    <button @click="add">增加</button>

    <h3>{{ appState.number }}</h3>
    <h3>{{ userInfo }}</h3>

  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>
<script setup>
import { inject } from 'vue'
import susi from 'susi-provide'

const appState = inject('appState')
const userInfo = inject('userInfo')

const clearHomeKeep = () => {
  appState.keepAliveClear('HomeView')
}

const add = () => {
  susi.appState.number++
  susi.userInfo.token = 123
  // console.log(susi.appState);
  // console.log(susi.userInfo);
}
</script>

<style lang="scss" scoped>
.main {
  text-align: center;
}

h3, button {
  margin: 40px 0 0;
}
</style>
