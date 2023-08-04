<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import MonthpickerDemoVue from './monthpicker/monthpicker.demo.vue'
export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue title="MonthPicker" description={'只是对value进行了处理'} class="app-page gutter">
        <MonthpickerDemoVue />
        <CommonCodeHighlightVue path="monthpicker.demo.vue" />
        <CommonCodeHighlightVue title="Props" path="month-picker.d.ts" />
      </CommonPageVue>
    )
  },
}
</script>
