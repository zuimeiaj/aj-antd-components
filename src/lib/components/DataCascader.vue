<script>
import { Cascader } from 'ant-design-vue'
import { forEach } from '../utils'
import ComponentInterface from './Interface'

export default {
  name: 'DataCascader',
  props: {
    data: Object,
    handler: String,
    value: [String, Number, Array],
    result: String, // lastValue | array
    array: Boolean, // 是否返回完整路径值
    changeOnSelect: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
  },
  data() {
    return {
      options: [],
    }
  },
  watch: {
    data(val) {
      this.fetchOptions(val)
    },
  },
  async created() {
    this.map = {}
    await this.fetchOptions(this.data)
  },
  methods: {
    async fetchOptions(data) {
      this.map = {}
      // 只需要实现 getOptions 函数返回数组即可
      let options = await ComponentInterface.cascader[this.handler](data)
      forEach(
        options,
        (item, index, parent) => {
          item.parent = parent
          this.map[item.value] = item
        },
        'children'
      )
      this.options = options
    },
    getValueType(lastValue, fullValue) {
      let labels = fullValue.map((item) => this.map[item].label)
      let items = fullValue.map((item) => this.map[item])
      // 返回值为数组，[value,label] ,item
      if (this.result === 'array') {
        if (this.array) {
          return { val: [fullValue, labels], item: items }
        }
        return { val: [lastValue, this.map[lastValue].label], item: this.map[lastValue] }
      } else if (this.array) {
        // 返回值为选中路径数组 [1,2,3] ,items
        return { val: fullValue, item: items }
      }
      // 默认只返回路径最有一个值
      return { val: lastValue, item: this.map[lastValue] }
    },
    notify(value, items = []) {
      this.$emit('change', value, items)
      this.$emit('input', value)
    },
    handleChange(value) {
      if (value && value.length > 0) {
        let v = value[value.length - 1]
        let { val, item } = this.getValueType(v, value)
        this.notify(val, item)
      } else {
        this.notify()
      }
    },
    getValue() {
      if (this.array) {
        if (this.result === 'array') {
          return this.value ? this.value[0] : undefined
        }
        return this.value
      }

      let value = this.result === 'array' && this.value ? this.value[0] : this.value
      if (!value) return
      let item = this.map[value]
      let result = []
      while (item) {
        result.push(item.value)
        item = item.parent
      }
      return result.reverse()
    },
  },
  render() {
    return (
      <Cascader
        showSearch
        disabled={this.disabled}
        placeholder="请选择"
        value={this.getValue()}
        changeOnSelect={this.changeOnSelect}
        onChange={this.handleChange}
        options={this.options}
      />
    )
  },
}
</script>
