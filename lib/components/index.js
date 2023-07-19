import FormLayout from './FormLayout/FormLayout.vue'
import FormTableLayout from './FormTableLayout/FormTableLayout.vue'
import FormTableLayoutActions from './FormTableLayout/FormTableLayoutActions.vue'
import FormTableLayoutFields from './FormTableLayout/FormTableLayoutFields.vue'
import FormTableLayoutSingle from './FormTableLayout/FormTableLayoutSingle.vue'
import Amount from './Amount.vue'
import Clipboard from './Clipboard.vue'
import CountDown from './CountDown.vue'
import DataSelect from './DataSelect.vue'
import DataTable from './DataTable.vue'
import DataCascader from './DataCascader.vue'
import DataDictionary from './DataDictionary.vue'
import DateFormatPicker from './DateFormatPicker.vue'
import DateRangeFormatPicker from './DateRangeFormatPicker.vue'
import DebounceInput from './DebounceInput.vue'
import Description from './Description.vue'
import Enum from './Enum.vue'
import FileFormatter from './FileFormatter.vue'
import ImageViewer from './ImageViewer.vue'
import LoadingButton from './LoadingButton.vue'
import MonthPicker from './MonthPicker.vue'
import NativeFile from './NativeFile.vue'
import NumberRangePicker from './NumberRangePicker.vue'
import NumberStepInput from './NumberStepInput.vue'
import PasswordInput from './PasswordInput.vue'
import RawHtml from './RawHtml.vue'
import RichText from './RichText.vue'
import RawText from './RawText.vue'
import TableColumnBtn from './TableColumnBtn.vue'
import TimePicker from './TimePicker.vue'
import UploadFile from './UploadFile.vue'
import ComponentInterface from './Interface'
import * as utils from '../utils'
import * as percentage from '../utils/percentage'
import * as validator from '../utils/validator'
import RowSelection from '../utils/selection'

import '../css/index.less'

function install(Vue, options = {}) {
  const components = [
    Description,
    Enum,
    FileFormatter,
    ImageViewer,
    LoadingButton,
    MonthPicker,
    NativeFile,
    FormLayout,
    FormTableLayout,
    FormTableLayoutActions,
    FormTableLayoutFields,
    FormTableLayoutSingle,
    Amount,
    CountDown,
    DataSelect,
    DataTable,
    DataCascader,
    DataDictionary,
    DateFormatPicker,
    Clipboard,
    DateRangeFormatPicker,
    UploadFile,
    TimePicker,
    TableColumnBtn,
    RawText,
    RichText,
    RawHtml,
    PasswordInput,
    NumberStepInput,
    NumberRangePicker,
    DebounceInput,
  ]
  Object.assign(ComponentInterface, options)
  components.forEach((item) => {
    Vue.component(item.name, item)
  })
}

export default {
  install,
}
export { install, utils, percentage, validator, RowSelection }
