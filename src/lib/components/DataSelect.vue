<script>
import { Checkbox, Radio, Select, Spin } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import ComponentInterface from './Interface'
// 支持 dataSource ，handler(data),enum 三种数据源
// dataSource 为直接传入数组
// handler 通过DataSelect.use()注入 接口实现对象
// enum 需要实现 store.getters.dictionaries
export default {
  name: 'DataSelect',
  props: {
    // 远程拉去数据函数实现名称， 例如：user ,需要实现接口 interface.select[handler](send):Promise<[{label:string;value:string;}]>
    handler: String,
    // select 组件自带属性，会原封不动的传给select组件
    params: Object,
    // value值，result为true是，是一个数组[value,label]，其他为 对象中的value。响应式
    value: [Array, String, Number],
    // 请求接口需要的请求参数，如果变化会重新请求
    data: Object,
    // 在接口数据源时，该对象放到数据源第一个
    firstOption: Object,
    // 在接口数据源时，该对象放到数据源最后一个
    lastOption: Object,
    // select 输出值类型，string为对象中的value字段，array 为[value,label]，用于同时需要像服务端接口传递value和label的情况
    result: String, // string | array
    // 数据源，如果传递则直接使用，响应式
    dataSource: Array,
    // 枚举字典中的key,需要在store中暴露getters.dictionaries {key:map<{value:label}>;key_array:[{label,value}]}
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: String,
    enum: String, // store.getters.dictionaries.xx_enum
    displayStyle: String, // radio | select | checkbox
  },
  data() {
    return {
      options: [],
      loading: false,
    }
  },
  computed: {
    ...mapGetters(['dictionaries']),
  },
  watch: {
    // 重新获取options
    data(value) {
      this.fetchSource(value)
    },
    // 直接传递options
    dataSource() {
      this.fetchSource(this.data)
    },
  },
  created() {
    this.fetchSource(this.data)
  },
  methods: {
    async fetchSource(send) {
      let options = []
      try {
        // data source
        if (Array.isArray(this.dataSource)) {
          options = this.dataSource.slice()
          // getters.dictionaries[enum]
        } else if (this.enum) {
          let dict = this.dictionaries || {}
          options = dict[this.enum + '_array'] || []
          // interface impl
        } else if (this.handler) {
          this.loading = true
          options = await ComponentInterface.select[this.handler](send)
        }

        if (this.params && this.params.defaultFirstChecked && options.length > 0) {
          this.handleChange(options[0].value)
        }
        if (this.firstOption) {
          options.unshift(this.firstOption)
        }
        if (this.lastOption) {
          options.push(this.lastOption)
        }
        this.options = options
      } finally {
        this.loading = false
      }
    },
    notify(value, items) {
      // v-decorator antd 表单需要change事件
      this.$emit('change', value, items)
      // v-model
      this.$emit('input', value)
    },
    handleChange(value) {
      // 多选
      if (Array.isArray(value)) {
        let items = this.options.filter((item) => value.includes(item.value))
        this.notify(this.result === 'array' ? [value, items.map((item) => item.label)] : value, items)
      } else {
        // 单选
        let item = this.options.find((item) => item.value == value)
        this.notify(this.result === 'array' ? [value, item ? item.label : void 0] : value, item)
      }
    },
    getValue() {
      if (this.result === 'array') {
        return this.value ? this.value[0] : undefined
      }
      return this.value
    },
    handleFilter(value, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(value.toLowerCase()) >= 0
    },
  },
  // 使用DataSelect.use(map<{key:function}>) 注入接口实现
  use(handlerImpOption = {}) {
    Object.assign(ComponentInterface.select, handlerImpOption)
  },
  render() {
    // 组件原始属性
    const props = this.params || {}
    if (this.displayStyle === 'radio') {
      return (
        <Radio.Group
          onChange={(e) => this.handleChange(e.target.value)}
          value={this.getValue()}
          style="width:100%"
          options={this.options}
          props={props}
        ></Radio.Group>
      )
    }
    if (this.displayStyle === 'checkbox') {
      return (
        <Checkbox.Group
          onChange={(values) => this.handleChange(values)}
          value={this.getValue() || []}
          style="width:100%"
          options={this.options}
          props={props}
        ></Checkbox.Group>
      )
    }
    if (this.displayStyle == 'button') {
      return (
        <Radio.Group
          onChange={(e) => this.handleChange(e.target.value)}
          value={this.getValue()}
          style="width:100%"
          props={props}
        >
          {this.options.map((item) => {
            return (
              <Radio.Button value={item.value} key={item.value}>
                {item.label}
              </Radio.Button>
            )
          })}
        </Radio.Group>
      )
    }

    return (
      <Spin spinning={this.loading}>
        <Select
          style="width:100%"
          showSearch={true}
          disabled={this.disabled}
          filterOption={this.handleFilter}
          value={this.getValue()}
          onChange={this.handleChange}
          allowClear
          placeholder={this.placeholder}
          props={props}
        >
          {this.options.map((item) => {
            return (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            )
          })}
        </Select>
      </Spin>
    )
  },
}
</script>
