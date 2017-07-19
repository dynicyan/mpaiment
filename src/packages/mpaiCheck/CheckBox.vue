<template lang="pug">
  label(class="mp-checkbox")
    span(class="mp-checkbox__input" :class="{'is-disabled': disabled, 'is-checked': checked, 'is-allChecked': allChecked, 'is-focus': focus}")
      span(class="mp-checkbox--inner")
        i(class="icon icon-check" v-if="checked")
      input(
        class="mp-input--checkbox"
        :value="label"
        type="checkbox"
        v-model="checked"
        @focus="focus = true"
        @blur="focus = false"
        :name="name"
        :disabled="disabled")
    span(class='mp-checkbox_labelgit ' v-if="$slots.default || label")
      slot
      template(v-if="label") {{label}}
</template>
<script>
export default {
  name: 'mpCheckbox',
  componentName: 'ElCheckbox',
  data () {
    return {
      focus: false
    }
  },
  props: {
    name: '',
    label: [String, Number],
    disabled: Boolean,
    checked: Boolean,
    allChecked: Boolean
  },
  methods: {
    handleChange (evt) {
      this.$emit('change', evt)
    }
  }
}
</script>
<style lang="stylus">
.mp-checkbox
  position relative
  cursor pointer
  display inline-block
  white-space nowrap
  &:hover
    .mp-checkbox__input
      .mp-checkbox--inner
        border-color #ffd600
    .is-disabled
      .mp-checkbox--inner
        background-color #ededed
        border-color #ededed
  input
    position absolute
    outline none
    width 0.1px
    height 0.1px
    margin 0
    top 0
    opacity 0
    left -1000px
  .mp-checkbox__input
    white-space nowrap
    outline none
    display inline-block
    line-height 1
    position relative
    vertical-align middle
    .mp-checkbox--inner
      display inline-block
      position relative
      border 2px solid #e1e1e1
      border-radius 2px
      box-sizing border-box
      width 18px
      height 18px
      background-color #fff
      z-index 1
      transition border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46)
  .is-focus
    .mp-checkbox--inner
      border-color #ffd600
      &:before
        color #c8c8c8
  .is-checked
    .mp-checkbox--inner
      background-color #ffd600
      border-color #ffd600
    .icon-check
      position absolute
      top 50%
      right 0
      left 0
      transform translateY(-50%)
      font-size 12px
      &:before
        color #000
        transform scale(0.75)
  .is-disabled
    cursor not-allowed
    +.mp-checkbox_label
      cursor not-allowed
    .mp-checkbox--inner
      background-color #ededed
      border-color #ededed
      .icon-check
        &:before
          color #c8c8c8
  .mp-checkbox_label
    font-size 13px
    padding-left 9px
</style>
