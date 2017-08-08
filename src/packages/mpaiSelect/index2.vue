<template lang="pug">
  .selectBox
    h1 {{ msg }}
    .showList
      p 一般选择器
      mp-select(type="primary" :options='options' @change='change')
    .showList
      p 可清除选择器
      mp-select(type="primary" :options='options' clearable @change='change')
    .showList
      p 提示文字选择器
      mp-select(type="tips" :options='options' clearable @change='change')
    .showList
      p radio单选按钮选择器
      mp-select(type="radio" :options='options' clearable @change='change')
    .showList
      p 多选选择器
      mp-select(type="multiple" :options='options' clearable @change='change')
    .showList
      p 多选可输入选择器
      mp-select(type="multiple" :options='options' editable @change='change')
    .showList
      p 多选key值
      mp-select(type="multiple" :options='options' editable @change='change')
</template>
<script>
  import mpSelect from './select2'
  // import Clickoutside from '../../utils/clickoutside.js'
  export default {
    components: {
      mpSelect
    },
    data () {
      return {
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        editable: true,
        clearable: true,
        options: [
          {'name': '选项1', 'id': 31313131},
          {'name': '选项2', 'id': 31313131},
          {'name': '选项3', 'id': 31313131},
          {'name': '选项4', 'id': 31313131}
        ],
        msg: 'mPaiMent的选择器select展示'
      }
    },
    methods: {
      change (val) {
        console.log(val)
      }
    }
  }
</script>
<style lang="stylus">
  .selectBox
    .showList
      height auto
      p
        height 36px
        line-height 36px
</style>
