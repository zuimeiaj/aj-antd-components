<script>
import { Tabs } from 'ant-design-vue'
import DataTable from '../DataTable.vue'
import FormTableLayoutFields from './FormTableLayoutFields.vue'
import FormTableLayoutActionsVue from './FormTableLayoutActions.vue'

// 该组件只有会有个table，每个tab都共享一个
// 该组件能更方便的控制在不同tab显示不同表格列，和查询条件
export default {
  name: 'FormTableLayoutSingle',
  props: {
    namespace: {
      type: String,
      default: '',
    },
    // 多页签，每个页签都共用一个表格
    tabs: {
      type: Array,
      default: function () {
        return []
      },
    },
    // 查询集合，在FieldType.js 中配置支持的查询组件
    fields: {
      type: Array,
      default: function () {
        return []
      },
    },
    // 单个table时，为components/DataTable组件的参数
    table: {
      type: Object,
      default: function () {
        return {} // from `DataTable` props
      },
    },
    // 展示到列表上方的操作按钮集合
    actions: {
      type: Array,
      default: function () {
        return []
      },
    },
    query: {
      // 额外的查询参数，会附带到请求中
      type: Object,
      default: function () {
        return {}
      },
    },
    hasAction: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      form: this.$form.create(this),
      search: {}, // 当前查询参数
      searchs: [], // 多页签表格时，数组中对应具体的表格的查询添加
      activeKey: '0', // 多页签默认显示第一个页签
    }
  },
  computed: {
    tabActions() {
      return this.actions.filter(this.matchTab)
    },
    tabFields() {
      return this.fields.filter(this.matchTab)
    },
    tabProps() {
      let columns = this.table.columns.filter(this.matchTab)
      return { ...this.table, columns }
    },
  },
  watch: {
    query(value) {
      this.search = { ...this.search, ...value }
      this.getSearchs()
    },
    activeKey(key) {
      this.getSearchs()
      this.$emit('tabChange', key, { ...this.search })
      this.refreshPageActions()
    },
  },

  methods: {
    matchTab(item) {
      return 'tab' in item
        ? Array.isArray(item.tab)
          ? item.tab.includes(+this.activeKey)
          : Number(item.tab) == Number(this.activeKey)
        : true
    },
    getSearchs() {
      if (this.tabs.length > 0) {
        let index = this.tabs.findIndex((_, i) => i == this.activeKey)
        let searchs = [...this.searchs]
        let tabSearchKey = this.tabs[index].field
        let tabSearchValue = this.tabs[index].value

        // 删除旧的请求参数
        this.tabs.forEach((item) => {
          delete this.search[item.field]
        })

        this.search[tabSearchKey] = tabSearchValue
        searchs[index] = { ...this.search }
        this.searchs = searchs
      }
    },

    handleSearch(value) {
      const search = { ...this.query, ...value }
      delete search._update // reload
      this.search = search
      this.getSearchs()
      this.$emit('search', { ...search })
    },

    getFieldsValue() {
      return this.$refs.filterForm?.getFieldsValue() || {}
    },

    handleAction(callback) {
      const { filterForm, table } = this.$refs
      callback(filterForm, table)
    },

    getDefaultValue() {
      const value = {}
      ;(this.fields || []).forEach((item) => {
        if (item.defaultValue) {
          value[item.field] = item.defaultValue
        }
      })
      return value
    },
    /**
     * 刷新当前表格页面
     */
    refresh() {
      this.search = Object.assign({}, this.query, this.search, {
        _update: true,
      })
      this.getSearchs()
    },
    refreshPageActions() {
      if (!this.hasAction) return
      this.$store.commit('user/setPageAction', { payload: this.tabActions })
    },
  },
  activated() {
    this.refreshPageActions()
  },
  created() {
    if (this.namespace) {
      this.$store.commit({
        type: 'menu/setNamespaceByPagePath',
        payload: { namespace: this.namespace, path: this.$route.path },
      })
      this.$eventbus.$off(this.namespace, this.refresh)
      this.$eventbus.$on(this.namespace, this.refresh)
    }

    this.search = {
      ...this.getDefaultValue(),
      ...this.query,
    }
    if (this.tabs.length > 0) {
      this.search[this.tabs[0].field] = this.tabs[0].value
    }

    this.refreshPageActions(this.activeKey)
    this.getSearchs()
  },
  beforeDestroy() {
    this.$eventbus.$off(this.namespace, this.refresh)
  },
  render() {
    const { $slots } = this
    return (
      <div class="form-table-layout-signle">
        {this.tabFields.length > 0 && (
          <div class="app-card-item gutter-bottom">
            <FormTableLayoutFields ref="filterForm" onSearch={this.handleSearch} fields={this.tabFields} />
          </div>
        )}
        {this.tabs.length > 0 && (
          <Tabs
            v-model={this.activeKey}
            type="card"
            animated={false}
            tabBarExtraContent={!this.hasAction && <FormTableLayoutActionsVue actions={this.tabActions} />}
          >
            {this.tabs.map((item, index) => {
              return <Tabs.TabPane key={String(index)} tab={item.name} />
            })}
          </Tabs>
        )}

        <div class="app-card-item multiple-table">
          <DataTable ref="table" params={this.searchs[this.activeKey]} props={this.tabProps} />
          <div>{$slots.default}</div>
        </div>
      </div>
    )
  },
}
</script>
