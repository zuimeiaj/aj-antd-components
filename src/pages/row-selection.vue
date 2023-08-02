<script>
import FormTableLayoutSingleVue from '@/lib/components/FormTableLayout/FormTableLayoutSingle.vue'
import RowSelection from '@/lib/utils/selection'

export default {
  created() {
    this.selection = RowSelection.create(this, {
      rowKey: 'id',
      type: 'radio',
    })
    this.selection.updateCheckedRows([{ id: 1 }])
  },
  render() {
    const onActionClick = () => {
      this.selection.clear()
    }
    const table = () => ({
      url: '/list',
      rowSelection: this.selection.get(),
      columns: new Array(10).fill(0).map((_, index) => {
        return { title: index, dataIndex: index, tab: index % 3 }
      }),
    })
    const props = {
      namespace: 'tablelayoutsingle',
      actions: [
        { type: 'primary', icon: 'plus', name: 'op1', tab: 0, callback: onActionClick },
        { type: 'primary', icon: 'plus', name: 'op2', tab: 1, callback: onActionClick },
        { type: 'primary', icon: 'plus', name: 'op3', tab: 2, callback: onActionClick },
        { type: 'primary', icon: 'plus', name: 'op4', callback: onActionClick },
        { type: 'primary', icon: 'plus', name: 'op5', callback: onActionClick },
        { type: 'primary', icon: 'plus', name: 'op6', callback: onActionClick },
      ],
      table: table(1),
      tabs: [
        { name: 'A', field: 'taba', value: 'taba' },
        { name: 'B', field: 'tabb', value: 'tabb' },
        { name: 'C', field: 'tabc', value: 'tabc' },
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
        {this.selection.selectedRowKeys.join(',')}
        <FormTableLayoutSingleVue props={props} />
      </div>
    )
  },
}
</script>
