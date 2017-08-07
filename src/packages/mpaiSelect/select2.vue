<template lang="pug">
  div.box(@click="showOptions = false")
    div(class='mp-select' :class="[type ? 'mp-select--' + type : '', {'hover': showOptions}]")
      div.selectedBox
        ul.multiSelected(v-if="(type==='multiple') && selectArr.length > 0")
          li(v-for="(item,index) in selectArr")
            | {{item}}
            i.icon.icon-roundclose-fill(@click="removeOption(index)")
        input(v-bind:placeholder='placements' @click.stop="handleClick" @keyup.enter="addEdit" v-model="selectedVal" :readonly='!editable')
      i(class="icon icon-close" v-if="clearable && type !== 'multiple' && selectedVal !== ''" @click='removeVal()')
      i(class="icon icon-dropDown" :class="{'is-reverse':!showOptions}")
      div(class='showBox' v-if="type !=='multiple'")
        ul(v-if="showOptions")
          li(v-for="items in options" @click='selectOptions(items)' :class="{'selected': selectedVal===items.name}") {{items.name}}
      div(class='showBox' v-if="type==='multiple'")
        ul(v-if="showOptions")
          li(v-for="items in options" @click="selectMulOption(items)" :class="{'selected': selectArr.indexOf(items.name) !== -1}") {{items.name}}
</template>
<script>
  export default {
    props: {
      type: {
        type: String,
        default: ''
      },
      options: {
        type: Array,
        default: function () {
          return []
        }
      },
      clearable: {
        type: Boolean,
        default: false
      },
      editable: {
        type: Boolean,
        default: false
      },
      value: null
    },
    data () {
      return {
        showOptions: false,
        selectedVal: '',
        selectArr: []
      }
    },
    computed: {
      placements () {
        if (!this.editable) {
          return '请选择内容'
        } else {
          return '请输入内容回车添加'
        }
      }
    },
    methods: {
      handleClick () {
        this.showOptions = true
      },
      addEdit () {
        if (this.type === 'multiple') {
          this.selectedVal = this.selectedVal.replace(/(^\s*)|(\s*$)/g, '')
          if (this.selectedVal) {
            this.showOptions = false
            let indexItem = this.selectArr.indexOf(this.selectedVal)
            if (indexItem === -1) {
              this.selectArr.push(this.selectedVal)
              this.$emit('change', this.selectArr)
            } else {
              alert('已经添加该内容')
              return false
            }
          }
          this.selectedVal = ''
        } else {
          return false
        }
      },
      selectOptions (items) {
        this.showOptions = false
        this.selectedVal = items.name
        this.changeVal()
      },
      selectMulOption (items) {
        this.showOptions = false
        let indexItem = this.selectArr.indexOf(items.name)
        if (indexItem === -1) {
          this.selectArr.push(items.name)
        } else {
          this.selectArr.splice(indexItem, 1)
        }
        this.changeVal()
      },
      removeOption (index) {
        this.selectArr.splice(index, 1)
        this.changeVal()
      },
      removeVal () {
        if (this.type === 'multiple') {
          return false
        } else {
          this.selectedVal = ''
        }
        this.changeVal()
      },
      changeVal () {
        if (this.type !== 'multiple') {
          this.$emit('change', this.selectedVal)
        } else if (this.type === 'multiple') {
          this.$emit('change', this.selectArr)
        }
      }
    }
  }
</script>
<style lang="stylus">
  .mp-select
    width 135px
    position relative
    margin auto
    div.selectedBox
      border-radius 2px
      background-color #ffffff
      border solid 1px #e1e1e1
      overflow hidden
      input
        width 100%
        height 34px
        padding-left 8px
        padding-right 20px
        border none
      i
        cursor pointer
    .showBox
      position absolute
      left 0
      top 100%
      z-index 999
      ul
        border-radius 2px
        background-color #ffffff
        box-shadow 0 2px 4px 0 rgba(35, 35, 43, 0.12)
        border solid 1px #e1e1e1
        padding 4px 0
        li
          margin 0
          padding 0
          width 133px
          height 40px
          line-height 40px
          cursor pointer
          text-align center
    i.icon-close
      position absolute
      right 8px
      top 50%
      margin-top -18px
      height 36px
      line-height 36px
      color  #bababa
      cursor pointer
      display none
    i.icon-dropDown
      position absolute
      right 8px
      top 50%
      height 36px
      line-height 36px
      color  #bababa
      cursor pointer
      transition transform .3s
      transform translateY(-50%) rotate(180deg)
    i.icon-dropDown.is-reverse
      transform translateY(-50%)
  .mp-select.hover
    border-color #ffd600
  .mp-select:hover
    i.icon-close
      display block
    i.icon-close + i
      display none
  .mp-select--primary
    ul
      li:hover
        background #ededed
      li.selected
        background #ffd600
        border none
  .mp-select--radio
    ul
      width 600px
      li
        position relative
      li::before
           content ''
           width 16px
           height 16px
           position absolute
           left 20px
           top 10px
           border-radius 24px
           border 2px solid #ededed
      li.selected::after
        content ''
        width 2px
        height 2px
        position absolute
        left 27px
        top 17px
        border-radius 50%
        border 2px solid #23232b
      li.selected::before
        background #ffd600
        border-color #ffd600
      li:hover::before
        border-color #ffd600
  .mp-select--multiple
    width 300px
    height auto
    min-height 36px
    position relative
    .selectedBox
      ul
        float left
        overflow hidden
        padding-left 5px
        li
          float left
          height 28px
          line-height 28px
          display inline-block
          border 1px solid #ededed
          color #888888
          margin 3px 0
          margin-right 5px
          padding 0 5px
          border-radius 2px
          background #f3f3f3
          i.icon
            margin-left 5px
            color #bababa
            font-size 13px
        >li:hover
          color #23232b
      input
        float left
        padding 0 8px
    .showBox
      width 100%
      ul
        border-radius 2px
        background-color #ffffff
        box-shadow 0 2px 4px 0 rgba(35, 35, 43, 0.12)
        border solid 1px #e1e1e1
        overflow hidden
        padding 10px
        li
          width auto
          display inline-block
          line-height 40px
          margin 3px 0
          margin-right 5px
          padding 0 5px
          cursor pointer
          float left
        li:hover
          background #ededed
        li.selected
          background #ffd600
</style>

