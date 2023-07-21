<script>
import { Tabs } from 'ant-design-vue'
import DataTable from '../DataTable.vue'
import FormTableLayoutFields from './FormTableLayoutFields.vue'
import FormTableLayoutActionsVue from './FormTableLayoutActions.vue'

export default {
  name: 'FormTableLayout',
  props: {
    namespace: String, // 唯一标识，用于触发表格更新
    tables: {
      type: Array,
      default: function () {
        return []
      },
    },
    fields: {
      type: Array,
      default: function () {
        return []
      },
    },
    table: {
      type: Object,
      default: function () {
        return {} // from `DataTable` props
      },
    },
    actions: {
      type: Array,
      default: function () {
        return []
      },
    },
    query: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  data() {
    return {
      search: {},
      searchs: [],
      activeKey: '0',
    }
  },
  computed: {
    tabActions() {
      return this.actions.filter(this.matchTab)
    },
    tabFields() {
      return this.fields.filter(this.matchTab)
    },
  },
  watch: {
    query(value) {
      this.search = { ...this.search, ...value }
      this.getSearchs()
    },
    activeKey(key) {
      let item = this.tables.find((item, i) => i == key)
      let search = { ...this.search }
      this.tables.forEach((item) => {
        delete search[item.field]
      })
      search[item.field] = item.value
      this.search = search
      this.getSearchs()
      this.$emit('tabChange', key, search)
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
      if (this.tables.length > 0) {
        let index = this.tables.findIndex((item, i) => i == this.activeKey)
        let searchs = [...this.searchs]
        this.search[this.tables[index].field] = this.tables[index].value
        searchs[index] = this.search
        this.searchs = searchs

        let s1 = { ...this.search }
        this.tables.forEach((item) => {
          delete s1[item.field]
        })
      }
    },

    handleSearch(value) {
      const search = { ...this.query, ...value }
      this.search = search
      this.getSearchs()
      this.$emit('search', { ...search })
    },
    handleRefresh() {
      this.search = { ...this.query, ...this.search }
      this.getSearchs()
    },
    handleAction(callback) {
      const { filterForm, ...rest } = this.$refs
      callback(filterForm, rest)
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
  },
  created() {
    // 可以通过 this.$eventbus.$emit(namespace)来触发table更新
    if (this.namespace) {
      this.$eventbus.$off(this.namespace, this.handleRefresh)
      this.$eventbus.$on(this.namespace, this.handleRefresh)
    }

    this.search = {
      ...this.getDefaultValue(),
      ...this.query,
    }
    if (this.tables.length > 0) {
      this.search[this.tables[0].field] = this.tables[0].value
    }
    this.getSearchs()
  },
  beforeDestroy() {
    if (this.namespace) {
      this.$eventbus.$off(this.namespace, this.handleRefresh)
    }
  },
  render() {
    const { table, fields, $slots, search } = this

    return (
      <div class="form-table-layout">
        {this.fields.length > 0 && (
          <div class="app-card-item">
            <FormTableLayoutFields ref="filterForm" onSearch={this.handleSearch} fields={fields} />
          </div>
        )}

        <div class="app-card-item multiple-table">
          {this.tables.length > 0 ? (
            <Tabs
              tabBarExtraContent={<FormTableLayoutActionsVue actions={this.tabActions} />}
              v-model={this.activeKey}
              type="card"
              animated={false}
            >
              {this.tables.map((item, index) => {
                return (
                  <Tabs.TabPane key={String(index)} tab={item.name}>
                    <div class={item.className}>
                      <DataTable ref={'table' + index} props={item.table} params={this.searchs[index]} />
                      {this.$slots['tab-' + index]}
                    </div>
                  </Tabs.TabPane>
                )
              })}
            </Tabs>
          ) : (
            <div>
              <FormTableLayoutActionsVue actions={this.tabActions} />
              <DataTable ref="table" props={table} params={search} />
            </div>
          )}
          <div>{$slots.default}</div>
        </div>
      </div>
    )
  },
}
</script>
