<script>
import { Select, Spin } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import ComponentInterface from './Interface'
// 支持 dataSource ，handler(data),enum 三种数据源
// dataSource 为直接传入数组
// handler 通过DataSelect.use()注入 接口实现对象
// enum 需要实现 store.getters.dictionaries
export default {
  name: 'DataSelect',
  props: {
    // 远程拉去数据函数实现名称， 例如：user ,需要实现接口 fetchUser(send):Promise<[{label:string;value:string;}]>
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
  },
  data() {
    return {
      options: [],
      loading: false,
    }
  },
  computed: {
    ...mapGetters(['dictionaries']),
    selectOptions() {
      if (Array.isArray(this.dataSource)) {
        return this.dataSource
      }
      if (typeof this.handler === 'string') {
        return this.options
      }

      if (this.enum) {
        let dict = this.dictionaries || {}
        return dict[this.enum + '_array'] || []
      }
      return []
    },
  },
  watch: {
    data(value) {
      this.fetchSource(value)
    },
    dataSource(v) {
      if (Array.isArray(v)) {
        this.options = v
      }
    },
  },
  created() {
    if (Array.isArray(this.dataSource)) {
      this.options = this.dataSource
    } else {
      this.fetchSource(this.data)
    }
  },
  methods: {
    async fetchSource(send) {
      try {
        this.loading = true
        let options = await ComponentInterface.select[
          'fetch' + this.handler.slice(0, 1).toUpperCase() + this.handler.slice(1)
        ](send)
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
      } catch (e) {
        console.error(e)
      }
      this.loading = false
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
        let items = this.selectOptions.filter((item) => value.includes(item.value))
        this.notify(this.result === 'array' ? [value, items.map((item) => item.label)] : value, items)
      } else {
        // 单选
        let item = this.selectOptions.find((item) => item.value == value)
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
    const props = this.params || {}
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
