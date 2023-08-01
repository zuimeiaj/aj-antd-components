<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import FormlayoutDemoVue from './formlayout/formlayout.demo.vue'
export default {
  render() {
    return (
      <CommonPageVue title="FormLayout" description="可配置动态表单">
        <FormlayoutDemoVue />
        <CommonCodeHighlightVue path="formlayout.demo.vue" />
        <CommonCodeHighlightVue title="Props" path="form-layout.d.ts" />
      </CommonPageVue>
    )
  },
}
</script>
