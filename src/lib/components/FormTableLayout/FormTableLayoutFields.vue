<script>
import { Button, Col, Form, Row } from 'ant-design-vue'
import { TypeMap } from '../FormLayout/formType.js'
import { removeEmptyProp } from '../../utils'

const FormItem = Form.Item
export default {
  name: 'FormTableLayoutFields',
  props: {
    fields: Array,
    showLabel: Boolean,
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: Form.createForm(this),
    }
  },

  methods: {
    handleSearch(e) {
      e.preventDefault()
      const value = this.getFieldsValue()
      this.$emit('search', removeEmptyProp(value))
    },
    handleReset(e) {
      this.form.resetFields()
      const value = this.getFieldsValue()
      this.$emit('reset', removeEmptyProp(value))
    },
    /**
     * 处理字符输入前后空格，日期范围合并
     */
    getFieldsValue() {
      return this.form.getFieldsValue()
    },
    setFieldsValue(value) {
      this.form.setFieldsValue(value)
    },
    getDefaultValue(item) {
      // if (this.value[item.field]) return { initialValue: this.value[item.field] }
      if (item.defaultValue) return { initialValue: item.defaultValue }
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
                      v-decorator={[item.field, this.getDefaultValue(item)]}
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
