<template lang="pug">
  .mp-history
    ul.clearfix
      li(v-for="history, index in histories" @click='selectFunc')
        span {{history}}
        i.icon.icon-close(@click="subFunc")
</template>
<script>
export default {
  name: 'mpHistory',
  props: {
    histories: Array
  },
  created () {

  },
  computed: {

  },
  methods: {
    selectFunc (item) {
      this.$emit('select', item)
    },
    subFunc (index) {
      this.$emit('sub', index)
    }
  }
}
</script>
<style lang="stylus">
  .mp-history
    width 135px
    ul
      width 100%
      li
        width 100%
        padding 10px
        float left
        text-align left
        position relative
        span
          cursor default
          display inline-block
          overflow hidden
          width 100%
          padding-right 20px
          line-height 20px
          height 20px
          text-overflow ellipsis
          white-space nowrap
        .icon
          position absolute
          cursor pointer
          right 5px
          top 10px
</style>
