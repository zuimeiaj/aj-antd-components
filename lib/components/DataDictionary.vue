<script>
import { Radio, Select } from 'ant-design-vue'
import { mapGetters } from 'vuex'
export default {
  name: 'DataDictionary',
  props: ['value', 'code', 'array', 'mode', 'formatter', 'displayStyle', 'disabled'],
  computed: {
    ...mapGetters(['dictionaries']),
    options() {
      let options = this.dictionaries[this.code + '_array'] || []
      if (typeof this.formatter === 'function') {
        return options.filter(this.formatter)
      }
      return options
    },
    map() {
      return this.dictionaries[this.code] || {}
    },
  },
  methods: {
    getLabels(v) {
      if (this.mode == 'multiple') {
        return v?.map((item) => this.map[item])
      }
      return this.map[v]
    },
    change(v) {
      this.$emit('change', this.array ? [v, this.getLabels(v)] : v)
      this.$emit('input', this.array ? [v, this.getLabels(v)] : v)
    },
    getValue() {
      return this.array ? (this.value ? this.value[0] : void 0) : this.value
    },
  },
  render() {
    let displayStyle = this.displayStyle || 'select'
    if (displayStyle == 'radio') {
      return (
        <Radio.Group
          options={this.options}
          onChange={(e) => this.change(e.target.value)}
          value={this.getValue()}
          style="width:100%"
        />
      )
    }
    return (
      <Select
        disabled={!!this.disabled}
        mode={this.mode}
        onChange={this.change}
        value={this.getValue()}
        style="width:100%"
        allowClear
      >
        {this.options.map((item) => {
          return (
            <Select.Option key={item.value} value={item.value}>
              {item.label}
            </Select.Option>
          )
        })}
      </Select>
    )
  },
}
export const DisplayDicData = {
  props: ['code', 'value'],
  computed: {
    fieldVlaue() {
      let dicts = this.$store.state.user.dictionaries
      let map = {}
      if (dicts[this.code]) {
        map = dicts[this.code].map
      }
      return map[this.value]
    },
  },
  render() {
    return <span>{this.fieldVlaue}</span>
  },
}
</script>
