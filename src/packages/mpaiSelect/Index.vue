<template lang="pug">
  .selectBox
    h1 {{ msg }}
    .showList
      p 一般选择器
      mp-select(type="primary" @change='change' :val='value1')
        mp-option(v-for="option in options" :key='option.key' :val='option.value')
    .showList
      p 可清除选择器
      mp-select(type="primary" clearable @change='change' :val='value2')
        mp-option(v-for="option in options" :key='option.key' :val='option.value')
    .showList
      p radio单选按钮选择器
      mp-select(type="radio" @change='change' :val='value3')
        mp-option(v-for="option in options" :key='option.key' :val='option.value')
    .showList
      p 多选选择器
      mp-select(type="multiple" @change='change' :val='value4')
        mp-option(v-for="option in options" :key='option.key' :val='option.value')
    .showList
      p 多选可输入选择器
      mp-select(type="multiple" editable @change='change' :val='value5')
        mp-option(v-for="option in options"  :key='option.key' :val='option.value')
    .showList
      p 多选key值
      mp-select(type="multiple" editable @change='change' :val='value6')
        mp-option(v-for="option in options" :key='option.key' :val='option.value')
</template>
<script>
  import mpSelect from './select'
  import mpOption from './option'
  export default {
    components: {
      mpSelect,
      mpOption
    },
    data () {
      return {
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        editable: true,
        clearable: true,
        options: [
          {'value': '选项1', 'key': 31313131},
          {'value': '选项2', 'key': 31313131},
          {'value': '选项3', 'key': 31313131},
          {'value': '选项4', 'key': 31313131}
        ],
        msg: 'mPaiMent的选择器select展示'
      }
    },
    methods: {
      transfer (data) {
      },
      change (val) {
        console.log(val)
      }
    }
  }
</script>
<style lang="stylus">
  .selectBox
    .showList
      height 100px
      p
        height 36px
        line-height 36px
</style>
