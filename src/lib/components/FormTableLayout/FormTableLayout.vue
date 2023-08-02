<script>
import { Tabs } from 'ant-design-vue'
import DataTable from '../DataTable.vue'
import FormTableLayoutFields from './FormTableLayoutFields.vue'
import FormTableLayoutActionsVue from './FormTableLayoutActions.vue'
import commonTable from './common-table'

export default {
  name: 'FormTableLayout',
  mixins: [commonTable],
  props: {
    tables: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getTables() {
      return this.tables
    },
  },
  render() {
    const { table, $slots, searchValues } = this
    return (
      <div class="form-table-layout">
        {this.tabFields.length > 0 && (
          <div class="app-card-item">
            <FormTableLayoutFields
              ref="filterForm"
              onReset={this.handleReset}
              onSearch={this.handleSearch}
              fields={this.tabFields}
            />
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
                      <DataTable ref={'table' + index} props={item.table} params={searchValues[index]} />
                      {this.$slots['tab-' + index]}
                    </div>
                  </Tabs.TabPane>
                )
              })}
            </Tabs>
          ) : (
            <div>
              <FormTableLayoutActionsVue actions={this.tabActions} />
              <DataTable ref="table" props={table} params={this.tabValues} />
            </div>
          )}
          <div>{$slots.default}</div>
        </div>
      </div>
    )
  },
}
</script>
