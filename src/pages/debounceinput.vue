<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import Demo from './debounceinput/debounceinput.demo.vue'
export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue
        title={'包含多个格式的输入框'}
        description={'支持数字，百分比，金额，字符输入'}
        class="app-page gutter"
      >
        <Demo />
        <CommonCodeHighlightVue path="debounceinput.demo.vue" />
        <CommonCodeHighlightVue title="Props" path="debounce-input.d.ts" />
      </CommonPageVue>
    )
  },
}
</script>
