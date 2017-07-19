<template lang="pug">
  mp-check(:items="fruitlists" name='fruits' :model='1')
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
</style>
