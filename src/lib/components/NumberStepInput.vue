<script>
import { Button, Input } from 'ant-design-vue'
export default {
  name: 'NumberStepInput',
  props: {
    value: [Number, String],
    min: {
      default: 0,
      type: Number,
    },
    max: {
      type: Number,
      default: 10000,
    },
    step: {
      default: 1,
      type: Number,
    },
    disabled: {
      type: Boolean,
    },
    decimal: {
      default: 0,
      type: Number,
    },
  },
  methods: {
    notifyChange(value) {
      this.$emit('change', value)
      this.$emit('input', value)
    },
  },
  render() {
    return (
      <span class="step-number-input">
        <Button
          class="step-btn-ele"
          disabled={this.value <= this.min || this.disabled}
          onClick={() => this.notifyChange(this.value - this.step)}
          icon="minus"
        />
        <Input
          class="step-input-ele"
          disabled={this.disabled}
          onChange={(e) => {
            let value = e.target.value
            if (isNaN(value)) {
              value = parseFloat(value)
              value = isNaN(value) ? '' : value
            }
            if (value <= this.min) value = this.min
            if (value >= this.max) value = this.max
            this.notifyChange(value)
          }}
          value={this.value}
        />
        <Button
          class="step-btn-ele"
          disabled={this.value >= this.max || this.disabled}
          onClick={() => this.notifyChange(Number(this.value) + this.step)}
          icon="plus"
        />
      </span>
    )
  },
}
</script>
