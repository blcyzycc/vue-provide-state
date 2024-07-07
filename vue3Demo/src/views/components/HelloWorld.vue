<template>
  <div class="hello">
    <button @click="add">number 增加</button>
    <div style="margin: 10px"></div>
    <button @click="add2">count.number 增加</button>

    <h3>{{ homeState.number }}</h3>
    <h3>{{ homeState.count }}</h3>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const homeState = inject('homeState')

const add = () => {
  homeState.number++
}

const add2 = () => {
  homeState.addNumber()
}

</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
</style>
