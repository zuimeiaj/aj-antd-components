<script>
import { NumberStepInput } from 'aj-antd-components'
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
        <Form.Item label="number-step">
          <NumberStepInput max={1000000} min={0} v-decorator={['value1']} />
        </Form.Item>
      </Form>
    )
  },
}
</script>
