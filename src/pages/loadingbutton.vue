<script>
import CommonCodeHighlightVue from './CommonCodeHighlight.vue'
import CommonPageVue from './CommonPage.vue'
import LoadingbuttonDemoVue from './loadingbutton/loadingbutton.demo.vue'
export default {
  data() {
    return {}
  },
  render() {
    return (
      <CommonPageVue title="LoadingButton" description={'请求时返回promise有loading效果'} class="app-page gutter">
        <LoadingbuttonDemoVue />
        <CommonCodeHighlightVue path="loadingbutton.demo.vue" />
        <CommonCodeHighlightVue title="Props" path="button.d.ts" />
      </CommonPageVue>
    )
  },
}
</script>
