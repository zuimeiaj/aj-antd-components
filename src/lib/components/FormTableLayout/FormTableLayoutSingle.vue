<script>
import { Tabs } from 'ant-design-vue'
import DataTable from '../DataTable.vue'
import FormTableLayoutFields from './FormTableLayoutFields.vue'
import FormTableLayoutActionsVue from './FormTableLayoutActions.vue'
import commonTable from './common-table'

// 该组件只有会有个table，每个tab都共享一个
// 该组件能更方便的控制在不同tab显示不同表格列，和查询条件
export default {
  name: 'FormTableLayoutSingle',
  mixins: [commonTable],
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    tabProps() {
      let columns = this.table.columns.filter(this.matchTab)
      return { ...this.table, columns }
    },
  },
  methods: {
    getTables() {
      return this.tabs
    },
  },
  render() {
    const { $slots } = this
    return (
      <div class="form-table-layout-signle">
        {this.tabFields.length > 0 && (
          <div class="app-card-item gutter-bottom">
            <FormTableLayoutFields
              ref="filterForm"
              onReset={this.handleReset}
              onSearch={this.handleSearch}
              fields={this.tabFields}
            />
          </div>
        )}
        {this.tabs.length > 0 && (
          <Tabs
            v-model={this.activeKey}
            type="card"
            animated={false}
            tabBarExtraContent={<FormTableLayoutActionsVue actions={this.tabActions} />}
          >
            {this.tabs.map((item, index) => {
              return <Tabs.TabPane key={String(index)} tab={item.name} />
            })}
          </Tabs>
        )}

        <div class="app-card-item multiple-table">
          <DataTable ref="table" params={this.tabValues} props={this.tabProps} />
          <div>{$slots.default}</div>
        </div>
      </div>
    )
  },
}
</script>
