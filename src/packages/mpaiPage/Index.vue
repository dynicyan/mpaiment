<template lang="pug">
  .hello
    h1 {{ msg }}
    input(type="text" value='page')
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
