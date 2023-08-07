import { TableRowSelection } from 'ant-design-vue/types/table/table'
import { Component } from 'vue'

interface RowSelectionOptions {
  selectedRows: object[]
  rowKey: string
  type: 'radio' | 'checkbox'
  onChange: () => void
  getCheckboxProps: () => object
}

export declare class RowSelection {
  new(options: RowSelectionOptions): RowSelection

  // 已选中的行rowKey对象
  selectedRowKeys: string[]
  // 已选中的行对象数组
  selectedRows: object[]
  // 更新选中的
  updateCheckedRows(rows: object[]): void
  // 清空选中的
  clear(): void
  // 获取 table 需要的rowSelection参数
  get(): TableRowSelection

  // 创建实例
  static create(vm: Component, options: RowSelectionOptions): RowSelection
}
