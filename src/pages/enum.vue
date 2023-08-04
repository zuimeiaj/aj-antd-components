<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import EnumDemoVue from './enum/enum.demo.vue'
export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue title={'Enum'} description={'字典值映射，和DataDictionary 一致'} class="app-page gutter">
        <EnumDemoVue />
        <CommonCodeHighlightVue path="enum.demo.vue" />
        <CommonCodeHighlightVue title="Props" path="enum.d.ts" />
      </CommonPageVue>
    )
  },
}
</script>
