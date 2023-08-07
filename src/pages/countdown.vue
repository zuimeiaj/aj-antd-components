<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import CountdownDemoVue from './countdown/countdown.demo.vue'
export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue title="CountDown" description="倒计时" class="app-page gutter">
        <CountdownDemoVue />
        <CommonCodeHighlightVue path="countdown.demo.vue" />
        <CommonCodeHighlightVue title="Props" path="count-down.d.ts" />
      </CommonPageVue>
    )
  },
}
</script>
