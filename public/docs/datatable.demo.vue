<script>
import { DataTable } from 'aj-antd-components'

export default {
  render() {
    const columns = new Array(10).fill(0).map((item, index) => {
      return { title: '列' + index, dataIndex: index }
    })
    const requestParams = {}
    return (
      <div>
        params 变化时会重新请求接口,请求默认为post 方式
        <DataTable url="/getlist" columns={columns} param={requestParams} />
      </div>
    )
  },
}
</script>
