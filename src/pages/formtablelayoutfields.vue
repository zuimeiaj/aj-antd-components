<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import TablelayoutFieldsDemoVue from './tablelayout-fields/tablelayout-fields.demo.vue'

export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue title="TableLayoutFields" description={'表单搜索组件'} class="app-page gutter">
        <TablelayoutFieldsDemoVue />
        <CommonCodeHighlightVue path="tablelayout-fields.demo.vue" />
      </CommonPageVue>
    )
  },
}
</script>
