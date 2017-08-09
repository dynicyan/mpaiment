<template lang="pug">
  div(class="mp-upload-dragger" :class="{'is-dragover': dragover}" @drop.prevent="onDrop" @dragover.prevent="onDragover" @dragleave.prevent="dragover = false")
    slot
</template>
<script>
export default {
  name: 'mpDrag',
  data () {
    return {
      dragover: false
    }
  },
  props: {
    disabled: Boolean
  },
  methods: {
    onDragover () {
      if (!this.disabled) {
        this.dragover = true
      }
    },
    onDrop (e) {
      if (!this.disabled) {
        this.dragover = false
        this.$emit('file', e.dataTransfer.files)
      }
    }
  }
}
</script>
<style lang="stylus">
</style>
