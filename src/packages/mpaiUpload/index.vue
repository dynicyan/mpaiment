<template lang="pug">
#mpUpfile
  .upfile
    p 可拖拽
    .upArea
      mp-upload(
        :url = 'uploadUrl'
        label= '选择视频上传'
        ref = 'mpUploadFile'
        icon = 'icon-addVideo'
        ids = 'file1'
        :events = 'mpEvents'
        :filters = 'filters'
        :request-options = 'reqopts'
        @onAdd = 'onAddItemAnot'
        :isDragger = 'dragable'
        :multiple = 'true'
      )
    .progressBar
      ul
        li(v-for="file, index in upFiles")
          .upload
            p {{file.name}}
            p.upload-percent {{file.progress.percent}} %
            p.upload-st
              span.upload-speed {{file.progress.speed}}
              span.upload-time {{file.progress.stTime}} s
            p.upload-progress
              span.uploading-progress(:style="{width: file.progress.percent + '%'}")
            p.upload-pause
              mp-button(type='theme' @click='pauseUpfile(file)' :disabled='isDisable') {{pauseText}}
          .upload-fail
            i.icon.icon-fail
          .upload-succsee
            i.icon.icon-success
  .upfile
    p 不带icon
    .upArea
      mp-upload(
        :url = 'uploadUrl'
        label= '选择视频上传'
        ref = 'mpUploadFile1'
        :events = 'mpEvents'
        :filters = 'filters'
        :request-options = 'reqopts'
        @onAdd = 'onAddItemAnot1'
        :isDragger = 'dragable'
        :multiple = 'true')
    .progressBar
      ul
        li(v-for="file, index in upFiles1")
          .upload
            p {{file.name}}
            p.upload-percent {{file.progress.percent}} %
            p.upload-st
              span.upload-speed {{file.progress.speed}}
              span.upload-time {{file.progress.stTime}} s
            p.upload-progress
              span.uploading-progress(:style="{width: file.progress.percent + '%'}")
            p.upload-pause
              mp-button(type='theme' @click='pauseUpfile(file)' :disabled='isDisable') {{pauseText}}
          .upload-fail
            i.icon.icon-fail
          .upload-succsee
            i.icon.icon-success
  .upfile
    p 修改icon
    .upArea
      mp-upload(
        :url = 'uploadUrl'
        label= '选择视频上传'
        ref = 'mpUploadFile2'
        icon = 'icon-arrow-up'
        ids = 'file2'
        :events = 'mpEvents'
        :filters = 'filters'
        :request-options = 'reqopts'
        @onAdd = 'onAddItemAnot2'
        :isDragger = 'dragable'
        :multiple = 'true'
      )
    .progressBar
      ul
        li(v-for="file, index in upFiles2")
          .upload
            p {{file.name}}
            p.upload-percent {{file.progress.percent}} %
            p.upload-st
              span.upload-speed {{file.progress.speed}}
              span.upload-time {{file.progress.stTime}} s
            p.upload-progress
              span.uploading-progress(:style="{width: file.progress.percent + '%'}")
            p.upload-pause
              mp-button(type='theme' @click='pauseUpfile(file)' :disabled='isDisable') {{pauseText}}
          .upload-fail
            i.icon.icon-fail
          .upload-succsee
            i.icon.icon-success
  .upfile
    p 不可拖拽
    .upArea
      mp-upload(
        :url = 'uploadUrl'
        label= '视频上传移除'
        ref = 'mpUploadFile3'
        icon = 'icon-arrow-up'
        ids = 'file3'
        :events = 'mpEvents'
        :filters = 'filters'
        :request-options = 'reqopts'
        :isDragger = 'true'
        :multiple = 'true'
        @onAdd='onAddItemAnot3'
      )
    .progressBar
      ul
        li(v-for="file1, index in upFiles3")
          .upload
            p.upload-percent {{file1.progress.percent}} %
            p.upload-st
              span.upload-speed {{file1.progress.speed}}
              span.upload-time {{file1.progress.stTime}} s
            p.upload-progress
              span.uploading-progress(:style="{width: file1.progress.percent + '%'}")
            p.upload-pause
              mp-button(type='theme' @click='cancelItem(file1)') 移除上传文件
          .upload-fail
            i.icon.icon-fail
          .upload-succsee
            i.icon.icon-success
</template>
<script>
  import mpUpload from './Upload'
  import mpButton from '../mpaiButton/button'
  export default {
    name: 'showUpload',
    components: {
      mpUpload,
      mpButton
    },
    data () {
      return {
        uploadUrl: '',
        dragable: false,
        isDisable: false,
        upFiles: [],
        upFiles1: [],
        upFiles2: [],
        upFiles3: [],
        pauseText: '暂停',
        reqopts: {
          formData: {
            token: 'HCVM8xEeYtja86DsBXkiTPArcsFip7dLAHlAlNov:xqOSC0h6mgkMl1WiVzmYmhlwsDU=:eyJzY29wZSI6InZpZGVvcyIsImRlYWRsaW5lIjoxNTAxNzkwOTY4fQ=='
          },
          responseType: 'json',
          withCredentials: false
        },
        filters: [
          {
            name: 'videoFilter',
            fn (file) {
              if ((file.size / 1000000) > 5 * 1024) {
                alert('暂时仅支持大小在5G内的文件素材上传，请尝试压缩后重新上传')
                return
              }
              var type = '|' + file.name.slice(file.name.lastIndexOf('.') + 1) + '|'
              if ('|flv|wav|avi|rmvb|mov|wmv|m4v|wmv|mp4|'.indexOf(type) === -1) {
                alert('暂不支持此种视频格式上传，请重新选择')
                return
              }
              return '|flv|wav|avi|rmvb|mov|wmv|m4v|wmv|mp4|'.indexOf(type) !== -1
            }
          }
        ],
        mpEvents: {
          onCompleteUpload: (file, response, status, header) => {
            if (file.progress.percent === 100 && file.isSuccess === true) {
              this.isDisable = true
            }
          },
          onAddFileSuccess: (file) => {
          }
        }
      }
    },
    created () {
      this.uploadUrl = document.location.protocol === 'http:' ? 'http://upload.qiniu.com' : 'https://upload.qbox.me'
    },
    methods: {
      // 添加上传文件
      onAddItemAnot (file) {
        this.upFiles = file
      },
      onAddItemAnot1 (file) {
        this.upFiles1 = file
      },
      onAddItemAnot2 (file) {
        this.upFiles2 = file
      },
      onAddItemAnot3 (file) {
        this.upFiles3 = file
      },
      // 开始上传文件
      uploadItem (file) {
        file.upload()
      },
      // 删除上传文件
      cancelItem (file) {
        file.remove()
      },
      // 取消上传
      abortItem (file) {
        file.cancel()
      },
      // 暂停/继续上传
      pauseUpfile (file) {
        if (file.isUploading) {
          this.pauseText = '继续'
          this.abortItem(file)
        } else {
          this.pauseText = '暂停'
          this.uploadItem(file)
        }
      },
      // 上传全部
      uploadAll () {
        this.$refs.mpUploadFiles.uploadAll()
        this.$refs.mpUploadFiles1.uploadAll()
        this.$refs.mpUploadFiles2.uploadAll()
        this.$refs.mpUploadFiles3.uploadAll()
      },
      uploadAll1 () {
        this.$refs.mpUploadFiles.uploadAll()
      }
    }
  }
</script>
<style lang="stylus">
  .upfile
    width 400px
    overflow hidden
    text-align center
    float left
  .upArea
    width 200px
    height 120px
    border 1px solid #e7e1cd
    display table
    margin 10px auto
  .progressBar
    margin-top 10px
    height 105px
    .upload-speed
      margin-right 10px
    .upload-progress
      width 224px
      height 2px
      background-color #ededed
      position relative
      margin 7px auto
      .uploading-progress
        position absolute
        top 0
        left 0
        width 0
        height 2px
        background-color #ffd600
</style>
