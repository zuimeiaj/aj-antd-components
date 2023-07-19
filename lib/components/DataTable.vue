<script>
import { Table } from 'ant-design-vue'
import windowResize from '../mixins/window-resize'
import ComponentInterface from './Interface'
const DataTableIns = {}

export default {
  name: 'DataTable',
  mixins: [windowResize],
  props: {
    scroll: Object,
    rowSelection: Object,
    columns: {
      type: Array,
      default: () => [],
    },
    bordered: {
      type: Boolean,
      default: false,
    },
    defaultExpandAllRows: {
      type: Boolean,
      default: false,
    },
    rowKey: {
      type: [String, Function],
      default: 'id',
    },
    url: String,
    params: {
      type: Object,
      default: () => ({}),
    }, // 请求参数
    method: {
      type: String,
      default: 'post', // post | get
    },
    // (responseData,tableInstances)=> tableData
    updateBefore: Function,
    // (sendParams)=> boolean | sendParams
    fetchBefore: Function,
    // 分页控件是否固定在底部
    pageFixed: {
      type: Boolean,
      default: false,
    },
    name: String, // 给定一个table的唯一名称，可以通过DataTable.get(name)获取实例
  },
  data() {
    return {
      data: [],
      total: 0,
      loading: false,
      send: { ...ComponentInterface.table.page, ...this.$props.params },
      scrollOption1: {},
    }
  },
  computed: {
    scrollOption() {
      return { ...(this.scroll || {}), ...this.scrollOption1 }
    },
  },
  watch: {
    params(value) {
      const { limit, orderBy } = this.send
      this.send = { ...(value || {}), limit, page: value._update ? this.send.page : 1, orderBy }
      this.update()
    },
  },
  methods: {
    onWindowResize() {
      this.setScrollOption()
    },
    setScrollOption() {
      if (!this.pageFixed) {
        this.scrollOption1 = {}
        return
      }
      let tableElement = this.$refs.table?.$el
      if (!tableElement) {
        this.scrollOption1 = {}
        return
      }
      let rect = tableElement.getBoundingClientRect()
      let height = window.innerHeight - rect.top - (this.total > this.send.limit ? 100 : 50)
      this.scrollOption1 = { y: height }
    },
    // 统一清除字段前后空格
    filterFieldsValue(value) {
      let send = {}
      for (let key in value) {
        const item = value[key]
        if (typeof item === 'string') {
          send[key] = item.toString().trim()
        } else {
          send[key] = item
        }
      }
      return send
    },
    // 重新初始分页为，重新加载表格
    reload() {
      this.send = Object.assign({ ...(this.params || {}), page: 1, limit: this.send.limit })
      this.update()
    },
    async update() {
      // 自定义请求前操作，返回false可以阻止请求。例如可用用来判断某些参数是否合法
      if (this.fetchBefore) {
        let next = this.fetchBefore(this.send)
        if (next === false) return
        this.send = next
      }
      // 内部统一处理请求参数，目前只有过滤前后空格
      let send = this.filterFieldsValue({ ...this.send })
      let res
      this.loading = true

      try {
        if (this.method === 'get') {
          res = await ComponentInterface.table.get(this.url, { params: send })
        } else {
          res = await ComponentInterface.table.post(this.url, send)
        }
      } catch (e) {
        console.error('[DataTable:]', e)
        this.loading = false
        return
      }
      this.loading = false
      let updateBefore = this.updateBefore

      // 分页清空下，data的数据结构为{list:[],total:0} ,不分页情况下，data可以直接为数组
      let data = res.data?.list || res.data || []

      // 自定义处理响应数据
      data = updateBefore ? await updateBefore(res, this) : data
      // total 字段，不分页情况下直接取数组长度
      this.total = res.data?.totalCount || data.length || 0
      // 设置分页
      this.pagination = {
        ...this.pagination,
        total: this.total,
        current: this.send.page,
      }
      this.data = data
      this.setScrollOption()
    },
    handleChange({ pageSize, current }, filter, sorter) {
      if (sorter.columnKey) {
        // 对排序字段的设置规则为[field: "value asc|desc"]
        this.send.orderBy = ComponentInterface.table.orderBy(sorter)
      } else {
        this.send.orderBy = undefined
      }
      this.send.limit = pageSize
      this.send.page = current
      this.pagination = { ...this.pagination, pageSize }
      this.update()
    },
    showTotal(value) {
      return `共搜索到${value}条记录`
    },
  },
  activated() {
    this.setScrollOption()
  },
  created() {
    if (this.name) {
      DataTableIns[this.name] = this
    }
    // 加载数据
    this.update()
    this.pagination = {
      pageSize: this.send.limit,
      size: 'small',
      total: this.total,
      showSizeChanger: true,
      showQuickJumper: true,
      hideOnSinglePage: true,
      showTotal: this.showTotal,
    }
  },
  get(name) {
    return DataTableIns[name]
  },
  beforeDestroy() {
    // 销毁实例
    if (this.name) DataTableIns[this.name] = undefined
  },
  render() {
    return (
      <Table
        ref="table"
        bordered={this.bordered}
        loading={this.loading}
        pagination={this.pagination}
        rowSelection={this.rowSelection}
        rowKey={this.rowKey}
        scroll={this.scrollOption}
        defaultExpandAllRows={this.defaultExpandAllRows}
        size="middle"
        onChange={this.handleChange}
        dataSource={this.data}
        columns={this.columns}
      />
    )
  },
}
</script>
