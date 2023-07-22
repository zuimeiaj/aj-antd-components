<script>
import moment from 'moment'
import { DatePicker } from 'ant-design-vue'
export default {
  name: 'MonthPicker',
  props: {
    value: String,
    max: {
      type: Object,
      default: () => moment('2100-01', 'YYYY-MM'),
    },
    min: {
      type: Object,
      default: () => moment().startOf('date'),
    },
    params: {
      type: Object,
      default: () => ({}),
    },
    format: {
      type: String,
      default: 'YYYY-MM',
    },
  },
  methods: {
    getValue() {
      const value = this.value
      if (value) {
        return moment(value, this.format)
      }
    },
    handleChange(value) {
      if (value) {
        this.$emit('change', value.format(this.format))
      } else {
        this.$emit('change', undefined)
      }
    },
  },
  render() {
    return (
      <DatePicker.MonthPicker
        props={this.params}
        disabledMonth={(date) => {
          return date.startOf('date') < this.min || date.startOf('date') > this.max
        }}
        value={this.getValue()}
        onChange={this.handleChange}
      />
    )
  },
}
</script>
