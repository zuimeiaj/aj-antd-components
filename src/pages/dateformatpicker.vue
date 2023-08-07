<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import DataformatpickerDemo from './dataformatpicker/dataformatpicker.demo.vue'
export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue
        title={'DateFormatPicker'}
        description="对输出值默认处理为字符串格式,Iso格式格式提交"
        class="app-page gutter"
      >
        <DataformatpickerDemo />
        <CommonCodeHighlightVue path="dataformatpicker.demo.vue" />
        <CommonCodeHighlightVue title="Props" path="date-form-picker.d.ts" />
      </CommonPageVue>
    )
  },
}
</script>
