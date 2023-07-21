<script>
import { LoadingButton } from 'aj-antd-components'
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
    return (
      <div class="app-page gutter">
        <LoadingButton>123123</LoadingButton>
      </div>
    )
  },
}
</script>
