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
// 内置组件
const TypeMap = {
  input: DebounceInput,
  textarea: Input.TextArea,
  dictionary: DataDictionary,
  enum: DataDictionary,
  date: DateFormatPicker,
  range: DateRangeFormatPicker,
  numberRange: NumberRangePicker,
  upload: UploadFile,
  nativeUpload: NativeFile,
  richtext: RichText,
  password: PasswordInput,
  dataSelect: DataSelect,
  time: TimePicker,
  arrayList: ArrayListInput,
}

const registerForm = (type, component) => {
  TypeMap[type] = component
}

export { TypeMap, registerForm }
