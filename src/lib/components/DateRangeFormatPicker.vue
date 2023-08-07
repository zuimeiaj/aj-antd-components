<script>
import { DatePicker } from 'ant-design-vue'
import moment from 'moment'
import ComponentInterface from './Interface'
const FORMAT = 'YYYY-MM-DD HH:mm:ss'
const FORMAT_DATE = 'YYYY-MM-DD'

export default {
  name: 'DateRangeFormatPicker',
  props: {
    value: {
      type: Array,
      default: () => [undefined, undefined],
    },
    showTime: {
      type: Boolean,
      default: false,
    },
    hasHours: {
      type: Boolean,
      default: true,
    },
    iso: {
      type: Boolean,
      default: ComponentInterface.time.iso,
    },
    format: String,
  },
  data() {
    return {
      ranges: {
        今天: [moment().startOf('date'), moment().endOf('date')],
        近7天: [moment().subtract(6, 'days').startOf('date'), moment().endOf('date')],
        近30天: [moment().subtract(29, 'days').startOf('date'), moment().endOf('date')],
        本月: [moment().startOf('month'), moment().endOf('date')],
      },
    }
  },
  methods: {
    handleChange(value) {
      const start = value[0]
      const end = value[1]
      if (start && end) {
        let val = this.getValue(value)
        this.$emit('change', val)
        this.$emit('input', val)
      } else {
        this.$emit('change', [])
        this.$emit('input', [])
      }
    },

    getFormat() {
      if (this.format) return this.format
      if (this.showTime) {
        return FORMAT
      } else {
        return FORMAT_DATE
      }
    },

    getFormatValue(value, format) {
      if (this.iso) {
        return value.toISOString()
      }
      return value.format(this.format || format)
    },

    getValue(value) {
      if (!value) return
      const start = value[0]
      const end = value[1]
      if (this.showTime) {
        // DATE-TIME,用户选择的时间
        return [this.getFormatValue(start, FORMAT), this.getFormatValue(end, FORMAT)]
      } else if (this.hasHours) {
        // DATE-TIME 00:00:00 - 23:59:59
        return [this.getFormatValue(start.startOf('days'), FORMAT), this.getFormatValue(end.endOf('days'), FORMAT)]
      } else {
        // DATE
        return [this.getFormatValue(start, FORMAT_DATE), this.getFormatValue(end, FORMAT_DATE)]
      }
    },
    getDisplayValue() {
      if (this.value && this.value[0] && this.value[1] && this.format) {
        return [moment(this.value[0], this.getFormat()), moment(this.value[1], this.getFormat())]
      }
      return this.value
    },
  },
  render() {
    return (
      <DatePicker.RangePicker
        ranges={this.ranges}
        style="width:100%"
        format={this.getFormat()}
        showTime={this.showTime}
        value={this.getDisplayValue()}
        onChange={this.handleChange}
      />
    )
  },
}
</script>
