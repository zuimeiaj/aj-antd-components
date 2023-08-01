<script>
import { Table } from 'ant-design-vue'
export default {
  props: {
    title: String,
    description: String,
  },
  data() {
    return {
      columns: [
        { title: '属性', dataIndex: 'prop' },
        { title: '类型', dataIndex: 'type' },
        { title: '默认值', dataIndex: 'default' },
        { title: '描述', dataIndex: 'desc' },
      ],
    }
  },
  render() {
    return (
      <div class="common-component-props">
        <div class="props-title">{this.title}</div>
        <div class="props-desc">{this.description}</div>
        <div class="props-table">
          <Table size="small" columns={this.columns} dataSource={this.data} />
        </div>
      </div>
    )
  },
}
</script>
<style lang="less">
.common-component-props {
}
</style>
