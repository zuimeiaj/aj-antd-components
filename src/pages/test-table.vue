<script>
import FormTableLayoutVue from '@/lib/components/FormTableLayout/FormTableLayout.vue'

export default {
  render() {
    const onActionClick = () => {
      this.$eventbus.$emit('tablelayout')
    }
    const table = (index) => ({
      url: '/list',
      columns: [
        { title: 'A' + index, dataIndex: 0 },
        { title: 'b' + index, dataIndex: 1 },
        { title: 'c' + index, dataIndex: 2 },
      ],
    })
    const props = {
      namespace: 'tablelayout',
      actions: [
        { type: 'primary', icon: 'plus', name: 'op1', tab: 0, callback: onActionClick },
        { type: 'primary', icon: 'plus', name: 'op2', tab: 1, callback: onActionClick },
        { type: 'primary', icon: 'plus', name: 'op3', tab: 2, callback: onActionClick },
        { type: 'primary', icon: 'plus', name: 'op4', callback: onActionClick },
        { type: 'primary', icon: 'plus', name: 'op5', callback: onActionClick },
        { type: 'primary', icon: 'plus', name: 'op6', callback: onActionClick },
      ],
      tables: [
        { name: 'A', field: 'taba', value: 'taba', table: table(1) },
        { name: 'B', field: 'tabb', value: 'tabb', table: table(2) },
        { name: 'C', field: 'tabc', value: 'tabc', table: table(3) },
      ],
      fields: [
        { label: '条件1', field: 'a', tab: 0 },
        { label: '条件2', field: 'b', tab: 1 },
        { label: '条件3', field: 'c', tab: 2 },
        { label: 'All', field: 'all', defaultValue: 'test' },
      ],
    }
    return (
      <div>
        <FormTableLayoutVue props={props} />
      </div>
    )
  },
}
</script>
