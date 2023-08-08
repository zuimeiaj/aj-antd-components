<script>
import { DataSelect } from 'aj-antd-components'
import { Card, Form } from 'ant-design-vue'
export default {
  data() {
    return {
      data: [],
      array: [],
      normal: '',
      form: Form.createForm(this),
      dataSource: [
        { label: 'label1', value: 1 },
        { label: 'label2', value: 2 },
        { label: 'label3', value: 3 },
      ],
    }
  },
  render() {
    return (
      <Form form={this.form}>
        <Card title="dataSource">
          <Form.Item label="datasource">
            <DataSelect v-decorator={['datasource']} dataSource={this.dataSource} />
          </Form.Item>

          <Form.Item label="displayStyle=checkbox">
            <DataSelect displayStyle="checkbox" v-decorator={['datasource1']} dataSource={this.dataSource} />
          </Form.Item>
          <Form.Item label="displayStyle=radio">
            <DataSelect displayStyle="radio" v-decorator={['datasource2']} dataSource={this.dataSource} />
          </Form.Item>
        </Card>

        <Card title="handler">
          <Form.Item label="handler">
            <DataSelect v-decorator={['handler1']} handler="department" />
          </Form.Item>

          <Form.Item label="displayStyle=checkbox">
            <DataSelect displayStyle="checkbox" v-decorator={['handler2']} handler="department" />
          </Form.Item>
          <Form.Item label="displayStyle=radio">
            <DataSelect displayStyle="radio" v-decorator={['handler3']} handler="department" />
          </Form.Item>
        </Card>
        <Card title="store">
          <Form.Item label="store">
            <DataSelect v-decorator={['store1']} enum="demo_enum" />
          </Form.Item>

          <Form.Item label="displayStyle=checkbox">
            <DataSelect displayStyle="checkbox" v-decorator={['store2']} enum="demo_enum" />
          </Form.Item>
          <Form.Item label="displayStyle=radio">
            <DataSelect displayStyle="radio" v-decorator={['store3']} enum="demo_enum" />
          </Form.Item>
        </Card>

        <Card title="select multiple">
          <Form.Item label="multiple">
            <DataSelect params={{ mode: 'multiple' }} v-decorator={['multiple1']} enum="demo_enum" />
          </Form.Item>
        </Card>

        <Card title="值输出类型(默认)">
          <Form.Item label="仅value">
            <DataSelect v-decorator={['valueOnly']} />
          </Form.Item>
          <Form.Item label="[value,label]" extra={this.form.getFieldValue('valueLable')?.join(',')}>
            <DataSelect result="array" v-decorator={['valueLable']} enum="demo_enum" />
          </Form.Item>

          <Form.Item label="[value,label]" extra={this.form.getFieldValue('valueLable2')?.join('  ')}>
            <DataSelect params={{ mode: 'multiple' }} result="array" v-decorator={['valueLable2']} enum="demo_enum" />
          </Form.Item>
        </Card>
      </Form>
    )
  },
}
</script>
