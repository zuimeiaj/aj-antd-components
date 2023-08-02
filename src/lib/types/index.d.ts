import { FormLayout } from './components/form-layout'
import { LoadingButton } from './components/button'
import { Amount } from './components/amount'
import {
  FormTableLayout,
  FormTableLayoutActions,
  FormTableLayoutFields,
  FormTableLayoutSingle,
} from './components/formtable-layout'
import { DebounceInput } from './components/debounce-input'
import { DataSelect } from './components/data-select'
import { DataCascader } from './components/data-cascader'
import { Enum } from './components/enum'
import { MonthPicker } from './components/month-picker'
import { DateFormatPicker } from './components/date-form-picker'
import { DateRangeFormatPicker } from './components/date-range-form-picker'
import { NumberRangePicker } from './components/number-range-picker'
import { NumberStepInput } from './components/number-step-input'
import { UploadFile } from './components/upload-file'
import { TimePicker } from 'ant-design-vue'
import { TableColumnBtn } from './components/table-column-btns'
import { RichText } from './components/rich-text'
import { RawText } from './components/raw-text'
import { RawHtml } from './components/raw-html'
import { PasswordInput } from './components/password-input'
import { NativeFile } from './components/native-file'
import { ImageViewer } from './components/image-viewer'
import { FileFormatter } from './components/file-formatter'
import { Description } from './components/description'
import { DataTable } from './components/data-table'
import { DataDictionary } from './components/data-dict'
import { CountDown } from './components/count-down'
import { Clipboard } from './components/clipboard'
import { CommonUtils } from './utils/common-utils'
import { PercentageUtil } from './utils/percentage'
import { RowSelection } from './utils/row-selection'
import { ValidatorUtil } from './utils/validator'
import { install } from './install'

export {
  install,
  FormLayout,
  FormTableLayout,
  FormTableLayoutActions,
  FormTableLayoutSingle,
  FormTableLayoutFields,
  DebounceInput,
  DataSelect,
  DataCascader,
  DataTable,
  DataDictionary,
  LoadingButton,
  Amount,
  Enum,
  MonthPicker,
  DateFormatPicker,
  DateRangeFormatPicker,
  NumberRangePicker,
  NumberStepInput,
  UploadFile,
  TimePicker,
  TableColumnBtn,
  RichText,
  RawText,
  RawHtml,
  PasswordInput,
  NativeFile,
  ImageViewer,
  FileFormatter,
  Description,
  CountDown,
  Clipboard,
  CommonUtils,
  PercentageUtil,
  RowSelection,
  ValidatorUtil,
}

declare module 'vue' {
  export interface GlobalComponents {
    FormLayout: FormLayout
    FormTableLayout: FormTableLayout
    FormTableLayoutActions: FormTableLayoutActions
    FormTableLayoutSingle: FormTableLayoutSingle
    FormTableLayoutFields: FormTableLayoutFields
    DebounceInput: DebounceInput
    DataSelect: DataSelect
    DataCascader: DataCascader
    DataTable: DataTable
    DataDictionary: DataDictionary
    LoadingButton: LoadingButton
    Amount: Amount
    Enum: Enum
    MonthPicker: MonthPicker
    DateFormatPicker: DateFormatPicker
    DateRangeFormatPicker: DateRangeFormatPicker
    NumberRangePicker: NumberRangePicker
    NumberStepInput: NumberStepInput
    UploadFile: UploadFile
    TimePicker: TimePicker
    TableColumnBtn: TableColumnBtn
    RichText: RichText
    RawText: RawText
    RawHtml: RawHtml
    PasswordInput: PasswordInput
    NativeFile: NativeFile
    ImageViewer: ImageViewer
    FileFormatter: FileFormatter
    Description: Description
    CountDown: CountDown
    Clipboard: Clipboard
  }
}
