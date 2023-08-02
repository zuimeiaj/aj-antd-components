<script>
import { Button, Icon, message, Upload } from 'ant-design-vue'
import ComponentInterface from './Interface'
export default {
  name: 'UploadFile',
  props: {
    value: String,
    layout: {
      type: String,
      default: 'button', // dragger | button
    },

    limit: {
      type: Number,
      default: 1,
    },
    text: {
      type: String,
      default: '单击或拖拽文件到此处上传文件',
    },
    tips: {
      type: String,
      default: '',
    },
    fileList: {
      type: Array,
      default: () => [],
    },
    buttonName: {
      type: String,
      default: '浏览文件',
    },
    listType: {
      type: String,
      default: 'picture-card', // picture-card  text  picture
    },
    accept: {
      tyep: String,
      default: 'image/*',
    },
    limitSize: {
      type: Number,
      default: 500,
    },
  },
  computed: {
    multiple() {
      return this.limit > 1
    },
    list() {
      return this.getValue().map((item) => {
        let file = this.getFileInfo(item)
        return {
          uid: file.uid,
          name: file.name,
          status: file.status,
          url: this.getImageUrl(item),
          percent: file.percent,
        }
      })
    },
  },
  watch: {
    fileList: {
      immediate: true,
      handler(v) {
        if (v) {
          v.forEach((item) => {
            this.fileMap[item.token] = item
          })
        }
      },
    },
  },

  methods: {
    getFileInfo(fileToken) {
      return this.fileMap[fileToken] || { uid: fileToken, name: fileToken, status: 'success' }
    },
    handleRemove(file) {
      this.notifyChange(this.getValue().filter((item) => item !== file.uid))
      return true
    },
    handleRequest(e) {
      let uid = e.file.uid

      if (this.multiple && this.getValue().length + 1 > this.limit) {
        message.warning('上传文件数量超限')
        return
      }

      if (e.file.size > this.limitSize * 1024 * 1024) {
        message.warning(`您上传的文件过大，请上传不超过${this.limitSize}M的图片`)
        return
      }

      this.fileMap[uid] = {
        name: e.file.name,
        status: 'uploading',
        uid: uid,
        percent: 0,
      }

      this.notifyChange(this.getValue().concat(uid))
      if (this.layout !== 'dragger') this.$refs.upload.autoUpdateProgress(null, this.fileMap[uid])
      ComponentInterface.upload
        .uploadFile(e.file)
        .then((res) => {
          e.onSuccess(e.file)
          this.fileMap[res] = {
            name: e.file.name,
            status: 'success',
            uid: res,
            percent: 1,
            url: this.getImageUrl(res),
          }

          this.notifyChange(
            this.getValue().map((item) => {
              if (item === uid) {
                return res
              }
              return item
            })
          )
        })
        .catch(() => {
          this.notifyChange(this.getValue().filter((item) => item !== uid))
        })
    },
    getValue() {
      return this.value?.split(',').filter(Boolean) || []
    },
    notifyChange(v) {
      let value = v?.join(',')
      this.$emit('change', value)
      this.$emit('input', value)
    },
    getImageUrl(imageUrl) {
      return ComponentInterface.table.getImageUrl(imageUrl)
    },
  },
  created() {
    this.fileMap = {}
  },

  render() {
    if (this.layout === 'dragger') {
      return (
        <Upload.Dragger
          customRequest={this.handleRequest}
          fileList={this.list}
          accept={this.accept}
          multiple={this.multiple}
          remove={this.handleRemove}
          name="file"
          ref="upload"
        >
          <p class="ant-upload-drag-icon">
            <Icon type="cloud-upload" />
          </p>
          <p class="ant-upload-text">{this.text}</p>
          <p class="ant-upload-tips">{this.tips}</p>
        </Upload.Dragger>
      )
    } else if (this.layout === 'button') {
      return (
        <Upload
          ref="upload"
          accept={this.accept}
          listType={this.listType}
          customRequest={this.handleRequest}
          multiple={this.multiple}
          remove={this.handleRemove}
          fileList={this.list}
        >
          {this.list.length < this.limit &&
            (this.listType == 'text' ? (
              <Button type="primary" icon="upload">
                {this.buttonName}
              </Button>
            ) : (
              [<Icon style="font-size:20px" type="upload" />, <div>上传</div>]
            ))}
        </Upload>
      )
    }
    return null
  },
}
</script>
