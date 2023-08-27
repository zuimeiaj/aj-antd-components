<script>
import { Checkbox, Radio, Select, Spin } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import ComponentInterface from './Interface'
import debounce from 'debounce'
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
    this.pageIndex = 0
    this.pageSize = 10
    this.totalCount = 0
    this.noValueOptions = []
    this.valueOptions = []
    this.filteredOptions = []
    this.originalOptions = []

    this.handleScroll = debounce(this.handleScroll, 200)
    this.fetchSource(this.data)
  },
  methods: {
    async fetchSource(send) {
      let options = []
      this.pageIndex = 1
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

        // 原始数据缓存
        this.originalOptions = options
        // 已过滤的数据
        this.filteredOptions = options
        this.totalCount = options.length
        this.initLocalOptions()
      } finally {
        this.loading = false
      }
    },
    initLocalOptions() {
      // 将已选择的值item抽离出来
      let array = this.getValue()
      array = Array.isArray(array) ? array : [array]
      let values = []
      this.noValueOptions = this.originalOptions.filter((item) => {
        if (array.includes(item.value)) {
          values.push(item)
          return false
        }
        return true
      })
      let valueSortMap = {}
      array.forEach((item, index) => {
        valueSortMap[item.value] = index
      })
      this.valueOptions = values.sort((a, b) => valueSortMap[a] - valueSortMap[b])
      this.options = values.concat(this.noValueOptions.slice(0, this.pageSize))
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
      this.$nextTick(() => {
        this.initLocalOptions()
      })
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
    handleScroll(e) {
      if (
        e.target.scrollTop == Math.ceil(e.target.scrollHeight - e.target.offsetHeight) &&
        this.pageIndex * this.pageSize < this.totalCount
      ) {
        let size = (this.pageIndex += 1) * this.pageSize
        this.options = this.valueOptions.concat(this.filteredOptions.slice(0, size))
      }
    },
    handleSearch(value) {
      this.pageIndex = 1
      this.filteredOptions = value
        ? this.noValueOptions.filter((item) => item.label.indexOf(value) > -1)
        : this.noValueOptions
      this.totalCount = this.filteredOptions.length
      this.options = this.valueOptions.concat(this.filteredOptions.slice(0, this.pageSize))
    },
  },
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
          value={this.getValue()}
          onChange={this.handleChange}
          allowClear
          filterOption={false}
          onSearch={this.handleSearch}
          onPopupScroll={this.handleScroll}
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
