<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import DictionaryDemoVue from './dictionary/dictionary.demo.vue'
export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue
        title={'下拉选择，使用store数据源'}
        description={'需要在store实现getters.dictionaries'}
        class="app-page gutter"
      >
        <DictionaryDemoVue />
        <CommonCodeHighlightVue path="dictionary.demo.vue" />
        <CommonCodeHighlightVue title="Props" path="data-dict.d.ts" />
      </CommonPageVue>
    )
  },
}
</script>
