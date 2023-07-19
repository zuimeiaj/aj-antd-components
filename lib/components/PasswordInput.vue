<script>
import { Icon } from 'ant-design-vue'
import DebounceInputVue from './DebounceInput.vue'
export default {
  name: 'PasswordInput',
  props: ['value'],
  data() {
    return {
      show: false,
    }
  },
  render() {
    return (
      <span class="password-input-eye">
        <DebounceInputVue
          class="it"
          value={this.value}
          onInput={(e) => {
            this.$emit('input', e)
            this.$emit('change', e)
          }}
          type={this.show ? 'text' : 'password'}
        />
        <Icon
          class="eye-btn"
          nativeOnClick={() => (this.show = !this.show)}
          type={this.show ? 'eye' : 'eye-invisible'}
        />
      </span>
    )
  },
}
</script>
<style lang="less" scoped></style>
