<template lang='pug'>
  #app
    img(src='./assets/logo.png')
    router-view
</template>
<script>
export default {
  name: 'app',
  created () {
    this.$router.beforeEach((to, from, next) => {
      //  continue to next page
      next()
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
