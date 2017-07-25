<template lang="pug">
  #radio_box
    label(class="mp-radio")
      span.mp-radio_input(:class="{'is-disabled': isDisabled, 'is-checked': isChecked}")
        span.mp-radio_inner
          i.checkedCircle(v-if="isChecked")
      input(type="radio"
            v-model="model"
            v-bind:name="name"
            v-bind:value="label"
            @change="changeT"
            v-bind:disabled="disabled")
      span.mp-radio_label
        slot
        template(v-if="!$slots.default") {{ label }}
</template>

<style lang="stylus">
  #radio_box
    .mp-radio
      position relative
      cursor pointer
      display inline-block
      white-space nowrap
    .mp-radio:hover
      .mp-radio_inner
        border-color #ffd600
      .is-disabled
        .mp-radio_inner
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
    .mp-radio_input
      box-sizing border-box
      white-space nowrap
      outline none
      display inline-block
      line-height 0
      position relative
      vertical-align middle
      .mp-radio_inner
        box-sizing border-box
        display inline-block
        position relative
        border 2px solid #e1e1e1
        border-radius 50%
        width 20px
        height 20px
        background-color #fff
        z-index 1
        transition border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46)
    .is-focus
      .mp-radio_inner
        border-color #ffd600
    .is-checked
      .mp-radio_inner
        background-color #ffd600
        border-color #ffd600
        .checkedCircle
          position absolute
          top 50%
          right 0
          left 50%
          width 3px
          height 3px
          border-radius 50%
          border 2px solid #23232b
          transform translate(-50%, -50%)
    .is-disabled
      cursor not-allowed
      +.mp-radio_label
        cursor not-allowed
      .mp-radio_inner
        background #ededed
        border-color #ededed
        .checkedCircle
          border-color #c8c8c8
    .mp-radio_label
      font-size 13px
      padding-left 9px
      height 20px
      display inline-block
      vertical-align middle
</style>

<script>
  import Brocast from '../../mixins/brocast'
  export default {
    name: 'MpRadio',
    mixins: [Brocast],
    componentName: 'mpRadio',
    props: {
      label: {},
      value: {},
      name: String,
      disabled: {
        type: [String, Boolean],
        default: false
      }
    },
    computed: {
      isDisabled () {
        if (this.disabled === true) {
          return true
        } else if (this.disabled === 'disabled') {
          return true
        }
        return false
      },
      isChecked () {
        if (this.model !== this.label && this.disabled === true) {
          return true
        } else if (this.model === this.label) {
          return true
        }
        return false
      },
      model: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', val)
        }
      }
    },
    methods: {
      changeT (evt) {
        this.$emit('change', evt)
      }
    }
  }
</script>
