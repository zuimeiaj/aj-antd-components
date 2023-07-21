import { Input } from 'ant-design-vue'
import DebounceInput from '../DebounceInput.vue'
import DataDictionary from '../DataDictionary.vue'
import DateFormatPicker from '../DateFormatPicker.vue'
import DateRangeFormatPicker from '../DateRangeFormatPicker.vue'
import UploadFile from '../UploadFile.vue'
import NumberRangePicker from '../NumberRangePicker.vue'
import NativeFile from '../NativeFile.vue'
import TimePicker from '../TimePicker.vue'
import PasswordInput from '../PasswordInput.vue'
import RichText from '../RichText.vue'
import ArrayListInput from './ArrayListInput.vue'
import DataSelect from '../DataSelect.vue'
import DataCascader from '../DataCascader.vue'
import MonthPicker from '../MonthPicker.vue'
import NumberStepInput from '../NumberStepInput.vue'
// 内置组件
const TypeMap = {
  input: DebounceInput,
  textarea: Input.TextArea,
  dictionary: DataDictionary,
  enum: DataDictionary,
  date: DateFormatPicker,
  range: DateRangeFormatPicker,
  month: MonthPicker,
  numberRange: NumberRangePicker,
  numberStep: NumberStepInput,
  upload: UploadFile,
  nativeFile: NativeFile,
  richtext: RichText,
  password: PasswordInput,
  select: DataSelect,
  cascader: DataCascader,
  time: TimePicker,
  arrayList: ArrayListInput,
}

const registerForm = (type, component) => {
  TypeMap[type] = component
}
const getFormTypes = () => TypeMap

export { TypeMap, registerForm, getFormTypes }
