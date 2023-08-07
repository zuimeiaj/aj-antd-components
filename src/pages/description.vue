<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import DescriptionDemoVue from './description/description.demo.vue'
export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue
        title="Description"
        description="使用json来配置显示详情，支持数据格式化处理"
        class="app-page gutter"
      >
        <DescriptionDemoVue />
        <CommonCodeHighlightVue path="description.demo.vue" />
        <CommonCodeHighlightVue title="Props" path="description.d.ts" />
      </CommonPageVue>
    )
  },
}
</script>
