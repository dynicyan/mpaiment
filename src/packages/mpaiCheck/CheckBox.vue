<template lang="pug">
  .mp-cheboxRender
    label(class="mp-checkbox" v-for="item, index in items")
      input(
        class="mp-input--checkbox"
        :value="label"
        type="checkbox"
        v-model="model"
        @focus="focus = true"
        @blur="focus = false"
        :name="name"
        :disabled="isDisabled")
      span {{item.name}}
</template>
<script>
export default {
  name: 'mpCheck',
  props: {
    items: {
      type: Array,
      default: []
    },
    name: '',
    model: [String, Number],
    label: [String, Number],
    isDisabled: Boolean
  }
}
</script>
<style lang="stylus">
</style>
