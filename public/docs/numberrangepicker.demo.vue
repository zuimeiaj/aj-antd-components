<script>
import { NumberRangePicker } from 'aj-antd-components'
import { Form } from 'ant-design-vue'
import CommonCodeHighlightVue from '../CommonCodeHighlight.vue'
export default {
  data() {
    return {
      value: '',
      form: Form.createForm(this),
    }
  },
  render() {
    let values = this.form.getFieldsValue()
    console.log(values)
    return (
      <Form form={this.form}>
        <CommonCodeHighlightVue value={JSON.stringify(values, null, 2)}></CommonCodeHighlightVue>
        <Form.Item label="number-range" extra="数组格式为数组 [start,end]">
          <NumberRangePicker v-decorator={['value1']} />
        </Form.Item>
      </Form>
    )
  },
}
</script>
