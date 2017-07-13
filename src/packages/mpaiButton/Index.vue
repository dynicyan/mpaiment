<template lang="pug">
  .helo
    h1 {{ msg }}
    .type-btn
      p 按钮分类： type取值分别为 theme主题按钮<br> default默认为精灵按钮 light浅色按钮 warning警示按钮 text文字按钮
      mp-button(type='theme') 主题按钮
      mp-button 默认精灵
      mp-button(type='light') 浅色按钮
      mp-button(type='warning') 警示按钮
      mp-button(type='text') 文字按钮
    .type-btn
      p 按钮禁用状态 disabled为true
      mp-button(type='theme' :disabled='true') 主题按钮
      mp-button(:disabled='true') 默认精灵
      mp-button(type='light' :disabled='true') 浅色按钮
    .type-btn
      p 按钮边框为虚线
      mp-button(:dashed='true') 无边按钮
    .type-btn
      p 按钮尺寸  分为 default默认按钮 small小型按钮 big大型按钮 tiny微型按钮
      mp-button default按钮
      mp-button(size='small') small按钮
      mp-button(size='tiny') tiny按钮
      mp-button(size='big') big按钮
      mp-button(size='bigger') bigger按钮
    .type-btn
      p 加宽圆角按钮  分为 default默认加宽按钮 主题加宽 浅色加宽
      mp-button(type='theme' size='bigger' :circled='true') 主题按钮
      mp-button(size='bigger' :circled='true') 默认精灵
      mp-button(type='light' size='bigger' :circled='true') 浅色按钮
      mp-button(type='theme' size='big' :circled='true') 主题按钮
    .type-btn
      p 带图标icon
      mp-button(type='theme' :loading='true') 加载按钮
      mp-button(type='theme' icon='scissors') 主题按钮
      mp-button(type='theme' icon='share')
      mp-button(icon='edit') 默认精灵
      mp-button(type='light' icon='share') 浅色按钮
      mp-button(type='warning' icon='warning') 警示按钮
      mp-button(type='text' icon='delete') 文字按钮
</template>

<script>
import mpButton from './button'
export default {
  name: 'buttonShow',
  components: {
    mpButton
  },
  data () {
    return {
      msg: 'mPaiMent的按钮展示'
    }
  }
}
</script>
<style lang="stylus">
.helo
  padding-bottom 30px
  overflow hidden
  width 960px
  margin 0 auto
button
  margin 10px 20px
.type-btn
  float left
  width 100%
  text-align left
  overflow hidden
  margin-bottom 10px
  p
    line-height 20px
    margin 20px auto
    font-size 16px
</style>

