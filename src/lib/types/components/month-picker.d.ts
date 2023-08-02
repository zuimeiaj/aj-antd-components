import { Moment } from 'moment'
import { FormItem } from './formitem'

export declare class MonthPicker extends FormItem<string> {
  max: Moment
  min: Moment
  params: object
  format: string
}
