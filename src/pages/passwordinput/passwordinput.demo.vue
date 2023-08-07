<script>
import { PasswordInput } from 'aj-antd-components'

export default {
  data() {
    return {
      value: '',
    }
  },
  render() {
    return (
      <div>
        {this.value}
        <PasswordInput v-model={this.value} />
      </div>
    )
  },
}
</script>
