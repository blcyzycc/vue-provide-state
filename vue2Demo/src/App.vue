<template>
  <div id="app">
    <keep-alive :include="appState.keepAliveInclude">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  inject: ['appState'],
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">
body {
  font-size: 16px;
  color: #333;
}

#app {
  position: relative;
  font-family: "PingFang SC", -apple-system, BlinkMacSystemFont, "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
