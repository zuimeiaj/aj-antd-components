<script>
import { DatePicker } from 'ant-design-vue'
import moment from 'moment'
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
        this.$emit('change', this.getValue(value))
      } else {
        this.$emit('change', [])
      }
    },

    getFormat() {
      if (this.showTime) {
        return FORMAT
      } else {
        return FORMAT_DATE
      }
    },
    getValue(value) {
      const start = value[0]
      const end = value[1]
      if (this.showTime) {
        // DATE-TIME,用户选择的时间
        return [start.format(FORMAT), end.format(FORMAT)]
      } else if (this.hasHours) {
        // DATE-TIME 00:00:00 - 23:59:59
        return [start.startOf('days').format(FORMAT), end.endOf('days').format(FORMAT)]
      } else {
        // DATE
        return [start.format(FORMAT_DATE), end.format(FORMAT_DATE)]
      }
    },
  },
  render() {
    return (
      <DatePicker.RangePicker
        ranges={this.ranges}
        style="width:100%"
        format={this.getFormat()}
        showTime={this.showTime}
        value={this.value}
        onChange={this.handleChange}
      />
    )
  },
}
</script>
