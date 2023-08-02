import { VNode } from 'vue'

interface DescriptionColumn {
  // label
  label: string
  // 映射datasource中的key
  field: string
  // 映射getters.dictionaries中的key
  enum: string
  // default  12
  span: number
  // 后缀
  suffix: string
  // 自动将值转为日期格式
  type: 'date' | 'datetime'
  // 动态显示隐藏
  show(column: DescriptionColumn): boolean
  // 自定义值显示
  customRender(value: any, dataSource: object): VNode
}

export declare class Description extends Vue {
  // 显示列
  columns: DescriptionColumn[]
  // 增加边框
  bordered: boolean
  // 如果column中传递了field会在此对象中自动映射
  dataSource: object
  // default 24
  cols: number
}
