<script>
import { Tabs } from 'ant-design-vue'
import testTableVue from './pages/test-table.vue'
import testTableSingleVue from './pages/test-table-single.vue'
import rowSelectionVue from './pages/row-selection.vue'
import testDatepickerVue from './pages/test-datepicker.vue'
import testNumberstepVue from './pages/test-numberstep.vue'
import testCascaderVue from './pages/test-cascader.vue'
import testSelectVue from './pages/test-select.vue'
import testUploadVue from './pages/test-upload.vue'

export default {
  data() {
    return {
      tabs: [
        { name: 'Upload', component: testUploadVue },
        { name: 'Select', component: testSelectVue },
        { name: 'Tablelayout', component: testTableVue },
        { name: 'TablelayoutSingle', component: testTableSingleVue },
        { name: 'RowSelection', component: rowSelectionVue },
        { name: 'DatePicker', component: testDatepickerVue },
        { name: 'NumberStep', component: testNumberstepVue },
        { name: 'Cascader', component: testCascaderVue },
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
