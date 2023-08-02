<script>
import { Tabs } from 'ant-design-vue'
import testTableVue from './pages/test-table.vue'
import testTableSingleVue from './pages/test-table-single.vue'
import rowSelectionVue from './pages/row-selection.vue'

export default {
  data() {
    return {
      tabs: [
        { name: 'Tablelayout', component: testTableVue },
        { name: 'TablelayoutSingle', component: testTableSingleVue },
        { name: 'RowSelection', component: rowSelectionVue },
      ],
    }
  },
  render() {
    return (
      <div class="app-container">
        <Tabs tabPosition="left">
          {this.tabs.map((item) => {
            return (
              <Tabs.TabPane tab={item.name} key={item.name}>
                <item.component />
              </Tabs.TabPane>
            )
          })}
        </Tabs>
      </div>
    )
  },
}
</script>
<style lang="less">
.app-container {
  padding: 50px;
}
</style>
