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
      mp-switch(v-model="turned")
    .checkdesc
      mp-switch(v-model="isChecked" )
    .checkdesc
      mp-switch(:showText="true" v-model="turnedon")
    .checkdesc
      mp-switch(:disabled="true")
</template>
<script>
import mpCheck from './CheckBox'
import mpCheckboxGroup from './CheckBox-Group'
import mpSwitch from '../mpaiSwitch/Switch'
export default {
  name: 'mpCheckboxShow',
  components: {
    mpCheck,
    mpCheckboxGroup,
    mpSwitch
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
      selectFruits: ['apple', 'putao']
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
