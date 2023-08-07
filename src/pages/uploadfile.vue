<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import UploadfileDemoVue from './uploadfile/uploadfile.demo.vue'
export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue title="UploadFile" description="上传文件" class="app-page gutter">
        <UploadfileDemoVue />
        <CommonCodeHighlightVue path="uploadfile.demo.vue" />
        <CommonCodeHighlightVue title="Props" path="upload-file.d.ts" />
      </CommonPageVue>
    )
  },
}
</script>
