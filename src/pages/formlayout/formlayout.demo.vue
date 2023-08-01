<script>
import { CommonUtils, DebounceInput, FormLayout, LoadingButton, ValidatorUtil } from 'aj-antd-components'
import { Checkbox, Radio, Form, Row, Col, Card } from 'ant-design-vue'
export default {
  data() {
    return {
      values: '',
    }
  },
  methods: {
    async submit() {
      const values = await this.$refs.layout.validate()
      this.values = values
    },
    reset() {
      this.$refs.layout.resetFields()
      this.values = ''
    },
  },
  created() {
    FormLayout.registerFormComponent('checkboxGroup', Checkbox.Group)
    FormLayout.registerFormComponent('radioGroup', Radio.Group)
  },
  render() {
    const columns = [
      {
        title: '基础组件',
        columns: [
          { span: 8, label: '下拉选(接口数据源)', field: 'select', type: 'select', props: { handler: 'department' } },
          { span: 8, label: '级联(接口数据源)', field: 'cascader', type: 'cascader', props: { handler: 'department' } },
          {
            span: 8,
            label: '下拉多选（从store中获取）',
            field: 'enum',
            type: 'dictionary',
            extra: '从store.getters.dictionaries.demo_enum_array获取',
            props: {
              code: 'demo_enum',
              mode: 'multiple',
            },
          },
          {
            span: 8,
            label: '单选（从store中获取）',
            field: 'enum2',
            type: 'dictionary',
            extra: '从store.getters.dictionaries.demo_enum_array获取',
            props: {
              code: 'demo_enum',
              displayStyle: 'radio',
            },
          },
          {
            span: 8,
            label: '手机号',
            field: 'phone',
            type: 'input',
            props: {
              showLimit: true,
              maxlength: 11,
              decimal: 0,
              type: 'number',
            },
          },
          {
            span: 8,
            label: '控制输入值',
            field: 'name',
            extra: '提示：使用required:true,验证必填',
            onChange: (value) => {
              return {
                rules: value,
              }
            },
            required: true,
          },
          {
            span: 8,
            label: '数字',
            field: 'rules',
            extra: '提示：使用rules自定义验证',
            rules: [{ required: true, message: '请输入' }, ValidatorUtil.NumberReg],
          },
          {
            span: 8,
            label: '控制显示隐藏',
            field: 'dy2',
            type: 'dictionary',
            props: {
              code: 'yes_no',
            },
          },
          { span: 8, label: '动态显示/隐藏', field: 'dy1', show: ({ dy2 }) => (dy2 ? dy2 == 2 : true) },
          { type: 'textarea', field: 'textarea', label: 'Textarea', span: 24 },
        ],
      },
      {
        title: '日期',
        columns: [
          { label: '日期', field: 'da1', span: 8, type: 'date' },
          { label: '日期范围', field: 'da2', span: 8, type: 'range' },
          { label: '月份', field: 'da3', span: 8, type: 'month' },
          { label: '时间', field: 'da4', span: 8, type: 'time' },
        ],
      },
      {
        title: '分组-数组',
        columns: [
          {
            label: '动态数组子加减',
            field: 'array',
            type: 'arrayList',
            span: 24,
            props: {
              list: (data = {}) => [
                { initialValue: data.name, label: '姓名', field: 'name', span: 8, required: true },
                { initialValue: data.phone, label: '手机号', field: 'phone', span: 8, required: true },
                { initialValue: data.sex, label: '性别', field: 'sex', span: 8 },
              ],
            },
          },
        ],
      },
      {
        title: '分组-对象',
        columns: [
          { label: '姓名', field: 'obj.nmae', span: 8 },
          { label: '手机号', field: 'obj.phone', span: 8 },
          { label: '性别', field: 'obj.sex', span: 8 },
        ],
      },
      {
        title: '自定义注册表单组件(FormLayout.registerFormComponent(name,component))',
        columns: [
          {
            label: 'Antd CheckboxGroup',
            field: 'group1',
            type: 'checkboxGroup',
            span: 10,
            props: {
              options: [
                { label: '选1', value: '1' },
                { label: '选2', value: '2' },
                { label: '选3', value: '3' },
                { label: '选4', value: '4' },
                { label: '选5', value: '5' },
              ],
            },
          },
          {
            label: 'Antd RadioGroup',
            field: 'group12',
            type: 'radioGroup',
            span: 10,
            props: {
              options: [
                { label: '选1', value: '1' },
                { label: '选2', value: '2' },
                { label: '选3', value: '3' },
                { label: '选4', value: '4' },
                { label: '选5', value: '5' },
              ],
            },
          },
        ],
      },
      {
        title: '自定义渲染(customRender(form):VNode)',
        columns: [
          {
            customRender: (form) => {
              return (
                <Card bordered={true}>
                  <Row gutter={12}>
                    <Col span={8}>
                      <Form.Item label="姓名">
                        {form.getFieldDecorator('custom.name', CommonUtils.requiredMsg('请输入'))(<DebounceInput />)}
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="手机号">
                        {form.getFieldDecorator('custom.phone', CommonUtils.requiredMsg('请输入'))(<DebounceInput />)}
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="性别">
                        {form.getFieldDecorator('custom.sex', CommonUtils.requiredMsg('请输入'))(<DebounceInput />)}
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              )
            },
          },
        ],
      },
    ]
    return (
      <div>
        <div>
          <FormLayout ref="layout" columns={columns}>
            <div class="gutter-v">
              <LoadingButton click={this.submit}>提交表单</LoadingButton>
              <LoadingButton style="margin-left:20px" click={this.reset}>
                重置表单
              </LoadingButton>
            </div>
          </FormLayout>
        </div>
      </div>
    )
  },
}
</script>
