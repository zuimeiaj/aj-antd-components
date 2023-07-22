<script>
import { FormTableLayout } from 'aj-antd-components'
import CommonPageVue from './CommonPage.vue'
export default {
  data() {
    return {}
  },
  render() {
    const table = () => {
      return {
        url: '/getlist',
        columns: new Array(10).fill(0).map((item, i) => {
          return {
            dataIndex: i,
            title: '列' + (i + 1),
          }
        }),
      }
    }
    const actions = [
      { callback: () => {}, name: '操作1', type: 'primary', icon: 'plus' },
      { callback: () => {}, name: '操作2', type: 'primary', icon: 'download' },
      { callback: () => {}, name: '操作3', type: 'default', icon: 'search' },
      { callback: () => {}, name: '操作4', type: 'danger', icon: 'appstore' },
    ]
    const props = {
      namespace: 'formtablelayout',
      fields: [
        { label: '条件1', field: 'a' },
        { label: '条件2', field: 'abc' },
      ],
      tables: [
        { name: '状态1', field: 'status', value: 'y', table: table() },
        { name: '状态2', field: 'status', value: 'n', table: table() },
        { name: '状态3', field: 'status', value: 'o', table: table() },
      ],
    }
    return (
      <CommonPageVue title="FormTableLayout" description="搜索表单，操作按钮列，状态tabs显示，分页列表的组件">
        <FormTableLayout actions={actions} props={props} />
      </CommonPageVue>
    )
  },
}
</script>
