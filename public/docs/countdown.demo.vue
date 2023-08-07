<script>
import { CountDown, CommonUtils } from 'aj-antd-components'
export default {
  render() {
    const sendCode = () => {
      return new Promise((resolve) => {
        CommonUtils.waitForSeconds(0.3).then(resolve)
      })
    }
    return (
      <div>
        <CountDown senconds={10} normalText="获取验证码" text="{s} 秒后重新获取" send={sendCode}></CountDown>
      </div>
    )
  },
}
</script>

<style lang="less">
.count-down {
  padding: 4px 12px;
  background: green;
  &:hover,
  &:focus,
  &:active {
    background: green;
  }
}
</style>
