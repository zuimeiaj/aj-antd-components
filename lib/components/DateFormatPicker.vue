<script>
import { DatePicker } from 'ant-design-vue'
const DATE = 'YYYY-MM-DD'
const MONTH = 'YYYY-MM'
const DATETIME = 'YYYY-MM-DD HH:mm:ss'
export default {
  name: 'DateFormatPicker',
  props: {
    value: {
      type: String,
    },
    showTime: {
      default: false,
      type: Boolean,
    },
    hasHours: {
      type: Boolean,
      default: true,
    },
    view: {
      type: String,
      default: 'date',
    },
    format: String,
  },
  methods: {
    handleChange(value) {
      if (value) {
        this.$emit('change', this.getValue(value))
      } else {
        this.$emit('change', undefined)
      }
    },
    getValue(value) {
      if (this.view === 'month') {
        return value.format(this.getFormat())
      }
      // date-time格式
      if (this.showTime) {
        return value.format(this.getFormat())
      }
      // date-time 0点格式
      if (this.hasHours) {
        return value.startOf('days').format(this.getFormat())
      }
      // 返回日期格式

      return value.format(this.getFormat())
    },
    getFormat() {
      if (this.format) return this.format
      if (this.view == 'MONTH') {
        return MONTH
      }
      if (this.showTime) {
        return DATETIME
      }
      return DATE
    },
    getStringValue() {
      return this.value ? String(this.value) : this.value
    },
  },
  render() {
    if (this.view === 'month') {
      return (
        <DatePicker.MonthPicker
          style="width:100%"
          value={this.getStringValue()}
          onChange={this.handleChange}
          format={this.getFormat()}
        />
      )
    }
    return (
      <DatePicker
        format={this.getFormat()}
        showTime={this.showTime}
        style="width:100%"
        value={this.getStringValue()}
        onChange={this.handleChange}
      />
    )
  },
}
</script>
