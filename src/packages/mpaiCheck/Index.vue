<template lang="pug">
  .showCheck
    h1 {{msg}}
    p.checkdesc
      mp-check(:checked="checked") 单个checkbox
    p.checkdesc
      mp-check(label="labeCheckbox")
    p.checkdesc
      mp-check(label="disableCheckbox" :disabled='true')
</template>
<script>
import mpCheck from './CheckBox'
export default {
  name: 'mpCheckboxShow',
  components: {
    mpCheck
  },
  data () {
    return {
      msg: 'mpaiment的checkBox展示',
      checked: true,
      fruitlists: [
        {name: 'apple', value: 1},
        {name: 'banna', value: 2},
        {name: 'orange', value: 3},
        {name: 'xigua', value: 4},
        {name: 'chengzi', value: 5},
        {name: 'putao', value: 6},
        {name: 'lizi', value: 7}
      ]
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
