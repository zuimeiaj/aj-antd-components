<script>
import { FormLayout, LoadingButton } from 'aj-antd-components'
import CommonPageVue from './CommonPage.vue'
export default {
  data() {
    return {
      values: {},
    }
  },
  methods: {
    async submit() {
      const values = await this.$refs.layout.validate()
      this.values = values
      console.log(values)
    },
  },
  render() {
    const columns = [
      { label: '下拉选', field: 'select', type: 'select', props: { handler: 'department' } },
      { label: '级联', field: 'cascader', type: 'cascader', props: { handler: 'department' } },
    ]
    return (
      <CommonPageVue title="FormLayout" description="可配置动态表单">
        <FormLayout ref="layout" columns={columns}>
          <LoadingButton click={this.submit}>提交表单</LoadingButton>
        </FormLayout>
        {JSON.stringify(this.values)}
      </CommonPageVue>
    )
  },
}
</script>
