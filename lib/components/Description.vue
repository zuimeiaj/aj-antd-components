<script>
import { Descriptions } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  name: 'Description',
  props: {
    columns: {
      type: Array,
      default: () => [
        /**
         *  {
         *    label:string;
         *    field:string; // 对应datasource中的key
         *    enum?:string; // 对应字典中的key
         *    customRender?:function(value,dataSource):string | VNode
         *  }
         *
         */
      ],
    },
    bordered: {
      type: Boolean,
      default: true,
    },
    dataSource: {
      type: Object,
      default: () => ({}),
    },
    cols: {
      type: Number,
      default: 24,
    },
  },
  computed: {
    ...mapGetters(['dictionaries']),
  },
  methods: {
    getValue(item) {
      let value = this.getValueByPath(item.field)
      if (item.enum) {
        let dict = this.dictionaries[item.enum]
        return Array.isArray(value) ? value.map((item) => dict[item]).join(',') : dict[value]
      }
      if (item.type == 'date') {
        return value ? moment(value).format('YYYY-MM-DD') : ''
      }
      if (item.type === 'datetime') {
        return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : ''
      }
      if (item.customRender) {
        return item.customRender(value, this.dataSource)
      }
      return value
    },
    getValueByPath(field) {
      if (!field) return ''
      let path = field.split('.')
      let key = path.pop()
      let object = this.dataSource
      while (path.length > 0 && object) {
        object = object[path.shift()]
      }
      return object ? object[key] : ''
    },
  },
  render() {
    return (
      <Descriptions column={this.cols} bordered={this.bordered} size="small">
        {this.columns
          .filter((item) => item.show !== false)
          .map((item, index) => {
            return (
              <Descriptions.Item key={index} label={item.label} span={item.span || 12}>
                {this.getValue(item)}
                {item.suffix}
              </Descriptions.Item>
            )
          })}
      </Descriptions>
    )
  },
}
</script>
