<script>
import DateFormatPickerVue from '@/lib/components/DateFormatPicker.vue'
import DateRangeFormatPickerVue from '@/lib/components/DateRangeFormatPicker.vue'
export default {
  data() {
    return {
      value: '',
      range: null,
    }
  },
  render() {
    return (
      <div>
        <DateFormatPickerVue format="YYYY年MM月DD日" v-model={this.value} />
        <DateRangeFormatPickerVue v-model={this.range} />
      </div>
    )
  },
}
</script>
