<template lang="pug">
  .hel
    h1 {{ msg }}
    .type-btn
      p input框含标签
      mp-input(
        type='input'
        ref='labHis'
        :labeled='isLabeled'
        :showlabeled='isShowLabel'
        v-model='value1'
        icon='search'
        placeholder='图标标签搜索框'
        @focus = 'focusFun'
        @closeClick='deleteLabel'
        @click='search'
        :histories='localHistory'
        :isShowHistory='showHistory'
        @select='selectHistory'
        @sub='substraction')
        template(slot='before') 带标签
      mp-input(type='input' :labeled='true' :showlabeled='true' placeholder='标签按钮搜索框' @click='search')
        template(slot='before') 带标签
        template(slot='after') 搜索
      mp-input(type='input' placeholder='文本输入框同行')
        template(slot='before' placeholder='请输入用户名') 用户登录昵称
      .border
        p 文本输入框换行
        mp-input(type='input' :isTop='true' placeholder='请填写用户名' :disabled='true')
          template(slot='before') 用户名
        mp-input(type='input' :isTop='true' placeholder='请填写邮箱')
          template(slot='before') 邮箱
      mp-input(type='input' placeholder='常规输入框自动匹配输入的历史记录' autoComplete='on')
      mp-input(type='input' :circled='true' icon='search' placeholder='带icon圆角输入框'  @click='search')
      mp-input(type='number' :circled='true' placeholder='圆角输入框只能输入数字')
      mp-input(type='input' :isTop='true' :valided='true' placeholder='验证输入框' :errorShow='isErrored' :errorMsg='errorMessage' @focus='focusFun' @blur='validFun' @click='search')
        template(slot='before') 用户名
      mp-input(type='input' :disabled='true' placeholder='禁用输入框')
      mp-input(type='input' size='big' placeholder='大尺寸限制最多输入20位输入框' :maxlength=20)
      mp-input(type='input' :circled='true' size='big' icon='search' placeholder='带icon圆角大尺寸输入框')
      mp-input(type='input' :circled='true' size='big' :disabled='true' placeholder='圆角大尺寸禁用输入框')
      .border
        p 文本textarea输入框
        mp-input(type='textarea' :rows=3 :cols=30 placeholder='可视行数文本输入框textarea' @focus='focusFun')
        mp-input(type='textarea' :cols=50 placeholder='可视列数文本输入框textarea')
        mp-input(type='textarea' :disabled='true' placeholder='禁用文本输入框textarea')
</template>

<script>
import mpInput from './Input'
export default {
  name: 'mpInputShow',
  components: {
    mpInput
  },
  data () {
    return {
      msg: 'mPaiMent的输入框INPUT展示',
      isLabeled: true,
      isShowLabel: true,
      isErrored: false,
      errorMessage: '',
      value1: '',
      showHistory: false,
      localHistory: [],
      historyItems: []
    }
  },
  created () {
    this.localHistory = localStorage.getItem('History1') ? localStorage.getItem('History1').split(',').slice(0, 10) : []
    this.historyItems = this.localHistory
  },
  methods: {
    search () {
      if (this.value1 === '' || this.value1 === null || this.value1 === undefined) {
        this.isErrored = true
        this.errorMessage = '输入字段不能为空'
        return
      }
      this.isErrored = false
      this.showHistory = false
      console.log(this.value1)
      if (this.value1 !== undefined || this.value1 !== null || this.value1 !== '') {
        if (this.historyItems.indexOf(this.value1) < 0) {
          this.historyItems.push(this.value1)
        }
        let length = this.historyItems.length
        if (length > 10) {
          this.historyItems.splice(0, 1)
        }
      }
      localStorage.setItem('History1', this.historyItems)
    },
    focusFun (data) {
      this.isErrored = false
      this.showHistory = this.localHistory.length > 0
    },
    deleteLabel (data) {
      this.isShowLabel = false
    },
    validFun (data) {
      console.log(data)
      if (data[1] === '' || data[1] === null || data[1] === undefined) {
        this.isErrored = true
        this.errorMessage = '输入字段不能为空'
        return
      }
      this.isErrored = false
    },
    selectHistory (value) {
      this.value1 = value
      this.showHistory = false
    },
    substraction (index) {
      this.localHistory.splice(index, 1)
      this.showHistory = this.localHistory.length > 0
      localStorage.setItem('History1', this.localHistory)
    }
  },
  mounted () {
    document.addEventListener('click', (e) => {
      if (this.$refs.labHis) {
        if (!this.$refs.labHis.$el.contains(e.target)) this.showHistory = false
      }
    })
  }
}
</script>
<style lang="stylus">
.hel
  padding-bottom 50px
  // overflow hidden
  width 600px
  margin 0 auto
.type-btn
  float left
  width 100%
  text-align left
  // overflow hidden
  margin-bottom 10px
  .border
    padding 5px
    margin 20px auto
    font-size 16px
    border 1px solid blue
</style>
