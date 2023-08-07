<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import PasswordinputDemoVue from './passwordinput/passwordinput.demo.vue'
export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue title="Password" description="支持显示隐藏" class="app-page gutter">
        <PasswordinputDemoVue />
        <CommonCodeHighlightVue path="passwordinput.demo.vue" />
        <CommonCodeHighlightVue title="Props" path="password-input.d.ts" />
      </CommonPageVue>
    )
  },
}
</script>
