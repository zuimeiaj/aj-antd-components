import Vue from 'vue'
import { FormItem } from './formitem'

export declare class DateFormatPicker extends FormItem<string> {
  // 是否显示时间组件
  showTime: boolean
  // date 模式下是否拼接 00:00:00
  hasHours: boolean
  view: 'date' | 'month'
  // 格式化，以下时默认值
  // view = date： YYYY-MM-DD
  // view = moth： YYYY-MM,
  // view = date & showtime = true： YYYY-MM-DD HH:mm:ss
  format: string
  // 以iso方式提交
  iso: boolean
}
