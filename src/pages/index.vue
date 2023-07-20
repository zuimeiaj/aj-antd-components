<script>
import { FormLayout, LoadingButton } from 'aj-antd-components'
export default {
  methods: {
    handleClick() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 2000)
      })
    },
  },
  render() {
    const columns = [{ label: '你好', type: 'input' }]
    return (
      <div class="app-page gutter">
        <LoadingButton click={this.handleClick}>hello</LoadingButton>
        <FormLayout columns={columns}></FormLayout>
      </div>
    )
  },
}
</script>
