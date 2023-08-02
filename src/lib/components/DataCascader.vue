<script>
import { Cascader } from 'ant-design-vue'
import { forEach } from '../utils'
import ComponentInterface from './Interface'

export default {
  name: 'DataCascader',
  props: {
    data: Object,
    handler: String,
    value: String,
    array: Boolean,
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
      let options = await ComponentInterface.cascader[
        'fetch' + this.handler.slice(0, 1).toUpperCase() + this.handler.slice(1)
      ](data)
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
    handleChange(value) {
      if (value && value.length > 0) {
        let v = value[value.length - 1]
        let val = this.array ? [v, this.map[v].label] : v
        this.$emit('change', val, this.map[v])
        this.$emit('input', val)
      } else {
        this.$emit('change')
        this.$emit('input')
      }
    },
    getValue() {
      let value = this.array && this.value ? this.value[0] : this.value
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
