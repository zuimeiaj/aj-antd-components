<script>
import { Button } from 'ant-design-vue'
export default {
  name: 'NativeFile',
  props: ['value', 'showName', 'display'],
  data() {
    return {
      fileName: '',
    }
  },
  methods: {
    c(e) {
      this.$emit('change', e.target.files[0])
      this.fileName = e.target.files[0].name
    },
    clear() {
      this.$refs.file.value = ''
      this.fileName = ''
    },
  },
  watch: {
    value(v) {
      if (!v) {
        this.clear()
      }
    },
  },
  render() {
    let hideName = this.showName === false
    return (
      <span>
        <Button icon="upload" onClick={() => this.$refs.file.click()}>
          {this.display || '浏览文件'}
        </Button>
        {!hideName && <div>{this.fileName}</div>}
        <input style="display:none" ref="file" onChange={this.c} type="file" />
      </span>
    )
  },
}
</script>
