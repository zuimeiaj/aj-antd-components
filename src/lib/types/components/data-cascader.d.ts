import Vue from 'vue'
import { DataSelectValue } from './data-select'
import { FormItem } from './formitem'

declare type CascaderValue = DataSelectValue | Array<DataSelectValue>

export declare class DataCascader extends FormItem<CascaderValue> {
  // 请求接口需要的参数
  data: Object
  // 请求接口实现名，在 Vue.use(x,{cascader:{hander:()=>{}}})定义
  handler: String
  // 组件值类型,array true是 value 为 array类型，否则取数组的最后一个值
  array: boolean
  // 当选择时触发change事件
  changeOnSelect: boolean
  disabled: boolean
  placeholder: string
}
