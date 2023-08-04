<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import DatacascaderDemoVue from './datacascader/datacascader.demo.vue'
export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue title="DataCascader" description={'外部数据源作为下拉选项'} class="app-page gutter">
        <DatacascaderDemoVue />
        <CommonCodeHighlightVue path="datacascader.demo.vue" />
        <CommonCodeHighlightVue title="Props" path="data-cascader.d.ts" />
      </CommonPageVue>
    )
  },
}
</script>
