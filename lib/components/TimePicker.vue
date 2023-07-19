<script>
import { TimePicker } from 'ant-design-vue'
export default {
  name: 'TimePicker',
  props: {
    value: String,
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value)
    },
  },
  render() {
    return (
      <TimePicker
        style="width:100%"
        valueFormat={'HH:mm:ss'}
        format={'HH:mm:ss'}
        value={this.value}
        onChange={this.handleChange}
      ></TimePicker>
    )
  },
}
</script>
