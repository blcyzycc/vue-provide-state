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
import HelloWorld from './components/HelloWorld.vue'
import nita from 'nita-provide'

const state = {
  data: {
    homeState: {
      show: true,
      number: 1,
      count: {
        number: 10,
      },
      addNumber() {
        this.number++
      }
    }
  },
  local: [
    'homeState.number',
  ],
  session: [
    'homeState.show',
    'homeState.count',
  ]
}

export default {
  name: 'HomeView',
  mixins: [nita(state)],
  components: {
    HelloWorld
  },
  methods: {
    onClick() {
      this.homeState.show = !this.homeState.show
    }
  },
  mounted() {

  },
}
</script>

<style lang="scss" scoped>
.main {
  text-align: center;
}
</style>
