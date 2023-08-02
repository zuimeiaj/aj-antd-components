import Vue, { VNode } from 'vue'
import { FormItem } from './formitem'

export declare class DebounceInput extends FormItem<string> {
  placeholder: string
  // amount 输出值为转为 分，例: 输入100 -> 10000
  // percentage 会转为小数，70 -> 0.7
  type: 'text' | 'number' | 'amount' | 'percentage' | 'password'
  // 类型为number时有效，最小值和最大值
  max: number
  min: number

  disabled: boolean
  // 触发阀值，默认为200
  bounce: number
  // antd.input 属性
  suffix: VNode | string
  prefix: VNode | string
  // 字符长度限制
  maxlength: number
  // 显示输入字数，需要盒maxlength配合使用
  showLimit: boolean
  // 小数位数
  decimal: number
  // 数字类型去掉前面的0
  trimStartZero: boolean
  // 去掉字符两边空格
  trim: boolean
  // 粘贴时自动去掉空格
  trimOnPaste: boolean
}
