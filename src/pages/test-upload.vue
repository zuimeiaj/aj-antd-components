<script>
import UploadFileVue from '@/lib/components/UploadFile.vue'
import ComponentInterface from '@/lib/components/Interface'
export default {
  data() {
    return {
      value: '',
    }
  },
  created() {
    ComponentInterface.upload.getImageUrl = () => {
      return process.env.BASE_URL + 'test.webp'
    }

    ComponentInterface.upload.uploadFile = () => {
      return Promise.resolve('/test.webp')
    }
  },
  render() {
    return (
      <div>
        <UploadFileVue v-model={this.value} />
      </div>
    )
  },
}
</script>
