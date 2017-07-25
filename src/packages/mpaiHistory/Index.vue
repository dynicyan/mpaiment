<template lang="pug">
  .history
    h1 {{ msg }}
    mp-input(
      ref='his'
      type='input'
      placeholder='点击显示最近10条本地浏览历史记录'
      @click='saveHistory'
      @focus = 'focusFun'
      @blur='blurFun'
      v-model='curValue'
      :histories='localHistory'
      :isShowHistory='showHistory'
      @select='selectHistory'
      @sub='substraction')
</template>

<script>
import mpInput from '../mpaiInput/Input'
export default {
  name: 'hello',
  components: {
    mpInput
  },
  data () {
    return {
      msg: 'mPaiMentInput输入框最近10条本地浏览历史记录',
      textLists: {},
      curValue: '',
      showHistory: false,
      historyItems: [],
      localHistory: []
    }
  },
  created () {
    this.localHistory = localStorage.getItem('History') ? localStorage.getItem('History').split(',').slice(0, 10) : []
    this.historyItems = this.localHistory
  },
  methods: {
    saveHistory (data) {
      this.showHistory = false
      if (this.curValue !== undefined || this.curValue !== null || this.curValue !== '') {
        if (this.historyItems.indexOf(this.curValue) < 0) {
          this.historyItems.push(this.curValue)
        }
        let length = this.historyItems.length
        if (length > 10) {
          this.historyItems.splice(0, 1)
        }
      }
      localStorage.setItem('History', this.historyItems)
    },
    focusFun () {
      this.showHistory = this.localHistory.length > 0
    },
    blurFun () {
      // this.showHistory = false
    },
    selectHistory (value) {
      this.curValue = value
      this.showHistory = false
    },
    substraction (index) {
      this.localHistory.splice(index, 1)
      this.showHistory = this.localHistory.length > 0
      localStorage.setItem('History', this.localHistory)
    }
  },
  mounted () {
    document.addEventListener('click', (e) => {
      if (this.$refs.his) {
        if (!this.$refs.his.$el.contains(e.target)) this.showHistory = false
      }
    })
  }
}
</script>
<style lang="stylus">
</style>
