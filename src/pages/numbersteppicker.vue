<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import NumbersteppickerDemoVue from './numbersteppicker/numbersteppicker.demo.vue'
export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue title="NumberStep" description="数字Step输入" class="app-page gutter">
        <NumbersteppickerDemoVue />
        <CommonCodeHighlightVue path="numbersteppicker.demo.vue" />
        <CommonCodeHighlightVue title="Props" path="number-step-picker.d.ts" />
      </CommonPageVue>
    )
  },
}
</script>
