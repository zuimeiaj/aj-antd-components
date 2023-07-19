<script>
import { Input } from 'ant-design-vue'
import { toDecimal, toPercentage } from '../utils/percentage'
import debounce from 'debounce'

export default {
  name: 'DebounceInput',
  props: {
    value: [Number, String],
    placeholder: String,
    type: {
      type: String,
      default: 'text', // text | number |amount | percentage | password
    },
    max: {
      default: Infinity,
      type: Number,
    },
    fixed: {
      default: 2,
      type: Number,
    },
    min: {
      default: -Infinity,
      type: Number,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    bounce: {
      default: 200,
      type: Number,
    },
    suffix: [Object, String],
    prefix: [Object, String],
    maxlength: {
      type: Number,
      default: Infinity,
    },
    showLimit: {
      type: Boolean,
      default: false,
    },
    decimal: {
      type: Number,
      default: 2,
    },
    trimStartZero: {
      type: Boolean,
      default: true,
    },
    trim: {
      type: Boolean,
      default: true,
    },
    trimOnPaste: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      text: '',
      dirty: false,
    }
  },
  computed: {
    displaySuffix() {
      if (this.showLimit) {
        return `${this.text?.length || 0}/${this.maxlength}`
      }
      if (this.type === 'percentage') return '%'
      if (this.type === 'amount') return '元'
      return this.suffix
    },
  },
  watch: {
    value: {
      handler(v) {
        if (this.dirty && v) {
          return
        }
        // 在未手动改变过输入框后，通常为第一次加载设置初始值，或者清空表单等操作
        if (this.type === 'amount') {
          this.text = v ? toDecimal(+v) : ''
        } else if (this.type === 'percentage') {
          this.text = v ? toPercentage(+v) : ''
        } else {
          this.text = v
        }
        this.dirty = false
      },
      immediate: true,
    },
  },
  methods: {
    formatToNumber(value) {
      let text = value.replace(/\.+/g, '.').replace(/-+/g, '-')
      let symbol = ''
      value = text

      // 处理负数
      if (text.startsWith('-')) {
        symbol = '-'
        value = text.slice(1)
      }

      if (isNaN(value)) {
        value = String(parseFloat(value))
      }

      if (isNaN(value)) {
        this.text = symbol
        this.notifyChange(undefined)
      } else {
        // 数字范围修正
        if (+(symbol + value) > this.max) {
          symbol = ''
          value = String(this.max)
        } else if (+(symbol + value) < this.min) {
          symbol = ''
          value = String(this.min)
        }

        // 小数点位数
        if (value.indexOf('.') > -1) {
          let nums = value.split('.')
          if (nums[1]) {
            value = nums[0] + '.' + nums[1].slice(0, this.decimal)
          }
        }

        // 拼接小数点
        this.text = text.endsWith('.') && text.split('.').length == 2 ? value + '.' : value
        this.text = symbol + this.text
        this.text = this.text.replace(/\.+/g, this.decimal == 0 ? '' : '.').replace(/-+/g, '-')

        // 去掉多个0开始的数
        if (this.trimStartZero) {
          if (symbol) this.text = this.text.replace(/^-0{2,}/, '-0')
          else this.text = this.text.replace(/^0{2,}/, '0')
        }

        this.notifyChange(value)
      }
    },
    handleInput(e) {
      this.dirty = true
      let value = e.target.value
      // 文本类型
      if (['text', 'password'].includes(this.type)) {
        this.text = value
        this.notifyChange(value)
      } else {
        this.formatToNumber(value)
        e.target.value = this.text
      }
    },
    notifyChange(value) {
      if (this.type === 'amount' && value) {
        value = toPercentage(value)
      } else if (this.type === 'percentage' && value) {
        value = toDecimal(value)
      }
      this.$emit('change', value)
      this.$emit('input', value)
    },
    handleBlur(e) {
      if (this.trim && this.text) {
        this.text = this.text.toString().trim()
        this.notifyChange(this.text)
      }
      this.$emit('blur', e)
    },
    handlePaste(e) {
      let text = e.clipboardData?.getData('Text')
      if (this.trimOnPaste && text) {
        text = text.replace(/\s*/g, () => '')
        setTimeout(() => {
          this.text = text
          this.notifyChange(text)
        })
      }
    },
  },
  created() {
    this.handleChange = debounce(this.notifyChange, this.bounce)
  },
  render() {
    return (
      <Input
        type={this.type === 'password' ? 'password' : 'text'}
        disabled={this.disabled}
        onPaste={this.handlePaste}
        maxLength={this.maxlength}
        value={this.text}
        onBlur={this.handleBlur}
        placeholder={this.placeholder}
        onInput={this.handleInput}
      >
        {this.displaySuffix && <span slot="suffix">{this.displaySuffix}</span>}
        {this.prefix && <span slot="prefix">{this.prefix}</span>}
      </Input>
    )
  },
}
</script>
