<script>
import { FormTableLayoutSingle } from 'aj-antd-components'
export default {
  data() {
    return {
      query: {
        extra: 1,
      },
    }
  },
  render() {
    const actions = [
      { callback: () => {}, name: '操作1', type: 'primary', icon: 'plus', tab: 0 },
      { callback: () => {}, name: '操作2', type: 'primary', icon: 'download', tab: 1 },
      { callback: () => {}, name: '操作3', type: 'default', icon: 'search', tab: 2 },
      { callback: () => {}, name: '操作4', type: 'danger', icon: 'appstore' },
    ]
    const props = {
      namespace: 'formtablelayoutsingle',
      fields: [
        { label: '条件1', field: 'a', tab: 1 },
        { label: '条件2', field: 'abc', tab: 2 },
        { label: '状态3显示', field: 'stats3', tab: [2, 3] },
        {
          label: '下拉选',
          field: 'select',
          type: 'select',
          props: { handler: 'department' },
        },
      ],
      tabs: [
        { name: '状态1', field: 'status', value: 'y' },
        { name: '状态2', field: 'status', value: 'n' },
        { name: '状态3', field: 'status', value: 'o' },
      ],
      table: {
        url: '/getlist',
        columns: new Array(10).fill(0).map((item, i) => {
          return {
            dataIndex: i,
            // 可以指定在哪个tab中显示
            tab: i % 3,
            title: '列' + (i + 1),
          }
        }),
      },
    }
    return <FormTableLayoutSingle query={this.query} actions={actions} props={props} />
  },
}
</script>
