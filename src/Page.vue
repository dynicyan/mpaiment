<template lang="pug">
  .hello
    h1 {{ msg }}
    ul
      li(v-for='(list, index) in textLists')
        router-link(:to='list.link') {{list.name}}
      router-view
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'This is MPaiMent,welcome to here',
      textLists: [
        {
          name: '按钮',
          link: '/mpbutton'
        },
        {
          name: '输入框',
          link: '/mpinput'
        },
        {
          name: '选择器',
          link: '/mpselect'
        },
        {
          name: '单选复选框',
          link: '/mpcheck'
        },
        {
          name: '历史记录',
          link: '/mphistory'
        },
        {
          name: '分页',
          link: '/mpage'
        },
        {
          name: '暂无数据',
          link: '/mpnodata'
        },
        {
          name: '视频上传',
          link: '/mpUpload'
        },
        {
          name: '移动端',
          link: '/mpMobile'
        }]
    }
  }
}
</script>
<style lang="stylus">
h1, h2
  font-weight normal
.hello
  padding 24px
  margin 50px auto 0
  width 980px
  border 1px solid #e1e1e1
  min-height 600px
  background #fff
  h1
    margin 10px 0
    font-size 20px
ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px
  a
    font-size 16px
    padding 3px 5px
  .router-link-active
    background #42b983
    color #fff
a
  cursor pointer
  color #42b983
</style>
