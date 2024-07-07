<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="appState.keepAliveInclude">
      <component :key="route.path" :is="Component"/>
    </keep-alive>
  </router-view>
</template>

<script setup>
import { inject } from 'vue'

const appState = inject('appState')
</script>

<style lang="scss">

#app {
  font-family: PingFang, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
