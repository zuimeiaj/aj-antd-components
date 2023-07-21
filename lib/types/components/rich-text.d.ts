import Vue from 'vue'
import { FormItem } from './formitem'

export declare class RichText extends FormItem<string> {
  // 限制上传文件大小，默认为10M
  limitSize: number
  // css 层级，默认为10
  zIndex: number
}
