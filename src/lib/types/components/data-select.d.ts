import Vue from 'vue'
import { FormItem } from './formitem'

export interface DataItemOption {
  label: string
  value: string
}
export type ValueLabelArray = [string | number, string]
export type DataSelectValue = string | number
declare type SelectValue = DataSelectValue | ValueLabelArray
export declare class DataSelect extends FormItem<SelectValue> {
  // 远程拉去数据函数实现名称， 例如：user ,需要实现接口 fetchUser(send):Promise<[{label:string;value:string;}]>
  handler: string
  // select 组件自带属性，会原封不动的传给select组件
  params: object
  // value值，result为true是，是一个数组[value,label]，其他为 对象中的value。响应式
  // 请求接口需要的请求参数，如果变化会重新请求
  data: object
  // 在接口数据源时，该对象放到数据源第一个
  firstOption: DataItemOption
  // 在接口数据源时，该对象放到数据源最后一个
  lastOption: DataItemOption
  // select 输出值类型，string为对象中的value字段，array 为[value,label]，用于同时需要像服务端接口传递value和label的情况
  // string | array
  // 同cascader组件的array=true
  result: 'string' | 'array'
  // 数据源，如果传递则直接使用，响应式
  dataSource: DataItemOption[]
  // 枚举字典中的key,需要在store中暴露getters.dictionaries {key:map<{value:label}>;key_array:[{label,value}]}
  disabled: boolean
}
