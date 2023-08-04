<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import TablelayoutDemoVue from './tablelayout/tablelayout.demo.vue'
export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue
        title="FormTableLayout"
        description="搜索表单，操作按钮列，状态tabs显示，分页列表的组件，每一个tab都是一个独立的table组件"
      >
        <TablelayoutDemoVue />
        <CommonCodeHighlightVue path="tablelayout.demo.vue" />
        <CommonCodeHighlightVue title="Props" path="formtable-layout.d.ts" />
      </CommonPageVue>
    )
  },
}
</script>
