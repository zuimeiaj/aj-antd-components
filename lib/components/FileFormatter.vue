<script>
import ImageViewerVue from './ImageViewer.vue'
import ComponentInterface from './Interface'
export default {
  name: 'FileFormatter',
  props: {
    renderContent: Function,
    src: {
      type: [String, Array],
      default: '',
    },
    preview: {
      type: Boolean,
      default: true,
    },
    block: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 100,
    },
    height: {
      type: Number,
      default: 100,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
  },
  created() {
    this.groupId = 'GroupView_' + Math.random().toString().slice(2, 10)
  },
  methods: {
    getImageUrl(imageUrl) {
      return ComponentInterface.upload.getImageUrl(imageUrl)
    },
    getFiles() {
      return this.src
        ? (Array.isArray(this.src) ? this.src : this.src.split(',')).filter(Boolean).map((item) => {
            let name = item.split('/').pop()
            return { name, url: this.getImageUrl(item), path: item }
          })
        : []
    },
    isImg(name) {
      return /\.(jpg|jpeg|png|svg|webp|gif)$/.test(name)
    },
    getGroup() {
      let imgs = []
      let files = []
      this.getFiles().forEach((item) => {
        if (this.isImg(item.path)) {
          imgs.push(item)
          return
        }
        files.push(item)
      })
      return { imgs: imgs.map((item) => item.url).join(','), files }
    },
  },
  render() {
    const { imgs, files } = this.getGroup()
    return (
      <span class="file-formatter">
        {imgs && <ImageViewerVue customRender={this.renderContent} multiple={this.multiple} src={imgs} />}
        {files.length > 0 &&
          files.map((item) => {
            if (this.renderContent) return this.renderContent(item)

            return (
              <a class={this.block ? 'file-block' : 'file-inline'} href={item.url} target="_blank">
                {item.name}
              </a>
            )
          })}
      </span>
    )
  },
}
</script>
