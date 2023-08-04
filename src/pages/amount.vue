<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import AmountDemoVue from './amount/amount.demo.vue'
export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue title={'Amount'} description={'金额格式化'} class="app-page gutter">
        <AmountDemoVue />
        <CommonCodeHighlightVue path="amount.demo.vue" />
        <CommonCodeHighlightVue title="Props" path="amount.d.ts" />
      </CommonPageVue>
    )
  },
}
</script>
