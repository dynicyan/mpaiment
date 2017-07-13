<template lang="pug">
  .hello
    h1 {{ msg}}
    .show 暂无数据
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: '暂无数据',
      textLists: {}
    }
  }
}
</script>
<style lang="stylus">
</style>
