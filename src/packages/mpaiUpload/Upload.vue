<template lang="pug">
  mpDragger.mp-upload(:disabled='isDragger' v-on:file="getFile")
    i(class='icon' v-if='icon != null' v-bind:class='rendIcon')
    span.uptitle {{label}}
    label(:for='ids')
    input(ref="fileInput" type="file" name="file" :id="ids")
    span.dragtitle(v-if='!isDragger') {{dragTitle}}
</template>
<script>
  /*!
  * vue-file-upload
  * 基于vue.js的文件上传组件
  * 为了更好的给业务组件提供api，就将fileuploader类隐藏在内部，不对外开放；
  * 带来的问题也有很多：比如队列文件的同步
  * @param {String:url} ［上传地址］
  * @param {Number:max} [上传数量]
  * @param {String:label} [按钮显示名称]
  * @param {String:name} [上传name属性]
  * @param {String:icon} [图标class]
  * @param {Boolean:autoUpload} [自动上传：true：是，false：否]
  * @param {Boolean:multiple} [多文件上传：true：是，false：否]
  * @param {Array:files} [多文件队列，通常需要和开发组件双向绑定]
  * @param {Object:filters} [过滤器，对象包含name和fn属性，可用于限制上传文件类型，大小]
  * @param {Object:requestOptions} [请求附加参数:  formData:{},headers:{},responseType:'json',withCredentials:false]
  * @param {Object:events} [回调函数:onProgressUpload,onCompleteUpload,onErrorUpload,onSuccessUpload,onAbortUpload,onAddFileFail,onAddFileSuccess]
  */
  import _ from './util/public.js'
  import FileUploader from './lib/fileUploader.js'
  import mpDragger from './mpDrag'

  let noop = () => {}
  export default {
    name: 'mpUpload',
    components: {
      mpDragger
    },
    props: {
      isDragger: {
        type: Boolean,
        default: false
      },
      ids: {
        type: String,
        default: 'file'
      },
      url: {
        type: String,
        required: true
      },
      max: {
        type: Number,
        default: Number.MAX_VALUE
      },
      label: {
        type: String,
        default: '点击此处上传文件'
      },
      dragTitle: {
        type: String,
        default: '或将视频拖拽到此处'
      },
      name: {
        type: String,
        default: 'file'
      },
      icon: {
        type: String,
        default: null
      },
      autoUpload: {
        type: Boolean,
        default: true
      },
      multiple: {
        type: Boolean,
        default: false
      },
      onAdd: {
        type: Function,
        default: noop
      },
      filters: {
        type: Array,
        default: () => {
          return []
        }
      },
      requestOptions: {
        type: Object,
        default: () => {
          return {
            formData: {},
            headers: {},
            responseType: 'json',
            withCredentials: false
          }
        }
      },
      events: {
        type: Object,
        default: () => {
          return {
            onProgressUpload: noop,
            onCompleteUpload: noop,
            onErrorUpload: noop,
            onSuccessUpload: noop,
            onAbortUpload: noop,
            onAddFileFail: noop,
            onAddFileSuccess: noop
          }
        }
      }
    },

    data () {
      return {
        fileUploader: null
      }
    },

    computed: {
      rendIcon () {
        return this.icon.split(/\s/g)
      },
      bFiles: {
        get () {
          return this.files
        },
        set (value) {
          this.files = value
        }
      }
    },

    created () {
      this.fileUploader = new FileUploader({
        vm: this,
        url: this.url,
        label: this.label,
        name: this.name,
        maxItems: this.max,
        filters: this.filters,
        multiple: this.multiple,
        autoUpload: this.autoUpload,
        ...this.requestOptions,
        ...this.events
      })
    },

    mounted () {
      if (this.$refs.fileInput && this.multiple) {
        this.$refs.fileInput.setAttribute('multiple', this.multiple)
      }
      _.on(this.$refs.fileInput, 'change', this._onChange)
    },

    beforeDestroy () {
      _.off(this.$refs.fileInput, 'change')
      this.fileUploader.clearQueue()
    },

    methods: {
      getFile (file) {
        if (_.isHTML5()) {
          this.$refs.fileInput.files = file
        } else {
          this.$refs.fileInput = file
        }
      },
      uploadAll () {
        this.fileUploader.uploadAll()
      },
      clearAll () {
        this.fileUploader.clearQueue()
      },
      _abortUpload (file) {
        this.fileUploader.abortItem(file)
      },
      _onChange () { // 文件数组为单位，因为可能存在mutiple；如果是单个文件fileuploader会自动转换为数组类型！
        let elTargetFiles = _.isHTML5() ? this.$refs.fileInput.files : this.$refs.fileInput
        this.fileUploader.addToQueue(elTargetFiles)
        this.$emit('onAdd', this.fileUploader.getAll())
        this._resetInput()
      },
      _resetInput () { // 重置input值，可以上传重复
        this.$refs.fileInput.value = ''
      }
    }
  }
</script>
<style lang="stylus">
  .mp-upload
    height 100%
    width 100%
    overflow hidden
    background #f9f9f9
    display table-cell
    vertical-align middle
    border 0 none !important
    position relative
    label
      width 100%
      height 100%
      position absolute
      top 0
      left 0
      cursor pointer
    input[type=file]
      position absolute
      top 0
      width 0.1px
      height 0.1px
      left 0
      margin 0
      opacity 0
      -ms-filter 'alpha(opacity=0)'
      direction ltr
      cursor pointer
    span
      line-height 19px
      margin-top 9px
      font-size 13px
    &:hover
      .icon-upload1
        color #ffd600
    .icon
      display block
      font-size 32px
      margin 10px auto
      color #ffd600
</style>
