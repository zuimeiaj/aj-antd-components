<script>
import { RichText } from 'aj-antd-components'
export default {
  data() {
    return {
      value: '',
    }
  },
  render() {
    return (
      <div>
        <RichText v-model={this.value} />
      </div>
    )
  },
}
</script>
