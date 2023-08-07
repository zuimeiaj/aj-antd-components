<script>
import { DateRangeFormatPicker } from 'aj-antd-components'
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

    return (
      <Form form={this.form}>
        <CommonCodeHighlightVue value={JSON.stringify(values, null, 2)}></CommonCodeHighlightVue>
        <Form.Item label="date">
          <DateRangeFormatPicker v-decorator={['value1']} />
        </Form.Item>
        <Form.Item label="isostring">
          <DateRangeFormatPicker iso={true} v-decorator={['iso']} />
        </Form.Item>
        <Form.Item label="datetime">
          <DateRangeFormatPicker showTime={true} hasHours={true} v-decorator={['datetime']} />
        </Form.Item>
        <Form.Item label="format">
          <DateRangeFormatPicker format="YYYY年MM月DD日" v-decorator={['format']} />
        </Form.Item>
      </Form>
    )
  },
}
</script>
