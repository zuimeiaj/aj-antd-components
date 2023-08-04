<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import Demo from './tablelayout-single/tablelayout-single.demo.vue'
export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue
        title={'FormTableLayoutSingle'}
        description={'带tabs的搜索列表页面，多个tabs只有一个table组件'}
        class="app-page gutter"
      >
        <Demo />
        <CommonCodeHighlightVue path="tablelayout-single.demo.vue" />
      </CommonPageVue>
    )
  },
}
</script>
