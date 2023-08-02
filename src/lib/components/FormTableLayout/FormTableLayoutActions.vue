<script>
import { Button } from 'ant-design-vue'
export default {
  name: 'FormTableLayoutActions',
  props: {
    actions: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
  render() {
    return (
      <div class="formtable-layout-actions">
        {this.actions.map((item) => {
          return (
            <Button class="button-item" type={item.type} onClick={() => item.callback()} icon={item.icon}>
              {item.name}
            </Button>
          )
        })}
      </div>
    )
  },
}
</script>
