<template lang="pug">
  .pageWrapper
    h1 {{ msg }}
    .mp-page
      .pagewrapper
        mp-pagination(:mPpagination="mpPagination" @curChange='changePage')
      p 当前页显示记录为 {{mpPagination.pageSize}} 条/页,  当前选中为第 {{mpPagination.currentPage}} 页
      .pagewrapper
        mp-pagination(:mPpagination="mpPagination1" @curChange='changePage1')
      p 当前页显示记录为 {{mpPagination1.pageSize}} 条/页,  当前选中为第 {{mpPagination1.currentPage}} 页
      .pagewrapper
        mp-pagination(:mPpagination="mpPagination2" @curChange='changePage2')
      p 当前页显示记录为 {{mpPagination2.pageSize}} 条/页,  当前选中为第 {{mpPagination2.currentPage}} 页
      .pagewrapper
        mp-pagination(:mPpagination="mpPagination3" @curChange='changePage3')
      p 当前页显示记录为 {{mpPagination3.pageSize}} 条/页,  当前选中为第 {{mpPagination3.currentPage}} 页
</template>

<script>
import mpPagination from './Page'
export default {
  name: 'hello',
  components: {
    mpPagination
  },
  data () {
    return {
      msg: 'mPaiMent',
      mpPagination: {
        total: 10,
        currentPage: 1,
        pageSize: 5
      },
      mpPagination1: {
        total: 90,
        currentPage: 5,
        pageSize: 10
      },
      mpPagination2: {
        total: 75,
        currentPage: 1,
        pageSize: 3
      },
      mpPagination3: {
        total: 35,
        currentPage: 2,
        pageSize: 5
      }
    }
  },
  methods: {
    changePage (data) {
      this.mpPagination.currentPage = data
      console.log(data)
    },
    changePage1 (data) {
      this.mpPagination1.currentPage = data
      console.log(data)
    },
    changePage2 (data) {
      this.mpPagination2.currentPage = data
      console.log(data)
    },
    changePage3 (data) {
      this.mpPagination3.currentPage = data
      console.log(data)
    }
  }
}
</script>
<style lang="stylus">
  .mp-page
    margin 0 auto
    width 900px
    text-align center
    .pagewrapper
      margin-top 10px
    p
      margin 5px 0 25px
</style>
