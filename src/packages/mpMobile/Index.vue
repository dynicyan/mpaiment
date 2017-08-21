<template lang="pug">
  .hel
    h1.h1 {{ msg }}
    .type-b
      h2 我是移动端，你好请问你是什么
</template>

<script>
export default {
  name: 'mpInputShow',
  data () {
    return {
      msg: '移动端页面适配制作'
    }
  },
  methods: {

  }
}
</script>
<style lang='sass'>
  @import "../../assets/demo1"
  .h1
    font-size: rem-calc(50) !important
  .type-b
    width: rem-calc(500)
    height: rem-calc(500)
    background: #ffd600
    margin: 0 auto
    h2
      font-size: rem-calc(36)
</style>
