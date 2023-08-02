import Vue from 'vue'
import { DataItemOption, DataSelectValue, ValueLabelArray } from './data-select'
import { FormItem } from './formitem'

declare type DataDictValue = DataSelectValue | ValueLabelArray

export declare class DataDictionary extends FormItem<DataDictValue> {
  // 字典的key
  code: string
  // 为true 时 value 的格式 为 [value,label],将对于key的label也返回
  array: boolean
  // Antd.Select 的组件属性
  mode: string
  // 对数组进行过滤显示，可以过滤调不需要的值
  formatter(option: DataItemOption): boolean
  // 组件显示样式，下拉或者单选模式
  displayStyle: 'select' | 'radio'
  disabled: boolean
}
