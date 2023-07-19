<script>
import { Button, Dropdown, Menu } from 'ant-design-vue'

export default {
  name: 'TableColumnBtn',
  props: {
    buttons: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: 'dropdown',
    },
  },
  methods: {
    handleMenuClick(e) {
      let item = this.buttons.find((item) => item.name == e.key)
      if (item) {
        item.click()
      }
    },
  },
  render() {
    let buttons = this.buttons.filter((item) => item.show !== false)
    if (buttons.length === 0) return null
    if (buttons.length === 1) {
      return (
        <Button onClick={buttons[0].click} type="primary">
          {buttons[0].name}
        </Button>
      )
    }

    if (this.type === 'inline') {
      return (
        <span class="table-btn-wp">
          {buttons.map((item) => {
            return (
              <Button type={item.type} key={item.name} onClick={item.click}>
                {item.name}
              </Button>
            )
          })}
        </span>
      )
    }

    return (
      <Dropdown
        overlay={
          <Menu onClick={this.handleMenuClick}>
            {buttons.map((item) => {
              return <Menu.Item key={item.name}>{item.name}</Menu.Item>
            })}
          </Menu>
        }
      >
        <Button icon="down">操作</Button>
      </Dropdown>
    )
  },
}
</script>
