<script>
import 'viewerjs/dist/viewer.css'
import ComponentInterface from './Interface'
export default {
  name: 'ImageViewer',
  props: {
    src: String,
    width: {
      default: 30,
      type: Number,
    },
    height: {
      default: 30,
      type: Number,
    },
    multiple: {
      default: false,
      type: Boolean,
    },
    customRender: Function,
  },
  data() {
    return {
      url: [],
    }
  },
  created() {
    this.getImgs(this.src)
  },
  methods: {
    getImgs(src) {
      let url = Array.isArray(src) ? src : (src || '').split(',').filter(Boolean)
      url = url.map((item) => {
        return ComponentInterface.upload.getImageUrl(item)
      })
      this.url = this.multiple ? url : url.slice(0, 1)
    },
  },
  watch: {
    src(v) {
      this.getImgs(v)
    },
  },
  render() {
    return (
      <viewer ref="image" images={this.url}>
        {this.url.map((item, index) => {
          return this.customRender ? (
            this.customRender(item, index)
          ) : (
            <img
              key={item}
              style="object-fit: contain; margin-right: 12px"
              width={this.width}
              height={this.height}
              src={item}
            />
          )
        })}
      </viewer>
    )
  },
}
</script>
