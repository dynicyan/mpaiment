<template lang="pug">
  label(class="mp-switch")
    span(class="mp-switch--inner" :class="[isTurned === 'on' ? 'is-isTurned': '',{'is-disabled': disabled}]")
      span(class="mp-switch--checked" :class="[isTurned === 'on' ? 'mp-checkright' : 'mp-checkleft']")
      input(
        class="mp-switch--input"
        type="checkbox"
        ref="input"
        v-model = "_value"
        :name="name"
        :true-value="onTurned"
        :false-value="offTurned"
        @change="handleChange"
        :disabled='disabled')
    span(v-if="showText" class='mp-text' :class="[isTurned === 'on' ? 'mp-textleft' : 'mp-textright',  {'is-disabled': disabled}]") {{isTurned}}
</template>
<script>
export default {
  name: 'mpSwitch',
  props: {
    disabled: Boolean,
    value: {},
    onTurned: {
      type: [String, Boolean, Number],
      default: true
    },
    offTurned: {
      type: [String, Boolean, Number],
      default: false
    },
    label: String,
    showText: Boolean,
    name: ''
  },
  computed: {
    _value: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    isTurned () {
      return this._value ? 'on' : 'off'
    }
  },
  methods: {
    handleChange (evt) {
      this.$emit('change', evt.target.checked)
    }
  }
}
</script>
<style lang="stylus">
  .mp-switch
    display inline-block
    position relative
    line-height 20px
    height 20px
    border-radius 20px
    vertical-align middle
    cursor pointer
    &:hover
      .mp-switch--inner
        background-color #c8c8c8
      .is-isTurned
        background-color #ffd600
      .is-disabled
        background-color #ededed
    .mp-switch--inner
      width 40px
      height 20px
      position relative
      background-color #e1e1e1
      border-radius 20px
      background-clip content-box
      display inline-block
      -webkit-appearance none
      user-select none
      outline none
    .is-disabled
      cursor not-allowed
      background-color #ededed
    .mp-switch--checked
      position absolute
      top 4px
      left 4px
      width 12px
      height 12px
      border-radius 12px
      background #fff
    .mp-checkleft
      left 4px
      transition: left .3s
    .mp-checkright
      left 24px
      transition: left .3s
    .mp-switch--input
      position absolute
      opacity 0
      width 0.1px
      height 0.1px
      left -1000px
    .mp-text
      position absolute
      font-size 12px
      font-weight bold
      color #fff
    .mp-textright
      right 4px
      left auto
    .mp-textleft
      left 4px
      right auto
    .is-isTurned
      transition background-color ease .4s
      background-color #ffd600
</style>
