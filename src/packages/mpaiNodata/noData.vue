<template lang="pug">
  .mp_data
    .img_box
      img(:src='imgSrc')
      slot(name='action')
    .text {{text}}
</template>

<style lang="stylus">
  .mp_data
    width 100%
    margin 0 auto
    min-height 100px
    .text
      margin-top 10px
      text-align center
      font-size 20px
      color #888
      font-family PingFangSC
    .img_box
      width 206px
      height 136px
      margin 0 auto
      position relative
      img
        position absolute
        top 0
        left 0
        bottom 0
        right 0
        margin auto
        width auto
        height auto
        max-width 100%
        max-height 100%
</style>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: '暂无数据'
      },
      imgSrc: {
        type: String,
        default: ''
      }
    }
  }
</script>
