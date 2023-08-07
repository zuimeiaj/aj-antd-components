<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import RichtextDemoVue from './richtext/richtext.demo.vue'
export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue title="RichText" description="对wangeditor简单封装" class="app-page gutter">
        <RichtextDemoVue />
        <CommonCodeHighlightVue path="richtext.demo.vue" />
        <CommonCodeHighlightVue title="Props" path="rich-text.d.ts" />
      </CommonPageVue>
    )
  },
}
</script>
