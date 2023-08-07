<script>
import { DateFormatPicker } from 'aj-antd-components'
import { Form } from 'ant-design-vue'
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
        <div>{JSON.stringify(values)}</div>
        <Form.Item label="date">
          <DateFormatPicker v-decorator={['value1']} />
        </Form.Item>
        <Form.Item label="isostring">
          <DateFormatPicker iso={true} v-decorator={['iso']} />
        </Form.Item>
        <Form.Item label="datetime">
          <DateFormatPicker showTime={true} hasHours={true} v-decorator={['datetime']} />
        </Form.Item>
        <Form.Item label="format">
          <DateFormatPicker format="YYYY年MM月DD日" v-decorator={['format']} />
        </Form.Item>
      </Form>
    )
  },
}
</script>
