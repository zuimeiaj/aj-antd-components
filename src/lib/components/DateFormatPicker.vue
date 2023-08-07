<script>
import { DatePicker } from 'ant-design-vue'
import ComponentInterface from './Interface'
import moment from 'moment'
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
    iso: {
      type: Boolean,
      default: ComponentInterface.time.iso,
    },
  },
  methods: {
    handleChange(value) {
      if (value) {
        let val = this.getValue(value)
        this.$emit('change', val)
        this.$emit('input', val)
      } else {
        this.$emit('change')
        this.$emit('input')
      }
    },
    getValue(value) {
      if (this.view === 'month') {
        return this.getFormatValue(value)
      }
      // date-time格式
      if (this.showTime) {
        return this.getFormatValue(value)
      }
      // date-time 0点格式
      if (this.hasHours) {
        return this.getFormatValue(value.startOf('days'))
      }
      // 返回日期格式
      return this.getFormatValue(value)
    },
    getFormat() {
      if (this.format) return this.format
      if (this.view == 'month') {
        return MONTH
      }
      if (this.showTime) {
        return DATETIME
      }
      return DATE
    },
    getFormatValue(value) {
      if (this.iso) {
        return value.toISOString()
      }
      return value.format(this.getFormat())
    },

    getStringValue() {
      return this.value ? moment(this.value, this.getFormat()) : this.value
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
