<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import Demo from './dataselect/dataselect.demo.vue'
export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue
        title={'DataSelect'}
        description={'支持多种数据源（store.getters.dictionaries,handler,dataSource）、支持checkbox、radio、select类型'}
        class="app-page gutter"
      >
        <Demo />
        <CommonCodeHighlightVue path="dataselect.demo.vue" />
        <CommonCodeHighlightVue title="Props" path="data-select.d.ts"></CommonCodeHighlightVue>
      </CommonPageVue>
    )
  },
}
</script>
