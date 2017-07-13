<template lang="pug">
  .hel
    h1 {{ msg }}
    .type-btn
      p input框含标签
      mp-input(type='input' :labeled='true' icon='search' placeholder='图标标签搜索框')
        template(:labeled='true' slot='before') 带标签
      mp-input(type='input' :labeled='true' placeholder='标签按钮搜索框')
        template(:labeled='true' slot='before') 带标签
        template(slot='after') 搜索
      mp-input(type='input' placeholder='文本输入框同行')
        template(slot='before' placeholder='请输入用户名') 用户登录昵称
      .border
        mp-input(type='input' :isTop='true' placeholder='文本输入框换行')
          template(slot='before') 文案
      mp-input(type='input')
      mp-input(type='input' :circled='true' icon='search')
      mp-input(type='input' :circled='true')
      mp-input(type='input' :valided='true')
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
      msg: 'mPaiMent的输入框INPUT展示'
    }
  }
}
</script>
<style lang="stylus">
.hel
  padding-bottom 30px
  overflow hidden
  width 600px
  margin 0 auto
.type-btn
  float left
  width 100%
  text-align left
  overflow hidden
  margin-bottom 10px
  .border 
    padding 5px
    margin 20px auto
    font-size 16px
    border 1px solid red
</style>
