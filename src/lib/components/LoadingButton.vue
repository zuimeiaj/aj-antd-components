<script>
import { Button } from 'ant-design-vue'
export default {
  name: 'LoadingButton',
  props: {
    type: {
      default: 'primary',
      type: String,
    },
    icon: String,
    size: {
      default: 'default',
      type: String,
    },
    click: {
      default: () => Promise.resolve(),
      type: Function,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async click1() {
      try {
        this.loading = true
        await this.click()
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    },
  },
  render() {
    let props = {}
    if (this.size) props.size = this.size
    if (this.icon) props.icon = this.icon
    if (this.type) props.type = this.type
    if (this.disabled) props.disabled = this.disabled
    return (
      <Button props={props} onClick={this.click1} loading={this.loading}>
        {this.$slots.default}
      </Button>
    )
  },
}
</script>
