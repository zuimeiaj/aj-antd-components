<script>
import { DataCascader } from 'aj-antd-components'
import { Card } from 'ant-design-vue'

export default {
  data() {
    return {
      array: [],
      value: '',
    }
  },
  render() {
    return (
      <div>
        <Card title="返回路径的最后一个值">
          <DataCascader v-model={this.value} handler="department" />
        </Card>

        <Card title="返回值为 [value,label]">
          <DataCascader array={true} v-model={this.array} handler="department" />
        </Card>
      </div>
    )
  },
}
</script>
