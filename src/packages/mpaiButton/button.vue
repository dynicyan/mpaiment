<template lang="pug">
  button(
    :class="[type ? 'mp-button--' + type : '', size ? 'mp-button--' + size : '', {'is-disabled': disabled, 'is-loading': loading, 'is-plain': plain, 'is-dashed': dashed, 'is-circle': circled}]"
    :disabled = 'disabled' 
    class='mp-button'
    @click="handleClick"
    :autofocus="autofocus"
  )
    i(class="icon icon-loading" v-if="loading")
    i(:class="'icon-' + icon" v-if="icon && !loading" class='icon')
    span(v-if="$slots.default")
      slot
</template>

<script>
export default {
  name: 'mpButton',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: String,
    icon: {
      type: String,
      default: ''
    },
    loading: Boolean,
    plain: Boolean,
    dashed: Boolean,
    circled: Boolean,
    autofocus: Boolean,
    disabled: Boolean
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
<style lang="stylus">
.mp-button
  padding 8px 20px
  line-height 20px
  background #fff
  border-radius: 2px
  border: solid 1px #e1e1e1
  font-size 13px
  color #23232b
  cursor pointer
  border-radius 2px
  &:hover
    background #f9f9f9
  &:active
    background #e1e1e1
    border-color #c8c8c8
  &.is-disabled
    border-color #e1e1e1
    cursor not-allowed
    &:hover
    &:active
      background-color #fff
      border-color #e1e1e1
  .icon
    display inline-block
    font-size 13px
    margin-right 4px
  .icon-loading
    animation rotating 1s linear infinite
.mp-button--theme
  border-color #ffd600
  background-color #ffd600
  box-shadow 0 4px 4px 0 rgba(255, 214, 0, 0.3)
  &:hover
    border-color #f0c900
    background-color #f0c900
  &:active
    border-color #e1bd00
    background-color #e1bd00
  &.is-disabled
    background-color #ededed
    border-color #ededed
    box-shadow none
    cursor not-allowed
    &:hover
    &:active
      background-color #ededed
      border-color #ededed
.mp-button--light
  background-color #f9f9f9
  &:hover
    background-color #ededed
  &:active
    background-color #e1e1e1
    border-color #c8c8c8
  &.is-disabled
    border-color #e1e1e1
    cursor not-allowed
    &:hover
    &:active
      background-color #f9f9f9
      border-color #e1e1e1
.mp-button--warning
  color #fff
  border-color #ff7b4d
  background-color #ff7b4d
  box-shadow: 0 4px 4px 0 rgba(255, 123, 77, 0.3)
  &:hover
    border-color #f07448
    background-color #f07448
  &:active
    border-color #e06c43
    background-color #e06c43
.mp-button--text
  padding 8px 0
  color #888
  border-color #fff
  border-bottom-color #888
  &:hover
    color #23232b
    background-color #fff
    border-bottom-color #23232b
  &:active
    color #23232b
    background-color #fff
    border-color #fff
    border-bottom-color #23232b
.is-disabled
  color #bababa
.is-dashed
  border-style dashed
  &:hover
    border-color #f3f3f3
    background-color #f3f3f3
  &:active
    border-color #ededed
    background-color #ededed
.mp-button--small
  padding 6px 16px
.mp-button--tiny
  padding 8px 0
.mp-button--big
  padding 8px 62px
.mp-button--bigger
  padding 8px 92px
.is-circle
  border-radius 100px
  &.mp-button--small
    padding 8px 62px
@keyframes rotating {
    0% {
        transform-origin: center center;
        transform:rotate(0deg);
    }
    100% {
        transform-origin: center center;
        transform:rotate(360deg);
    }
}
</style>

