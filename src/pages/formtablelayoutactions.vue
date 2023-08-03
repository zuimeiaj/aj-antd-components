<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import Demo from './tablelayout-actions/tablelayout-actions.demo.vue'
export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue
        title={'FormLayoutTableActions'}
        description={'操作按钮集合，TableFormLaytout配套组件，也可以单独使用'}
        class="app-page gutter"
      >
        <Demo />
        <CommonCodeHighlightVue path="tablelayout-actions.demo.vue" />
      </CommonPageVue>
    )
  },
}
</script>
