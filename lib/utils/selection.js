// 统一处理表格，分页多选操作
export default class RowSelection {
  checked = {}
  rowKey = 'id'
  type = 'checkbox'
  // eslint-disable-next-line no-unused-vars
  onSelectionChange = (selection) => {}

  constructor({ selectedRows, rowKey, type, onChange, getCheckboxProps }) {
    if (rowKey) this.rowKey = rowKey
    if (type) this.type = type
    if (onChange) this.onSelectionChange = onChange
    this.getCheckboxProps = getCheckboxProps
    this._initChecked(selectedRows)
  }

  // 已选择的行ID
  get selectedRowKeys() {
    return Object.values(this.checked)
      .filter((item) => item.deleted != 1)
      .map((item) => item[this.rowKey])
  }

  // 已选择的行数据
  get selectedRows() {
    return Object.values(this.checked).filter((item) => item.deleted != 1)
  }

  // antd selection 选择事件
  onSelectAll = (selected, rows, changeRows) => {
    this.setSelectionAll(selected ? rows : changeRows, selected)
    this.notifyChange()
    this.update()
  }

  onSelect = (item, selected) => {
    this.setSelection(item, selected)
    this.notifyChange()
    this.update()
  }

  notifyChange() {
    let onChange = this.onSelectionChange
    onChange && onChange(this)
  }

  setSelectionAll(items, selected) {
    items.forEach((item) => {
      this.setRecordStatus(item, selected)
    })
  }

  setRecordStatus(item, selected) {
    if (selected) {
      if (!this.checked[item[this.rowKey]]) this.checked[item[this.rowKey]] = item
      this.checked[item[this.rowKey]].deleted = 0
    } else {
      this.checked[item[this.rowKey]].deleted = 1
    }
  }

  setSelection(item, selected) {
    this.setRecordStatus(item, selected)
  }

  update() {
    this.vm.$forceUpdate()
  }

  _initChecked(selectedRows) {
    this.checked =
      selectedRows?.reduce((a, b) => {
        a[b[this.rowKey]] = b
        b.deleted = 0
        return a
      }, {}) || {}
  }

  // 更新选择的数据
  updateCheckedRows(selectedRows) {
    this._initChecked(selectedRows)
    this.update()
  }

  clear() {
    this.updateCheckedRows({})
  }

  get() {
    const selection = {
      selectedRowKeys: this.selectedRowKeys,
      onSelect: this.onSelect,
      onSelectAll: this.onSelectAll,
    }
    // 默认配置
    if (this.getCheckboxProps) {
      selection.getCheckboxProps = this.getCheckboxProps
    }

    return selection
  }

  static create(vm, ops) {
    let selection = new RowSelection(ops)
    selection.vm = vm
    return selection
  }
}
