<script>
import { Button, Col, Form, message, Row } from 'ant-design-vue'
import { TypeMap } from '../FormLayout/formType.js'
import { removeEmptyProp } from '../../utils'

const FormItem = Form.Item
export default {
  name: 'FormTableLayoutFields',
  props: ['fields', 'showLabel'],
  data() {
    return {
      form: this.$form.createForm(this),
    }
  },
  watch: {
    fields(value) {
      if (value) {
        let fields = this.getValueWithDefault(value)
        this.form.setFieldsValue(fields)
        this.$emit('search', removeEmptyProp(fields))
      }
    },
  },
  methods: {
    getValueWithDefault(fields) {
      let value = {}
      fields.forEach((item) => {
        if ('defaultValue' in item) {
          value[item.field] = item.defaultValue
        }
      })
      return value
    },
    handleSearch(e) {
      e.preventDefault()
      const value = this.getFieldsValue()
      this.$emit('search', removeEmptyProp(value))
    },
    handleReset(e) {
      this.form.resetFields()
      this.handleSearch(e)
    },
    /**
     * 处理字符输入前后空格，日期范围合并
     */
    getFieldsValue() {
      let value = this.form.getFieldsValue()
      this.fields.forEach((item) => {
        if (item.required && !value[item.field]) {
          message.warning('请输入' + item.label)
          throw 'requred:' + item.field
        }
      })
      return value
    },
  },
  render() {
    let mFields = this.fields
    return (
      <Form onSubmit={this.handleSearch} class="page_data-form" layout="inline" form={this.form}>
        <Row class="wrapper">
          <Col class="form-inputs" span={20}>
            <Row>
              {mFields.map((item) => {
                const DynamicInput = TypeMap[item.type || 'input']

                return (
                  <FormItem
                    required={item.required}
                    colon={false}
                    class="form-item"
                    label={this.showLabel ? item.label : ''}
                  >
                    <DynamicInput
                      placeholder={item.placeholder || item.label}
                      props={item.props}
                      v-decorator={[item.field, item.defaultValue ? { initialValue: item.defaultValue } : void 0]}
                    />
                  </FormItem>
                )
              })}
            </Row>
          </Col>

          <Col class="form-actions" span={4}>
            {mFields.length > 0 && [
              <Button type="primary" style="margin-left:10px" icon={'search'} htmlType="submit">
                搜索
              </Button>,
              <Button style="margin-left:10px" icon="reload" onClick={this.handleReset}>
                清空
              </Button>,
            ]}
          </Col>
        </Row>
      </Form>
    )
  },
}
</script>
