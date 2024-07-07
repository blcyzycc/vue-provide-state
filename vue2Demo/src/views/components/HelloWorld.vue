<template>
  <div class="hello">
    <button @click="add">增加</button>

    <h3>{{ homeState.number }}</h3>
    <h3>{{ homeState.count }}</h3>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  inject: ['homeState'],
  methods: {
    add() {
      this.homeState.number++
      this.homeState.count.number++

      this.homeState.addNumber(this)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3, button {
  margin: 40px 0 0;
}

</style>
