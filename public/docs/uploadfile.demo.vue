<script>
import { UploadFile } from 'aj-antd-components'
import { Form } from 'ant-design-vue'
import CommonCodeHighlightVue from '../CommonCodeHighlight.vue'
export default {
  data() {
    return {
      form: Form.createForm(this),
    }
  },
  render() {
    let values = this.form.getFieldsValue()

    return (
      <Form form={this.form}>
        <CommonCodeHighlightVue value={JSON.stringify(values, null, 2)}></CommonCodeHighlightVue>
        <Form.Item label="dragger">
          <UploadFile layout="dragger" v-decorator={['dragger']} />
        </Form.Item>
        <Form.Item label="button(accept='.xlsx')">
          <UploadFile
            accept=".doc,.docx,.xlsx,.pptx,.xls,.ppt"
            layout="button"
            listType="text"
            iso={true}
            v-decorator={['button']}
          />
        </Form.Item>
        <Form.Item label="card">
          <UploadFile v-decorator={['card']} />
        </Form.Item>
        <Form.Item label="multiple">
          <UploadFile limit={20} v-decorator={['multiple']} />
        </Form.Item>
      </Form>
    )
  },
}
</script>
