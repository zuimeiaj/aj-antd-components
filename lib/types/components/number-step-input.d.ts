import { FormItem } from './formitem'

export declare class NumberStepInput extends FormItem<number> {
  min: number
  max: number
  step: number
  disabled: boolean
  decimal: number
}
