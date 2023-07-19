<script>
import { Col, Form, Row } from 'ant-design-vue'
import FormItemWrapperVue from './FormItemWrapper.vue'
export default {
  name: 'FormLayout',
  props: {
    name: String,
    /** 渲染大列表时，需要设置为true，避免卡顿。此时需要使用单项数据流配合immutable数据结构来控制交互 **/
    performance: {
      type: Boolean,
      default: false,
    },
    /** 参考FormItem 的 labelCol */
    labelCol: {
      type: Object,
      default: () => ({ span: 6 }),
    },
    /** 参考FormItem 的 wrapperCol */
    wrapperCol: {
      type: Object,
      default: () => ({ span: 18 }),
    },
    /** 当表单输入项发生变化后执行回调 */
    // 如果返回一个对象，会进行一次form.setFieldsValue调用
    // function({value,field},formdata,extraData):object<{field:any}>
    valuesChange: {
      type: Function,
      default: null,
    },

    labelAlign: {
      type: String,
      default: 'right',
    },
    labelPosition: {
      type: String,
      default: 'top',
    },
    columns: {
      type: Array,
      default: () => [
        /**
         *
         *
         * columns数据结构，用于动态生成表单
         *
         * columns 无分组直接平铺
         * columns = [
         *  {
         *         field:string;
         *         label:string;
         *         initialValue?:any;
         *         rules?:array | function(formdata):array
         *         required?:boolean
         *         type?:string;// default input，通过FormLayout.registerForm(name,VueComponent)注册组件
         *         span?:number; // default 8
         *         props?:object  // 表单控件自有属性
         *         customRender(form,vm) 可以使用form.getFieldDecorator(field,options)进行包装，这样表单可以正常收集到值，但是无法触发的valueChange事件
         *  }
         * ]
         * columns 2层嵌套分组，适用于分组表单,title为分组表单标题
         * columns = [
         *  {
         *    title:string;
         *    columns:[
         *      {
         *         field:string;
         *         label:string;
         *         initialValue?:any;
         *         rules?:array | function(formdata):array
         *         required?:boolean
         *         type?:string;// default input
         *         span?:number; // default 8
         *         props?:object  // 表单控件自有属性
         *      }
         *    ]
         *  }
         * ]
         */
      ],
    },
  },

  data() {
    return {
      form: this.$form.createForm(this),
    }
  },
  provide() {
    return {
      form: () => {
        return this.form
      },
      getFormProps: () => {
        return this.$props
      },
    }
  },
  methods: {
    getFieldsValue() {
      return this.form.getFieldsValue()
    },
    resetFields() {
      this.form.resetFields()
    },
    handleChange({ value, item }, extraOption) {
      let fieldsValue = this.form.getFieldsValue()
      fieldsValue[item.field] = value
      if (typeof item.onChange === 'function') {
        let newFieldsValue = item.onChange(value, fieldsValue, this.form, extraOption)
        if (newFieldsValue) {
          this.form.setFieldsValue(newFieldsValue)
        }
      }
      if (typeof this.valuesChange === 'function') {
        const newFieldsValue = this.valuesChange(
          {
            field: item.field,
            value: value,
          },
          fieldsValue,
          extraOption
        )
        // 可以变更新
        if (newFieldsValue) this.form.setFieldsValue(newFieldsValue)
      }
      this.$emit('change', { field: item.field, value, form: fieldsValue }, extraOption)
    },
    setSubForm(formField, formRef) {
      this.subForms[formField] = formRef
    },
    removeSubForm(field) {
      this.subForms[field] = undefined
    },
    getSubForms() {
      return Object.values(this.subForms)
    },
    validateSubForms() {
      let forms = this.getSubForms()
      if (forms.length > 0) return Promise.all(forms.map((item) => item.validate()))
      return Promise.resolve()
    },
    submit() {
      this.form.validateFields((error, value) => {
        if (error) return

        this.validateSubForms().then(() => {
          this.$emit('submit', value)
        })
      })
    },
    validate(needScroll) {
      return new Promise((resolve, reject) => {
        const func = needScroll ? 'validateFieldsAndScroll' : 'validateFields'
        this.form[func]((error, value) => {
          if (error) return reject(error)
          this.validateSubForms()
            .then(() => resolve(value))
            .catch(reject)
        })
      })
    },
    // 对span进行按行拆分，满24 将包裹一个Row组件，确保每一行都是一个Row组件包裹，避免col高低不同造成布局错乱
    getRowColumns(formColumns) {
      const rows = []
      let columns = []
      let col = 0
      formColumns.forEach((item) => {
        let span = item.span || 12
        col = col + span
        if (col > 24) {
          rows.push(columns)
          col = span
          columns = []
        }
        columns.push(item)
      })
      if (columns.length > 0) {
        rows.push(columns)
      }
      return rows
    },
  },
  created() {
    this.subForms = {}
  },
  render() {
    const columns = this.getRowColumns(this.columns)
    const defaultGutter = 12
    const formData = this.form.getFieldsValue()
    // 由于将动态输入单独封装到wrapper.vue，所以这里显示隐藏控制需要提升到此才能生效
    const wrapperField = (item) => {
      if (item.show && !item.show(formData)) {
        return null
      }

      if (typeof item.customRender === 'function') {
        return item.customRender(this.form, this)
      }

      return (
        <FormItemWrapperVue form={this.form} parent={this} key={item.field} item={item} onChange={this.handleChange} />
      )
    }
    const renderColumns = (columns) => {
      return columns.map((item) => (
        <Row gutter={12}>
          {item.map((item) => {
            return item.columns ? renderGroup(item) : wrapperField(item)
          })}
        </Row>
      ))
    }
    const renderGroup = (item) => {
      if (item.show && !item.show(formData)) {
        return null
      }
      return (
        <Col span={item.span || 24}>
          <Row gutter={item.gutter || defaultGutter}>
            {item.title && (
              <Col span={24}>
                <h3 class="formlayout-title">{item.title}</h3>
              </Col>
            )}
          </Row>
          {renderColumns(this.getRowColumns(item.columns))}
        </Col>
      )
    }

    return (
      <Form
        name={this.name}
        class={`component-formlayout label-position-${this.labelPosition}`}
        selfUpdate={this.performance}
        onSubmit={this.submit}
        form={this.form}
      >
        {renderColumns(columns)}
        {this.$slots.default}
      </Form>
    )
  },
}
</script>
