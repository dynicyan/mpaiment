<template lang="pug">
  label(class="mp-checkbox")
    span(class="mp-checkbox__input" :class="{'is-disabled': disabled, 'is-checked': isChecked, 'is-allChecked': allChecked, 'is-focus': focus}")
      span(class="mp-checkbox--inner")
        i(class="icon icon-check" v-if="isChecked")
      input(
        v-if='trueLabel || falseLabel'
        class="mp-input--checkbox"
        type="checkbox"
        :name="name"
        :disabled="disabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        v-model="model"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false")
      input(v-else
        class="mp-input--checkbox"
        type="checkbox"
        v-model="model"
        :value = "label"
        :name="name"
        :disabled="disabled"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange")
    span(class='mp-checkbox_label ' v-if="$slots.default || label")
      slot
      template(v-if="!$slots.default") {{label}}
</template>
<script>
import Brocast from '../../mixins/brocast'
export default {
  name: 'mpCheckbox',
  mixins: [Brocast],
  componentName: 'mpCheckbox',
  data () {
    return {
      selfModel: false,
      focus: false
    }
  },
  computed: {
    model: {
      get () {
        return this.isGroup ? this.store : this.value !== undefined ? this.value : this.selfModel
      },
      set (val) {
        if (this.isGroup) {
          this.dispatch('mpCheckboxGroup', 'input', [val])
        } else {
          this.$emit('input', val)
          this.selfModel = val
        }
      }
    },
    isChecked () {
      if ({}.toString.call(this.model) === '[object Boolean]') {
        return this.model
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel
      }
    },
    isGroup () {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.componentName !== 'mpCheckboxGroup') {
          parent = parent.$parent
        } else {
          this._checkboxGroup = parent
          return true
        }
      }
      return false
    },
    store () {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value
    }
  },
  props: {
    value: {},
    label: {},
    disabled: Boolean,
    checked: Boolean,
    allChecked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number]
  },
  methods: {
    addToStore () {
      if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
        this.model.push(this.label)
      } else {
        this.model = this.trueLabel || true
      }
    },
    handleChange (evt) {
      console.log(evt)
      this.$emit('change', evt)
      if (this.isGroup) {
        this.$nextTick(_ => {
          this.dispatch('mpCheckboxGroup', 'change', [this._checkboxGroup.value])
        })
      }
    }
  },
  created () {
    this.checked && this.addToStore()
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
