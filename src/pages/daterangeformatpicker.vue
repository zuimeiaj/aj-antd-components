<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import DatarangeformatpickerDemoVue from './datarangeformatpicker/datarangeformatpicker.demo.vue'
export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue title="DateRangeFormatPicker" description="对日期范围值进行格式化处理" class="app-page gutter">
        <DatarangeformatpickerDemoVue />
        <CommonCodeHighlightVue path="datarangeformatpicker.demo.vue" />
        <CommonCodeHighlightVue title="Props" path="date-range-form-picker.d.ts" />
      </CommonPageVue>
    )
  },
}
</script>
