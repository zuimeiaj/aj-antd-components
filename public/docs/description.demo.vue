<script>
import { Description } from 'aj-antd-components'
export default {
  render() {
    const columns = (span) => [
      { span, label: '字段1', field: '0', show: () => false },
      { span, label: '枚举映射', field: '1', enum: 'demo_enum' },
      { span, label: '字段1', field: '2', type: 'number', suffix: '元' },
      { span, label: '字段1', field: 'date', type: 'datetime' },

      { span, label: '对象嵌套', field: '3.obj' },
      { span, label: '自定义渲染函数', field: '4', customRender: (value, dataSource) => [value, dataSource['1']] },
    ]

    const data = {
      0: '描述1',
      1: 'a',
      2: 10000021,
      3: {
        obj: '嵌套对象',
      },
      date: new Date(),
      4: 'cus',
    }
    return (
      <div>
        <h3>Span 24</h3>
        <Description bordered={false} columns={columns(24)} dataSource={data} />
        <h3>Span 12</h3>
        <Description bordered={false} columns={columns(12)} dataSource={data} />
      </div>
    )
  },
}
</script>
