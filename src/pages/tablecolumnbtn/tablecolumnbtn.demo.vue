<script>
import { TableColumnBtn } from 'aj-antd-components'
export default {
  render() {
    return (
      <div>
        <TableColumnBtn
          buttons={[
            { name: '操作1', click: () => {}, show: true },
            { name: '操作2', click: () => {}, show: false },
            { name: '操作3', click: () => {}, show: true },
            { name: '操作4', click: () => {}, show: true },
            { name: '操作5', click: () => {}, show: true },
          ]}
        />

        <TableColumnBtn
          type="inline"
          buttons={[
            { name: '操作1', click: () => {}, show: true },
            { name: '操作2', click: () => {}, show: true },
            { name: '操作3', click: () => {}, show: true },
            { name: '操作4', click: () => {}, show: true },
            { name: '操作5', click: () => {}, show: true },
          ]}
        />
      </div>
    )
  },
}
</script>
