<template lang="pug">
  .showCheck
    h1 {{msg}}
    .checkdesc
      mp-check(v-model="isChecked") 单个checkbox
      p 选中的值为：{{isChecked}}
    .checkdesc
      mp-check(label="labeCheckbox")
      p 选中的值为：{{labeCheckbox}}
    .checkdesc
      mp-check(label="disableCheckbox" :disabled='true')
    .checkdesc
      mp-checkbox-group(v-model="checkText")
        mp-check(:label="labeCheckbox")
      p 选中的值为：{{checkText}}
    .checkdesc
      mp-checkbox-group(v-model="selectFruits")
        mp-check(v-for="fruit, index in fruitlists" :label="fruit.name" :key="fruit.value" :disabled='index === 1 || index === 5 ? true : false')
      p 选中的值为：{{selectFruits}}
    .checkdesc
      mp-check(label="全选" v-model="checkAll" :AllChecked='allChecked' @change='SelectAll')
      mp-checkbox-group(v-model="selectFruits")
        mp-check(v-for="fruit, index in fruitlists" :label="fruit.name" :key="fruit.value")
      p 选中的值为：{{selectFruits}}
    h1 mpaiment的开关展示
    .checkdesc
      p 未选中 {{turned}}
      mp-switch(v-model="turned")
    .checkdesc
      p 已选中 {{isChecked}}
      mp-switch(v-model="isChecked" )
    .checkdesc
      p 含文字选中 {{turnedon}}
      mp-switch(:showText="true" v-model="turnedon")
    .checkdesc
      p 禁止选择状态
      mp-switch(:disabled="true")
    h1 mpaiment的radio按钮展示
    .checkdesc
      mpRadio( v-model="radio" :label="item.label" v-for="item,index in items" :disabled="index === 2") {{item.value}} {{radio}}
</template>
<script>
import mpCheck from './CheckBox'
import mpCheckboxGroup from './CheckBox-Group'
import mpSwitch from '../mpaiSwitch/Switch'
import mpRadio from '../mpaiRadio/radio'
export default {
  name: 'mpCheckboxShow',
  components: {
    mpCheck,
    mpCheckboxGroup,
    mpSwitch,
    mpRadio
  },
  data () {
    return {
      msg: 'mpaiment的checkBox展示',
      isChecked: true,
      turned: false,
      turnedon: false,
      checkAll: false,
      allChecked: false,
      labeCheckbox: '标签选择',
      checkText: ['标签选择'],
      fruitlists: [
        {name: 'apple', value: 1},
        {name: 'banna', value: 2},
        {name: 'orange', value: 3},
        {name: 'xigua', value: 4},
        {name: 'chengzi', value: 5},
        {name: 'putao', value: 6},
        {name: 'lizi', value: 7}
      ],
      selectFruits: ['apple', 'putao'],
      items: [
        { label: '1', value: '111' },
        { label: '2', value: '222' },
        { label: '3', value: '333' },
        { label: '4', value: '444' },
        { label: '5', value: '555' }
      ],
      radio: '2',
      id: '1',
      radio1: '1'
    }
  },
  methods: {
    SelectAll (data) {
      let checkFruits = []
      for (let i in this.fruitlists) {
        checkFruits.push(this.fruitlists[i].name)
      }
      this.selectFruits = data.target.checked ? checkFruits : []
    }
  }
}
</script>
<style lang="stylus">
  .showCheck
    padding-bottom 30px
    overflow hidden
    width 960px
    margin 0 auto
  .checkdesc
    margin 10px 0
</style>
