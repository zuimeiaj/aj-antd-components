<script>
import { FormTableLayoutActions } from 'aj-antd-components'
import { message } from 'ant-design-vue'

export default {
  render() {
    const fields = [
      { name: '按钮1', type: 'primary', icon: 'plus', callback: () => message.success('操作') },
      { name: '按钮2', type: 'primary', icon: 'plus', callback: () => message.success('操作') },
      { name: '按钮3', type: 'primary', icon: 'plus', callback: () => message.success('操作') },
      { name: '按钮4', type: 'primary', icon: 'plus', callback: () => message.success('操作') },
      { name: '按钮5', type: 'primary', icon: 'plus', callback: () => message.success('操作') },
      { name: '按钮6', type: 'primary', icon: 'plus', callback: () => message.success('操作') },
    ]
    return <FormTableLayoutActions actions={fields} />
  },
}
</script>
