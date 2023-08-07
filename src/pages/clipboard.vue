<script>
import ClipboardDemoVue from './clipboard/clipboard.demo.vue'
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue title="Clipboard" description="复制文本组件" class="app-page gutter">
        <ClipboardDemoVue />
        <CommonCodeHighlightVue path="clipboard.demo.vue" />
        <CommonCodeHighlightVue title="Props" path="clipboard.d.ts" />
      </CommonPageVue>
    )
  },
}
</script>
