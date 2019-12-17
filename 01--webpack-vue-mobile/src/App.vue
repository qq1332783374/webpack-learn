<template>
  <div id="app">
    {{msg}}
    <p>aaa</p>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      msg: 'Hello Vue'
    }
  }
}
</script>

<style scoped lang="scss">
  #app {
    font-size: 24px;
  }
</style>