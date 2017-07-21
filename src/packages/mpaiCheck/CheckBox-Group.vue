<template lang="pug">
  .el-checkbox-group
    slot
</template>
<script>
  import Brocast from '../../mixins/brocast'
  export default {
    name: 'mpCheckboxGroup',
    mixins: [Brocast],
    componentName: 'mpCheckboxGroup',
    props: {
      value: {},
      max: Number,
      min: Number,
      size: String,
      fill: String,
      textColor: String
    },
    watch: {
      value (value) {
        this.dispatch('MPFormItem', 'mp.form.change', [value])
      }
    }
  }
</script>
