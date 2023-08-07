<script>
import RichTextVue from '@/lib/components/RichText.vue'
import ComponentInterface from '@/lib/components/Interface'
export default {
  data() {
    return {
      value: '',
    }
  },
  created() {
    ComponentInterface.richtext = () => {
      return {
        customUploadImg: (files, insertFn) => {
          // 上传文件后，将完整的图片ulr传入到insertFn中
          insertFn('/test.webp')
        },
        fontNames: ['宋体', '微软雅黑', 'Arial', 'Tahoma', 'Verdana'],
      }
    }
  },
  render() {
    return (
      <div>
        <RichTextVue v-model={this.value} />
      </div>
    )
  },
}
</script>
