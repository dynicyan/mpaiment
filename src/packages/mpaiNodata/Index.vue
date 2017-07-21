<template lang="pug">
  #noData
    h1 {{msg}}
    ul.clearfix
      li(v-for="(list, index) in listData")
        p {{list.text}}
        .list
          mpNoData(v-bind:imgSrc="list.imgSrc" v-bind:text="list.text")
    <!--mpRadio(label="1" :disabled="false" v-model="radio")-->
    <!--mpRadio(label="2" :disabled="false" v-model="radio")-->
      mpRadio( v-model="radio" :label="item.label" v-for="item,index in items" :disabled="index === 2") {{item.value}} {{radio}}
</template>

<style lang="stylus">
  #noData
    width 100%
    ul
      margin-top 40px
      width 100%
      li
        width 30%
        margin-bottom 20px
        position relative
        float left
        p
          margin-bottom 10px
          font-size 14px
          color #23232b
        .list
          width 100%
</style>

<script>
  import mpNoData from './noData'
  import mpRadio from './radio'
  export default {
    name: 'noData',
    data () {
      return {
        items: [
          { label: '1', value: '111' },
          { label: '2', value: '222' },
          { label: '3', value: '333' },
          { label: '4', value: '444' },
          { label: '5', value: '555' }
        ],
        radio: '2',
        id: '1',
        radio1: '1',
        listData: [
          {imgSrc: require('../../assets/no-text.svg'), text: '无内容或无数据'},
          {imgSrc: require('../../assets/no-content-audo.svg'), text: '无内容（音频）'},
          {imgSrc: require('../../assets/no-failed-to-load.svg'), text: '获取数据失败'},
          {imgSrc: require('../../assets/no-results.svg'), text: '搜索无结果（视频）'},
          {imgSrc: require('../../assets/no-upload.svg'), text: '上传（视频）'}
        ],
        msg: 'mPaiMent的暂无数据展示'
      }
    },
    components: {
      mpNoData,
      mpRadio
    }
  }
</script>

