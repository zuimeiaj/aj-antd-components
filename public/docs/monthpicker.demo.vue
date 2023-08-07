<script>
import { MonthPicker } from 'aj-antd-components'

export default {
  data() {
    return {
      value: '',
    }
  },
  render() {
    return <MonthPicker v-model={this.value} format="YYYY-MM" />
  },
}
</script>
