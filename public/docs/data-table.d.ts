import { Column } from 'ant-design-vue/types/table/column'
import { TableRowSelection } from 'ant-design-vue/types/table/table'
import Vue, { Component } from 'vue'

export declare class DataTable extends Vue {
  // antd 自身的属性
  scroll: { x: number; y: number }
  rowSelection: TableRowSelection
  columns: Column[]
  bordered: boolean
  defaultExpandAllRows: boolean
  rowKey: string | function
  // 请求接口url，需要在use时提供请求实现
  url: String
  // 请求参数，变化后会重新请求
  params: object
  method: 'post' | 'get'
  // 更新前可以对响应数据进行操作，response 为原始的响应数据
  updateBefore(response: object, table: DataTable): object[]
  // 请求前可以对发送的参数处理，返回false不会请求
  fetchBefore(send: object): object | boolean
  // table的底部是否固定，始终保持分页控件在页面底部
  pageFixed: boolean
  // 给定一个table的唯一名称，可以通过DataTable.get(name)获取实例
  name: String
}
