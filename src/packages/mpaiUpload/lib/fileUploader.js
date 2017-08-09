
import _ from '../util/public.js'
import generateOptions from './generate.js'
import FileItem from './fileItem.js'
import FileAlias from './fileAlias.js'
/**
 * FileUploader 类
 * 图片队列保存，
 * 回调函数执行
 */
class FileUploader {

    constructor (options) {
        _.extend(this, generateOptions(), options, {
            fileindex: 0,
            isUploading: false,
            failFilterIndex: -1
        })
        // 限制图片上传数量
        this.filters.push({
            name: 'maxLimit',
            fn () {
                return this.getAll().length < this.maxItems
            }
        })
    }
  /**
   * [getAll 获取所有队列文件]
   * 完成用户业务组件和vue－file－upload组件的文件同步
   * @return {[type]} [description]
   */
    getAll () {
        return this.queue
    }

  /**
   * [addQueue 添加到队列]
   * 由组件里input发生change时，调用此函数
   * @param {[FileList]} files [文件列表]
   */
    addToQueue (files) {
        var uploader = this
        files = uploader._isFileList(files) ? _.toArray(files) : [files]

        // file可能是File,htmlInputElement,Object
        files.forEach((file) => {
            var fileAlias = new FileAlias(file)
            if (uploader._isValidFile(fileAlias, uploader.filters)) {
                var fileItem = new FileItem(this, file, fileAlias)
                uploader.queue.splice(0, 0, fileItem)
                uploader.onAddFileSuccess(fileItem)
            } else {
                uploader.onAddFileFail(file, uploader.filters[uploader.failFilterIndex])
            }
        })

        if (uploader.autoUpload) {
            uploader.uploadAll()
        }
    }
  /**
   * [uploadAll 上传所有队列里的文件]
   * @return {[type]} [description]
   */
    uploadAll () {
        if (!this.queue.length) return
        var fileItems = this.getNotUploadedItems().reverse()
        fileItems.forEach((fileItem) => {
            fileItem.onPrepareUpload()
        })
        fileItems.length && fileItems[fileItems.length - 1].upload()
        // _.()
    }
  /**
   * [uploadItem 开始执行上传文件]
   * @param  {[type]} fileItem [description]
   * @return {[type]}          [description]
   */
    uploadItem (fileItem) {
        if (this.isUploading) return
        var postMethod = _.isHTML5() ? '_xhrPost' : '_iframePost'
        fileItem = fileItem || this.getNotUploadedItems()[0]
        if (fileItem) {
            this.isUploading = true
            // 预备上传，调整状态
            fileItem.onPrepareUpload()
            this[postMethod](fileItem)
        }
    }
  /**
   * [abortItem 取消上传]
   * 由组件发起取消命令，执行对应的回调函数（onabort）
   * @param  {[type]} item [description]
   * @return {[type]}      [description]
   */
    abortItem (item) {
        var prop = _.isHTML5() ? '_xhr' : '_form'
        if (item && item.isUploading) item[prop].abort()
    }

    /**
    * [clearQueue 清空队列文件]
    * @return {[type]} [description]
    */
    clearQueue () {
        while (this.queue.length) {
            this.queue[0].remove()
        }
    }
    /**
   * [removeFromQueue 删除文件]
   * @param  {[type]} fileItem [description]
   * @return {[type]}          [description]
   */
    removeFromQueue (fileItem) {
        let index = this.queue.indexOf(fileItem)
        if (fileItem.isUploading) fileItem.cancel()
        this.queue.splice(index, 1)
        fileItem.destroy()
    }
    /**
   * [getNotUploadedItems 获取队列未上传文件列表]
   * @return {[type]} [description]
   */
    getNotUploadedItems () {
        return this.queue.filter(item => !item.isUploaded)
    }
    /**
   * [getNextReadyItems 获取待上传文件]
   * @return {[type]} [description]
   */
    getNextReadyItems () {
        this.queen1 = []
        for (let i = 0; i < this.queue.length; i++) {
            this.queen1[i] = this.queue[this.queue.length - i - 1]
        }
        return this.queen1.filter(item => item.isReady && !item.isUploading)
    }
  /**
   * [onAddFileSuccess 成功添加队列回调]
   * @param  {[type]} fileItem [description]
   * @return {[type]}          [description]
   */
    onAddFileSuccess (fileItem) {

    }
  /**
   * [onAddFileFail 失败添加队列回调]
   * @param  {[type]} file       [description]
   * @param  {[type]} failFilter [description]
   * @return {[type]}            [description]
   */
    onAddFileFail (file, failFilter) {

    }
  /**
   * [_onProgressUpload 内部方法，上传进度]
   * @param  {[class]} fileItem [description]
   * @param  {[number]} progress [进度值]
   * @return {[type]}          [description]
   */
    _onProgressUpload (fileItem, progress) {
        fileItem.onProgress(progress)
        this.onProgressUpload(fileItem, progress)
    }
  /**
   * [onProgressUpload 回调上传进度函数]
   * @param  {[class]} fileItem [description]
   * @param  {[number]} progress [description]
   * @return {[type]}          [description]
   */
    onProgressUpload (fileItem, progress) {

    }

  /**
   * [_onSuccessUpload 内部方法，成功上传执行函数]
   * @param  {[class]} fileItem [文件]
   * @param  {[string｜xml｜json]} response [服务端输出内容]
   * @param  {[number]} status   [状态]
   * @param  {[string｜json]} headers  [头部信息]
   * @return {[type]}          [description]
   */
    _onSuccessUpload (fileItem, response, status, headers) {
        fileItem.onSuccess()
        this.onSuccessUpload(fileItem, response, status, headers)
    }

  /**
   * [onSuccessUpload 成功回调]
   * @param  {[type]} fileItem [description]
   * @param  {[type]} response [description]
   * @param  {[type]} status   [description]
   * @param  {[type]} headers  [description]
   * @return {[type]}          [description]
   */
    onSuccessUpload (fileItem, response, status, headers) {

    }

  /**
   * [_onCompleteUpload 内部方法，完成上传过程，执行函数]
   * @param  {[class]} fileItem [文件]
   * @param  {[string｜xml｜json]} response [服务端输出]
   * @param  {[number]} status   [网络状态]
   * @param  {[string｜json]} headers  [头部信息]
   * @return {[type]}          [description]
   */
    _onCompleteUpload (fileItem, response, status, headers) {
        this.onCompleteUpload(fileItem, response, status, headers)
        var nextItem = this.getNextReadyItems()[0]
        this.isUploading = false

        if (_.isObject(nextItem)) {
            nextItem.upload()
        }
    }
  /**
   * [_onCompleteUpload 完成上传回调]
   * @param  {[class]} fileItem [文件]
   * @param  {[string｜xml｜json]} response [服务端输出]
   * @param  {[number]} status   [网络状态]
   * @param  {[string｜json]} headers  [头部信息]
   * @return {[type]}          [description]
   */
    onCompleteUpload (fileItem, response, status, headers) {

    }

  /**
   * [_onErrorUpload 内部函数，上传异常执行函数]
   * @param  {[class]} fileItem [文件]
   * @param  {[string｜xml｜json]} response [服务端输出]
   * @param  {[number]} status   [网络状态]
   * @param  {[string｜json]} headers  [头部信息]
   * @return {[type]}          [description]
   */
    _onErrorUpload (fileItem, response, status, headers) {
        fileItem.onError()
        this.onErrorUpload(fileItem, response, status, headers)
    }

  /**
   * [_onErrorUpload 上传异常回调函数]
   * @param  {[class]} fileItem [文件]
   * @param  {[string｜xml｜json]} response [服务端输出]
   * @param  {[number]} status   [网络状态]
   * @param  {[string｜json]} headers  [头部信息]
   * @return {[type]}          [description]
   */
    onErrorUpload (fileItem, response, status, headers) {

    }
  /**
   * [_onAbortUpload 内部函数，取消上传执行函数]
   * @param  {[class]} fileItem [文件]
   * @param  {[string｜xml｜json]} response [服务端输出]
   * @param  {[number]} status   [网络状态]
   * @param  {[string｜json]} headers  [头部信息]
   * @return {[type]}          [description]
   */
    _onAbortUpload (fileItem, response, status, headers) {
        fileItem.onAbort()
        this.onAbortUpload(fileItem, response, status, headers)
    }

  /**
   * [onAbortUpload 取消上传回调函数]
   * @param  {[class]} fileItem [文件]
   * @param  {[string｜xml｜json]} response [服务端输出]
   * @param  {[number]} status   [网络状态]
   * @param  {[string｜json]} headers  [头部信息]
   * @return {[type]}          [description]
   */
    onAbortUpload (fileItem, response, status, headers) {

    }

  /**
   * [_onBeforeUpload 上传之前回调函数]
   * @param  {[type]} fileItem [description]
   * @return {[type]}          [description]
   */
    _onBeforeUpload (fileItem) {
        fileItem.onBeforeUpload()
        this.onBeforeUpload(fileItem)
    }
    onBeforeUpload (fileItem) {

    }
  /**
   * [_getQueueItem 获取下一个待上传文件]
   * @return {[type]} [description]
   */
    _getQueueItem () {
        return this.queue.shift()
    }
  /**
   * [isFileList FileList类型判断]
   * @param  {[type]}  fileList [description]
   * @return {Boolean}          [description]
   */
    _isFileList (fileList) {
        return fileList instanceof FileList
    }

  /**
   * [_isValidFile 有效的文件判断]
   * @param  {[File]}  file [description]
   * @param  {[Array]}  filters [description]
   * @return {Boolean}  true or false    [description]
   */
    _isValidFile (file, filters) {
        this.failFilterIndex = -1
        return !filters.length ? true : filters.every((filter) => {
            this.failFilterIndex++
            return filter.fn.call(this, file)
        })
    }
  /**
   * [_parseHeaders 头部信息转json格式]
   * @param  {[type]} headers [description]
   * @return {[type]}         [description]
   */
    _parseHeaders (headers) {
        var json = {}
        if (_.isObject(headers)) return
        headers.split('\n').forEach((header) => {
            let index = header.indexOf(':')
            if (index > -1) {
                let key = header.slice(0, index).trim()
                let val = header.slice(index + 1).trim()

                json[key] = json[key] ? json[key] + ',' + val : val
            }
        })
        return json
    }
    /**
     * 名称转码
    */
    utf8Encode = function (argString) {
        if (argString === null || typeof argString === 'undefined') {
            return ''
        }
        var string = (argString + '')   // .replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        let utftext = ''
        var start, end
        let stringl = 0

        start = end = 0
        stringl = string.length
        for (var n = 0; n < stringl; n++) {
            var c1 = string.charCodeAt(n)
            var enc = null

            if (c1 < 128) {
                end++
            } else if (c1 > 127 && c1 < 2048) {
                enc = String.fromCharCode(
                    (c1 >> 6) | 192, (c1 & 63) | 128
                )
            } else if (c1 & 0xF800 ^ 0xD800 > 0) {
                enc = String.fromCharCode(
                    (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
                )
            } else { // surrogate pairs
                if (c1 & 0xFC00 ^ 0xD800 > 0) {
                    throw new RangeError('Unmatched trail surrogate at ' + n)
                }
                var c2 = string.charCodeAt(++n)
                if (c2 & 0xFC00 ^ 0xDC00 > 0) {
                    throw new RangeError('Unmatched lead surrogate at ' + (n - 1))
                }
                c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000
                enc = String.fromCharCode(
                    (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
                )
            }
            if (enc !== null) {
                if (end > start) {
                    utftext += string.slice(start, end)
                }
                utftext += enc
                start = end = n + 1
            }
        }

        if (end > start) {
            utftext += string.slice(start, stringl)
        }

        return utftext
    }
    base64Encode = function (data) {
        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
        var o1, o2, o3, h1, h2, h3, h4, bits
        let i = 0
        let ac = 0
        let enc = ''
        let tmpArr = []

        if (!data) {
            return data
        }

        data = this.utf8Encode(data + '')

        do { // pack three octets into four hexets
            o1 = data.charCodeAt(i++)
            o2 = data.charCodeAt(i++)
            o3 = data.charCodeAt(i++)

            bits = o1 << 16 | o2 << 8 | o3

            h1 = bits >> 18 & 0x3f
            h2 = bits >> 12 & 0x3f
            h3 = bits >> 6 & 0x3f
            h4 = bits & 0x3f

            // use hexets to index into b64, and append result to encoded string
            tmpArr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4)
        } while (i < data.length)

        enc = tmpArr.join('')

        switch (data.length % 3) {
            case 1:
                enc = enc.slice(0, -2) + '=='
                break
            case 2:
                enc = enc.slice(0, -1) + '='
                break
        }

        return enc
    }
    URLSafeBase64Encode = function (v) {
        v = this.base64Encode(v)
        return v.replace(/\//g, '_').replace(/\+/g, '-')
    }
    /**
     * 合成文件
     */
    mkFile (fileItem, ctx) {
        let uploader = this
        let xhr = fileItem._xhr = new XMLHttpRequest()
        // let xVarUrl = '/x:scid/' + uploader.URLSafeBase64Encode(fileItem.scid) + '/x:os/' + uploader.URLSafeBase64Encode('qiniu_web_sdk') + '/x:upload_time/' + uploader.URLSafeBase64Encode((new Date()).getTime())
        let xVarUrl = '/x:os/' + uploader.URLSafeBase64Encode('qiniu_web_sdk') + '/x:upload_time/' + uploader.URLSafeBase64Encode((new Date()).getTime())
        let fname = '/fname/' + uploader.URLSafeBase64Encode(fileItem.name)
        let key = fileItem.scope ? '/key/' + uploader.URLSafeBase64Encode(fileItem.scope) : ''
        xhr.open(fileItem.method, fileItem.url + '/mkfile/' + fileItem.size + key + fname + xVarUrl, true)
        xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8')
        xhr.setRequestHeader('Authorization', 'UpToken ' + uploader.formData.token)
        xhr.onload = () => {
            // console.log(xhr)
            var headers = uploader._parseHeaders(xhr.getAllResponseHeaders())
            var response = xhr.response
            var action = xhr.status === 200 ? 'Success' : 'Error'
            var method = '_on' + action + 'Upload'
            uploader[method](fileItem, response, xhr.status, headers)
            uploader._onCompleteUpload(fileItem, response, xhr.status, headers)
        }
        xhr.onerror = () => {
            var headers = uploader._parseHeaders(xhr.getAllResponseHeaders())
            var response = xhr.response
            uploader._onErrorUpload(fileItem, response, xhr.status, headers)
            uploader._onCompleteUpload(fileItem, response, xhr.status, headers)
        }
        xhr.send(ctx)
    }
    /**
     * 上传完成
     */
    /**
     * 上传取消
     */
    //  xhr.onabort = () => {
    //     var headers = uploader._parseHeaders(xhr.getAllResponseHeaders())
    //     var response = xhr.response
    //     uploader._onAbortUpload(fileItem, response, xhr.status, headers)
    //     uploader._onCompleteUpload(fileItem, response, xhr.status, headers)
    // }
    /**
    * 块上传 分片
    * */
    events () {
        return {}
    }
    fireEvent (type) {
        return this.events[type]
    }
    getCtx (fileItem, blobParts) {
        let sunCtx = ''
        for (var i = 0; i < blobParts; i++) {
            sunCtx += sessionStorage.getItem(fileItem.name + [i + 1]) + ','
        }
        sunCtx = sunCtx.substring(0, sunCtx.length - 1)
        return sunCtx
    }
    chunksUpload (fileItem, i, blobParts, perFileSize) {
        let uploader = this
        // 保留xhr对象，防止abort可以执行
        let xhr = fileItem._xhr = new XMLHttpRequest()
        let _blob = fileItem.file.slice(i * perFileSize, (i + 1) * perFileSize)
        xhr.open(fileItem.method, fileItem.url + '/mkblk/' + _blob.size + '?name=' + fileItem.name + '&chunks=' + blobParts + '&chunk=' + i, true)
        // 添加header信息
        if (!_.isEmptyObject(uploader.headers)) {
            for (let key in uploader.headers) {
                xhr.setRequestHeader(key, uploader.headers[key])
            }
        }
        xhr.setRequestHeader('Authorization', 'UpToken ' + uploader.formData.token)
        xhr.setRequestHeader('Content-Type', 'application/octet-stream')
        // xhr.upload.addEventListener('progress', uploader.uploadProgress, false)
        // 上传进度回调
        let startDate = new Date().getTime()
        xhr.upload.addEventListener('progress', function (evt) {
            if (evt.lengthComputable) {
                let progress = {}
                let nowDate = new Date().getTime()
                // 计算网速
                let x = (evt.loaded) / 1024
                let y = (nowDate - startDate) / 1000
                let uploadSpeed = (x / y)
                let tmp
                if (uploadSpeed > 1024) {
                    progress.speed = (uploadSpeed / 1024).toFixed(2) + 'Mb/s'
                } else {
                    progress.speed = uploadSpeed.toFixed(2) + 'Kb/s'
                }
                tmp = perFileSize * i + evt.loaded
                progress.stTime = parseFloat(((fileItem.size - tmp) / (1024 * uploadSpeed)).toFixed(1))
                progress.percent = Math.round(100 * tmp / fileItem.size)
                // console.log(progress.percent, progress.speed)
                uploader._onProgressUpload(fileItem, progress)
            }
        }, false)
        // 上传完成
        xhr.onload = () => {
            // console.log(xhr.readyState)
            var headers = uploader._parseHeaders(xhr.getAllResponseHeaders())
            var response = xhr.response
            if (xhr.readyState === 4) {
                i++
                sessionStorage.setItem(fileItem.name + i, xhr.response.ctx)
                if (i < blobParts) {
                    uploader.chunksUpload(fileItem, i, blobParts, perFileSize)
                } else {
                    uploader.mkFile(fileItem, uploader.getCtx(fileItem, blobParts))
                }
            } else {
                var method = '_onErrorUpload'
                uploader[method](fileItem, response, xhr.status, headers)
            }
        }
        xhr.onerror = () => {
            var headers = uploader._parseHeaders(xhr.getAllResponseHeaders())
            var response = xhr.response
            uploader._onErrorUpload(fileItem, response, xhr.status, headers)
            uploader._onCompleteUpload(fileItem, response, xhr.status, headers)
        }
        // 上传取消
        xhr.onabort = () => {
            fileItem.chunkIndex = i
            var headers = uploader._parseHeaders(xhr.getAllResponseHeaders())
            var response = xhr.response
            uploader._onAbortUpload(fileItem, response, xhr.status, headers)
            uploader._onCompleteUpload(fileItem, response, xhr.status, headers)
        }
        xhr.responseType = uploader.responseType
        // 跨域支持,默认：False
        xhr.withCredentials = uploader.withCredentials
        xhr.send(_blob)
    }
    /**
     * 直接上传
     * */
    simpleUpload (fileItem) {
        // console.log(fileItem)
        var uploader = this
        // 保留xhr对象，防止abort可以执行
        var xhr = fileItem._xhr = new XMLHttpRequest()
        var postData = new FormData()
        // 追加formdata
        if (!_.isEmptyObject(uploader.formData)) {
            for (let key in uploader.formData) {
                postData.append(key, uploader.formData[key])
            }
        }
        postData.append(fileItem.alias, fileItem.file, fileItem.name)
        // postData.append('token', fileItem.token)
        // postData.append('key', fileItem.scope)
        // postData.append('x:scid', fileItem.scid)
        // postData.append('x:os', 'qiniu_web_sdk')
        // postData.append('x:upload_time', (new Date()).getTime())
        // 添加上传文件
        xhr.open(fileItem.method, fileItem.url, true)
        // 添加header信息
        if (!_.isEmptyObject(uploader.headers)) {
            for (let key in uploader.headers) {
                xhr.setRequestHeader(key, uploader.headers[key])
            }
        }
        // 上传进度回调
        let startDate = new Date().getTime()
        xhr.upload.addEventListener('progress', function (evt) {
            if (evt.lengthComputable) {
                let progress = {}
                let nowDate = new Date().getTime()
                // 计算网速
                let x = (evt.loaded) / 1024
                let y = (nowDate - startDate) / 1000
                let uploadSpeed = (x / y)
                let tmp
                if (uploadSpeed > 1024) {
                    progress.speed = (uploadSpeed / 1024).toFixed(2) + 'Mb/s'
                } else {
                    progress.speed = uploadSpeed.toFixed(2) + 'Kb/s'
                }
                tmp = evt.loaded
                progress.stTime = parseFloat(((fileItem.size - tmp) / (1024 * uploadSpeed)).toFixed(1))
                progress.percent = Math.round(100 * tmp / fileItem.size)
                // console.log(progress.percent, progress.speed, progress.stTime)
                uploader._onProgressUpload(fileItem, progress)
            }
        }, false)
        // 上传完成
        xhr.onload = () => {
            var headers = uploader._parseHeaders(xhr.getAllResponseHeaders())
            var response = xhr.response
            var action = xhr.status === 200 ? 'Success' : 'Error'
            var method = '_on' + action + 'Upload'
            uploader[method](fileItem, response, xhr.status, headers)
            uploader._onCompleteUpload(fileItem, response, xhr.status, headers)
        }
        // 上传错误
        xhr.onerror = () => {
            var headers = uploader._parseHeaders(xhr.getAllResponseHeaders())
            var response = xhr.response
            uploader._onErrorUpload(fileItem, response, xhr.status, headers)
            uploader._onCompleteUpload(fileItem, response, xhr.status, headers)
        }
        // 上传取消
        xhr.onabort = () => {
            fileItem.chunkIndex = 0
            var headers = uploader._parseHeaders(xhr.getAllResponseHeaders())
            var response = xhr.response
            uploader._onAbortUpload(fileItem, response, xhr.status, headers)
            uploader._onCompleteUpload(fileItem, response, xhr.status, headers)
        }
        // 返回类型设置，默认：json
        xhr.responseType = uploader.responseType
        // 跨域支持,默认：False
        xhr.withCredentials = uploader.withCredentials
        xhr.send(postData)
    }
  /**
   * [_xhrPost 支持html5特性]
   * 可以直接使用formdata，配合xmlhttprequest上传任意文件
   * @param  {[type]} file [description]
   * @return {[type]}      [description]
   */
    _xhrPost (fileItem) {
        var uploader = this
        // 保留xhr对象，防止abort可以执行
        // var xhr = fileItem._xhr = new XMLHttpRequest()
        // var postData = new FormData()
        this._onBeforeUpload(fileItem)
        var perFileSize = 4 * 1024 * 1024 // 2 * 1024 * 1024
        var blobParts = Math.ceil(fileItem.size / perFileSize)
        if (fileItem.size > perFileSize) {
          let index = fileItem.chunkIndex || 0
          if (!fileItem.progress.percent || fileItem.progress.percent < 100) {
            uploader.chunksUpload(fileItem, index, blobParts, perFileSize)
          } else {
            uploader.mkFile(fileItem, uploader.getCtx(fileItem, blobParts))
          }
          // if (fileItem.isUploading === true) {
          //   uploader.chunksUpload(fileItem, fileItem.chunkIndex, blobParts, perFileSize)
          // } else {
          //   uploader.chunksUpload(fileItem, 0, blobParts, perFileSize)
          // }
            // uploader.chunksUpload(fileItem, 0, blobParts, perFileSize)
        } else {
            console.log(fileItem.progress)
            uploader.simpleUpload(fileItem)
        }
    }
  /**
   * [_iframePost 悲剧，竟然不支持html5]
   * 只能模拟表单submit，target给iframe
   * @param  {[type]} file [description]
   * @return {[type]}      [description]
   */
    _iframePost (filecontrol) {
        var uploader = this
        var perFileSize = 4 * 1024 * 1024  // 2 * 1024 * 1024
        var blobParts = Math.ceil(filecontrol.size / perFileSize)
        uploader.chunksUpload(filecontrol, 0, blobParts, perFileSize)
        // var form = document.createElement('form')
        // var iframe = document.createElement('iframe')
        //
        // var input = filecontrol.input
        // if (filecontrol._form) {
        //     filecontrol._form = null
        // }
        // filecontrol._form = form
        // console.log(filecontrol)
        // this._onBeforeUpload(filecontrol)
        //
        // input.name = filecontrol.alias
        // form.style['display'] = 'none'
        // iframe.name = 'vueUploadFile' + Date.now()
        //
        // // 追加formdata
        // if (!_.isEmptyObject(uploader.formData)) {
        //     for (let key in uploader.formData) {
        //         let _input = document.createElement('input')
        //         _input.type = 'hidden'
        //         _input.name = key
        //         _input.value = uploader.formData[key]
        //
        //         form.appendChild(_input)
        //     }
        // }
        // let _input1 = document.createElement('input')
        // _input1.type = 'hidden'
        // _input1.name = 'token'
        // _input1.value = filecontrol.token
        // form.appendChild(_input1)
        // let _input2 = document.createElement('input')
        // _input2.type = 'hidden'
        // _input2.name = 'key'
        // _input2.value = filecontrol.scope
        // form.appendChild(_input2)
        // let _input3 = document.createElement('input')
        // _input3.type = 'hidden'
        // _input3.name = 'x:scid'
        // _input3.value = filecontrol.scid
        // form.appendChild(_input3)
        // let _input4 = document.createElement('input')
        // _input4.type = 'hidden'
        // _input4.name = 'x:os'
        // _input4.value = 'qiniu_web_sdk'
        // form.appendChild(_input4)
        // let _input5 = document.createElement('input')
        // _input5.type = 'hidden'
        // _input5.name = 'x:upload_time'
        // _input5.value = (new Date()).getTime()
        // form.appendChild(_input5)
        // form.action = filecontrol.url
        // form.method = filecontrol.method
        // form.target = iframe.name
        // form.enctype = 'multipart/form-data'
        // form.encoding = 'multipart/form-data'
        //
        // form.abort = () => {
        //     var xhr = {status: 0, response: null}
        //     var headers = {}
        //     _.off(iframe, 'load')
        //     iframe.src = 'javascript:false;'
        //
        //     uploader._onAbortUpload(filecontrol, xhr.response, xhr.status, headers)
        //     uploader._onCompleteUpload(filecontrol, xhr.response, xhr.status, headers)
        //     uploader.vm.$els.fileInput.parentNode.removeChild(form)
        // }
        //
        // uploader.vm.$els.fileInput.parentNode.insertBefore(form, uploader.vm.$els.fileInput)
        // form.appendChild(input.cloneNode(true))
        // form.appendChild(iframe)
        //
        // _.on(iframe, 'load', function () {
        //     var response = ''
        //     var status = 200
        //     var headers = {}
        //     try {
        //         response = iframe.contentDocument.body.innerHTML
        //     } catch (e) {
        //         status = 500
        //         throw e
        //     }
        //     var xhr = {response, status}
        //     uploader._onSuccessUpload(filecontrol, xhr.response, xhr.status, headers)
        //     uploader._onCompleteUpload(filecontrol, xhr.response, xhr.status, headers)
        //     _.off(iframe, 'load')
        //     uploader.vm.$els.fileInput.parentNode.removeChild(form)
        //
        //     form = null
        //     iframe = null
        // })
        // form.submit()
    }
}
export default FileUploader
