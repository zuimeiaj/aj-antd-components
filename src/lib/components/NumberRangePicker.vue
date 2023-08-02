<script>
import { InputNumber } from 'ant-design-vue'

export default {
  name: 'NumberRangePicker',
  props: {
    value: {
      default: () => [],
      type: Array,
    },
  },
  render() {
    return (
      <div class="form-number-input">
        <InputNumber
          value={this.value[0]}
          onChange={(v) => this.$emit('change', [v, this.value[1]])}
          class="input-number"
          max={this.value[1] || 100000000}
          min={0}
        />
        <span class="connector">~</span>
        <InputNumber
          onChange={(v) => this.$emit('change', [this.value[0], v])}
          class="input-number"
          value={this.value[1]}
          min={this.value[0] || 0}
        />
      </div>
    )
  },
}
</script>
