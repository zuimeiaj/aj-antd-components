<script>
import { CommonUtils, LoadingButton } from 'aj-antd-components'

export default {
  render() {
    const handleClick = () => {
      return new Promise((resolve) => {
        CommonUtils.waitForSeconds(2).then(resolve)
      })
    }
    return (
      <div>
        <LoadingButton click={handleClick}>点击后加载2秒后停止</LoadingButton>
      </div>
    )
  },
}
</script>
