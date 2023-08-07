<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import NumberrangepickerDemoVue from './numberrangepicker/numberrangepicker.demo.vue'
export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue title="NumberRange" description="数字范围输入" class="app-page gutter">
        <NumberrangepickerDemoVue />
        <CommonCodeHighlightVue path="numberrangepicker.demo.vue" />
        <CommonCodeHighlightVue title="Props" path="number-range-picker.d.ts" />
      </CommonPageVue>
    )
  },
}
</script>
