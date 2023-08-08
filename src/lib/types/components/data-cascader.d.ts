import Vue from 'vue'
import { DataSelectValue } from './data-select'
import { FormItem } from './formitem'

declare type CascaderValue = DataSelectValue | Array<DataSelectValue>

export declare class DataCascader extends FormItem<CascaderValue> {
  // 请求接口需要的参数
  data: Object
  // 请求接口实现名，在 Vue.use(x,{cascader:{hander:()=>{}}})定义
  handler: String
  // 组件值类型,array true是 value 为选择的路径数组，否则取数组的最后一个值
  array: boolean
  // 返回值类型，array 时，值类型为 [value,label]
  // 如果后端接口需要同时上传选中的值和展示的名称，可以设置为array
  result: 'array' | void
  // 当选择时触发change事件
  changeOnSelect: boolean
  disabled: boolean
  placeholder: string
}
