<script>
import { Col, Form } from 'ant-design-vue'
import { TypeMap } from './formType.js'
export default {
  props: {
    form: Object,
    parent: Object,
    item: {
      type: Object,
      default: () => ({
        type: 'input',
      }),
    },
  },
  methods: {
    getFormProps() {
      return this.parent.$props
    },
    formData() {
      return this.form.getFieldsValue()
    },
    handleChagne(value, extraOption) {
      if (value instanceof Event) {
        value = value.target.value
      }
      this.$emit(
        'change',
        {
          field: this.item.field,
          value,
          item: this.item,
        },
        extraOption
      )
    },
    getDecoratorOption() {
      let item = this.item
      const options = {}
      if (item.initialValue) {
        options.initialValue = item.initialValue
      }

      if (typeof item.required == 'function' ? item.required(this.formData()) : item.required) {
        options.rules = [{ required: true, message: item.label + '必填' }]
      } else if (typeof item.rules === 'function') {
        options.rules = item.rules(this.formData())
      } else if (Array.isArray(item.rules)) {
        options.rules = item.rules
      }
      // 校验字段的事件名称
      if (item.trigger) options.trigger = item.trigger
      if (item.valuePropName) options.valuePropName = item.valuePropName

      return [item.field, options]
    },
    getLabel(label) {
      return typeof this.item.label === 'function' ? this.item.label(this.formData()) : label
    },
    getExtra(extra) {
      return typeof this.item.extra === 'function' ? this.item.extra(this.formData()) : extra
    },
    getWrapperCol(wrapperCol) {
      return this.getDefaultCell() || this.getFormProps().wrapperCol || wrapperCol
    },
    getLabelCol(labelCol) {
      return this.getDefaultCell() || this.getFormProps().labelCol || labelCol
    },
    getDefaultCell() {
      let props = this.getFormProps()
      if (props.labelPosition === 'top') {
        return { span: 24 }
      }
    },
  },

  mounted() {
    if (this.item.type == 'arrayList') {
      this.parent.setSubForm(this.item.field, this.$refs.formItem)
    }
  },
  beforeDestroy() {
    if (this.item.type == 'arrayList') this.parent.removeSubForm(this.item.field)
  },
  render() {
    const { wrapperCol, labelCol, extra, span, label, type = 'input', show, props } = this.item
    const FormComponent = TypeMap[type]
    // 判断是否显示隐藏
    if (show && show(this.formData()) === false) return null
    return (
      <Col class={`formlayout-item formlayout-item-wrapper-` + this.item.field} span={span || 12}>
        <Form.Item
          labelCol={this.getLabelCol(labelCol)}
          wrapperCol={this.getWrapperCol(wrapperCol)}
          extra={this.getExtra(extra)}
          label={this.getLabel(label)}
        >
          <FormComponent
            ref="formItem"
            class={'formlayout-item-' + this.item.field}
            v-decorator={this.getDecoratorOption()}
            onChange={this.handleChagne}
            formField={this.item.field}
            props={props}
          />
        </Form.Item>
      </Col>
    )
  },
}
</script>
