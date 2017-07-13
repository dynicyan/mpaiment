<template lang="pug">
  .hello
    h1 {{ msg }}
    ul
      li history
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'mPaiMent',
      textLists: {}
    }
  }
}
</script>
<style lang="stylus">
</style>
