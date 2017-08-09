<template lang="pug">
#mp-pageWrapper
  .total-page(v-if='pageSum>10') 共{{pageSum}}页
  .mp-pagination
    mp-button.page-button(v-if='pageSum > 2' icon="arrowLeft" @click='previousChange' :disabled='curPage < 2')
    ul.clearfix
      li(v-if="pageSum !== 1" :class="{'active': curPage == 1}" @click="currentChange(1)")
        a 1
      li(v-if="backClipped" @click='backChange')
        a(:class='[arrowLeftClass]' @mouseenter="arrowLeftClass = 'arrowleft-more'" @mouseleave="arrowLeftClass = 'arrowleft-clip'")
      li(
        v-for="index in pages"
        :class="{'active': curPage == index}")
        a(@click="currentChange(index)") {{index}}
      li(v-if="preClipped" @click='nxtChange')
        a(:class='[arrowRightClass]' @mouseenter="arrowRightClass = 'arrowright-more'" @mouseleave="arrowRightClass = 'arrowright-clip'")
      li(:class="{'active': curPage == pageSum}" @click="currentChange(pageSum)")
        a {{pageSum}}
    mp-button.page-button(v-if='pageSum >2' icon="arrowRight" @click='nextChange' :disabled='curPage > pageSum - 1')
  mp-input.page-input(v-if='pageSum>10' ref='pageInput' type='number' :circled='true' v-model='changePage' icon='goTo' placeholder='输入页码' :isShowIcon='showIcon' @focus='focuFun' @click='changeTo')
</template>
<script>
  import mpButton from '../mpaiButton/button.vue'
  import mpInput from '../mpaiInput/Input.vue'
  export default {
    name: 'mp-pagination',
    components: {
      mpButton,
      mpInput
    },
    props: {
      mPpagination: {
        type: Object,
        default: () => {
          return {
            total: 10,
            currentPage: 1,
            pageSize: 5
          }
        }
      }
    },
    data () {
      return {
        curPage: 1,
        showIcon: false,
        changePage: '',
        pagePlace: '输入页码',
        arrowLeftClass: 'arrowleft-clip',
        arrowRightClass: 'arrowright-clip',
        backClipped: false, // 前省略号
        preClipped: false // 后省略号
      }
    },
    created () {
      this.curPage = this.mPpagination.currentPage
    },
    computed: {
      pageSum () {
        return Math.floor(this.mPpagination.total / this.mPpagination.pageSize)
      },
      pages () {
        const pagerCount = 7
        const currentPage = Number(this.curPage)
        const pageCount = Number(this.pageSum)
        let showPrevMore = false
        let showNextMore = false
        if (pageCount > pagerCount) {
          if (currentPage > pagerCount - 3) {
            showPrevMore = true
          }
          if (currentPage < pageCount - 3) {
            showNextMore = true
          }
        }
        const array = []
        if (showPrevMore && !showNextMore) {
          const startPage = pageCount - (pagerCount - 2);
          for (let i = startPage; i < pageCount; i++) {
            array.push(i)
          }
        } else if (!showPrevMore && showNextMore) {
          for (let i = 2; i < pagerCount; i++) {
            array.push(i)
          }
        } else if (showPrevMore && showNextMore) {
          const offset = Math.floor(pagerCount / 2) - 1
          for (let i = currentPage - offset ; i <= currentPage + offset; i++) {
            array.push(i)
          }
        } else {
          for (let i = 2; i < pageCount; i++) {
            array.push(i)
          }
        }
        this.backClipped = showPrevMore
        this.preClipped = showNextMore
        return array
      }
    },
    methods: {
      currentChange (index) {
        this.curPage = index
      },
      focuFun () {
        this.pagePlace = ''
        this.showIcon = true
      },
      changeTo () {
        this.curPage = this.changePage > this.pageSum ? this.pageSum : (this.changePage < 1 ? 1 : Number(this.changePage))
      },
      nextChange () {
        this.curPage < this.pageSum && this.curPage++
      },
      previousChange () {
        this.curPage > 1 && this.curPage--
      },
      backChange () {
        this.arrowLeftClass = 'arrowleft-clip'
        this.curPage = this.curPage - 5 < 1 ? 1 : this.curPage - 5
      },
      nxtChange () {
        this.arrowRightClass = 'arrowright-clip'
        this.curPage = this.curPage + 5 > this.pageSum ? this.pageSum : this.curPage + 5
      }
    },
    mounted () {
      document.addEventListener('click', (e) => {
        if (this.$refs.pageInput) {
          if (!this.$refs.pageInput.$el.contains(e.target))
            this.showIcon = false
        }
      })
    },
    watch: {
      curPage (value) {
        this.$emit('curChange', value)
      }
    }
  }
</script>
<style lang="stylus">
  #mp-pageWrapper
    display inline-block
    .total-page
      float left
      height 36px
      margin-right 12px
      line-height 36px
      font-size 12px
      color #888
    .page-input
      float right
      width 80px
      margin 0 0 0 12px
      .mp-inner--input
        width 64px
        height 16px
        padding 10px 0 10px 16px
        font-size 12px
      .icon
        z-index 999
    .mp-pagination
      display inline-block
      height 36px
      border-radius 18px
      border solid 1px #e1e1e1
      white-space nowrap
      .page-button
        height 28px
        width 28px
        margin 4px
        padding 0
        border-radius 14px
        border 0 none
        vertical-align top
        .icon
          margin-right 0
          margin-top 2px
      ul
        display inline-block
        li
          float left
          margin 4px
          &.active
          &:active
            a
              background-color #ffd600
          &:hover
            a
              background-color #f3f3f3
          &.active
            &:hover
              a
                background-color #ffd600
          a
            display: block
            height 28px
            width 28px
            padding 0
            border-radius 14px
            line-height 28px
            text-align center
            color #23232b
            font-size 12px
            &:hover
              text-decoration none
          .arrowleft-clip
          .arrowright-clip
            &:before
              content: '...'
              font-size 14px
          .arrowleft-more
            &:before
              content: '<<'
          .arrowright-more
            &:before
              content: '>>'
</style>
