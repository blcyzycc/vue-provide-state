<template>
  <div class="main">
    <nav>
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </nav>

    <div style="padding: 30px 0;"><input type="text"></div>

    <div style="padding: 10px 0;">
      <button @click="clear">清除Home页面缓存</button>
    </div>

    <button @click="add">增加</button>

    <h3>{{ appState.number }}</h3>

  </div>
</template>

<script>
import nita from 'nita-provide'

export default {
  name: 'AboutView',
  components: {},
  inject: ['appState'],
  methods: {
    onClick() {

    },
    clear() {
      this.appState.keepAliveClear('HomeView')
    },
    add() {
      nita.appState.number++
      // console.log(nita.appState);
    }
  }
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
