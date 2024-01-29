import { updateArrayItem } from '../../utils'
import ComponentInterface from '../Interface'

export default {
  props: {
    namespace: String, // 唯一标识，用于触发表格更新
    // 清空表单时是否清空所有tabd搜索框值
    clearOnReset: {
      type: Boolean,
      default: ComponentInterface.tablelayout.clearOnReset,
    },
    value: {
      type: [Number, String],
      default: 0,
    },
    fields: {
      type: Array,
      default: function () {
        return []
      },
    },
    table: {
      type: Object,
      default: function () {
        return {} // from `DataTable` props
      },
    },
    actions: {
      type: Array,
      default: function () {
        return []
      },
    },
    query: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  data() {
    return {
      // 各个tab需要的搜索参数
      searchs: [],
      activeKey: '0',
      // 组合query，table.field, filter 的参数
      searchValues: [],
      // 未指定tab的搜索项，输入值作用与所有tab
      commonSearch: {},
    }
  },
  computed: {
    tabActions() {
      let tables = this.getTables()
      return tables.length > 0 ? tables[this.activeKey].actions || [] : this.actions.filter(this.matchTab)
    },
    commonFields() {
      return this.fields.filter((item) => !('tab' in item))
    },
    tabFields() {
      return this.fields.filter(this.matchTab)
    },
    tabValues() {
      return this.searchValues[this.activeKey]
    },
  },
  watch: {
    query() {
      this.setSearchValues()
    },
    value(key) {
      this.activeKey = String(key)
    },
    activeKey(key) {
      this.setSearchValues()
      this.setFormFieldsValue()
      this.$emit('input', +key)
      this.$emit('tabChange', +key, this.searchValues)
    },
  },

  methods: {
    // 具体引入的组件实现
    getTables() {
      return []
    },
    setFormFieldsValue() {
      if (this.searchs[this.activeKey]) {
        this.$nextTick(() => {
          this.$refs.filterForm.setFieldsValue(this.searchs[this.activeKey])
        })
      }
    },
    setSearchValues() {
      // 当前tab，field :value
      let current = this.getTables()[this.activeKey]
      // 当前tab的搜索表单，query
      let values = { ...this.getDefaultValue(), ...(this.searchs[this.activeKey] || {}), ...this.query }
      if (current && current.field) values[current.field] = current.value
      // 对某个tab的查询对象进行合并
      if (current && current.query) {
        values = { ...values, ...current.query }
      }

      // 更新
      this.searchValues = updateArrayItem(this.searchValues, this.activeKey, () => values)
    },
    matchTab(item) {
      return 'tab' in item
        ? Array.isArray(item.tab)
          ? item.tab.includes(+this.activeKey)
          : Number(item.tab) == Number(this.activeKey)
        : true
    },
    getCommonFieldsValue(value) {
      return this.commonFields.reduce((a, b) => {
        if (b.field in value) {
          a[b.field] = value[b.field]
        }
        return a
      }, {})
    },
    setCommonSearchValue(value) {
      let commonValue = this.getCommonFieldsValue(value)
      this.searchs = (this.getTables().length > 0 ? this.getTables() : [0]).map((_, index) => {
        return { ...(this.searchs[index] || {}), ...commonValue }
      })
    },
    handleReset(value) {
      if (this.clearOnReset) {
        this.searchs = []
        this.searchs[this.activeKey] = value
      }
      this.setSearchValues()
      this.$emit('search', this.tabValues)
    },
    handleSearch(value) {
      // 将当前值缓存，当tab切换时重新赋值
      this.searchs[this.activeKey] = value
      this.setCommonSearchValue(value)
      this.setSearchValues()
      this.$emit('search', this.tabValues)
    },
    handleRefresh() {
      this.setSearchValues()
    },
    handleAction(callback) {
      const { filterForm, ...rest } = this.$refs
      callback(filterForm, rest)
    },
    getDefaultValue() {
      const value = {}
      ;(this.tabFields || []).forEach((item) => {
        if (item.defaultValue) {
          value[item.field] = item.defaultValue
        }
      })
      return value
    },
    initEvents(type = 'on') {
      if (!this.namespace) return

      if (type == 'on') {
        this.$eventbus.$off(this.namespace, this.handleRefresh)
        this.$eventbus.$on(this.namespace, this.handleRefresh)
        return
      }

      this.$eventbus.$off(this.namespace, this.handleRefresh)
    },
  },
  created() {
    this.initEvents('on')
    this.setSearchValues()
  },
  beforeDestroy() {
    this.initEvents('off')
  },
}
