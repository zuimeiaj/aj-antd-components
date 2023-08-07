<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import UtilsDemoVue from './utils/utils.demo.vue'
export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue title="Utils" description="常用工具函数">
        <UtilsDemoVue />
        <CommonCodeHighlightVue title="Props" path="common-utils.d.ts" />
      </CommonPageVue>
    )
  },
}
</script>
