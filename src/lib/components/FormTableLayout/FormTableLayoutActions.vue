<script>
import { Button } from 'ant-design-vue'
import ComponentInterface from '../Interface'
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
  watch: {
    actions() {
      this.customRender()
    },
  },
  methods: {
    customRender() {
      ComponentInterface.tablelayout.customRenderActions?.(this.actions)
    },
  },
  activated() {
    this.customRender()
  },
  created() {
    this.customRender()
  },
  render() {
    if (ComponentInterface.tablelayout.customRenderActions) return null
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
