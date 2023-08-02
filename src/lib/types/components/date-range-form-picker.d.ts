import Vue from 'vue'
import { FormItem } from './formitem'

export declare class DateRangeFormatPicker extends FormItem<[string, string]> {
  showTime: boolean
  // show=true时，是否组合 00:00:00 - 23:59:59
  hasHours: boolean
  // isostring 提交
  iso: boolean
  // 自定义格式化
  format: string
}
