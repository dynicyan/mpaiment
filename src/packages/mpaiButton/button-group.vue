<template lang="pug">
  .hello
    h1 {{ msg }}
    input(type='button')
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'mPaiMent的按钮展示',
      textLists: {}
    }
  }
}
</script>
<style lang="stylus">
</style>

