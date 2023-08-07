<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import TablecolumnbtnDemoVue from './tablecolumnbtn/tablecolumnbtn.demo.vue'
export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue title="TableColumnBtn" description="下拉按钮集合，用于Table操作列" class="app-page gutter">
        <TablecolumnbtnDemoVue />
        <CommonCodeHighlightVue path="tablecolumnbtn.demo.vue" />
        <CommonCodeHighlightVue title="Props" path="table-column-btns.d.ts" />
      </CommonPageVue>
    )
  },
}
</script>
