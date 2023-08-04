<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import DatatableDemoVue from './datatable/datatable.demo.vue'
export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue title={'DataTable'} description={'使用外部数据源作为列表显示'} class="app-page gutter">
        <DatatableDemoVue />
        <CommonCodeHighlightVue path="datatable.demo.vue" />
        <CommonCodeHighlightVue title="Props" path="data-table.d.ts" />
      </CommonPageVue>
    )
  },
}
</script>
