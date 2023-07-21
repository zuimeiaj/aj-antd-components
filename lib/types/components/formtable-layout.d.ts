import Vue from 'vue'
import { DataTable } from './data-table'
import { FormComponentType } from './form-layout'

interface TableLayoutAction {
  name: string
  icon: string
  callback(e: any): void
  type: string
}

interface TableLayoutField {
  label: string
  field: string
  type: FormComponentType
  props: object
  required: boolean
  placeholder: string
}

interface TableLayoutTab {
  name: string
  field: string
  value: string
}

interface TableLayoutTable extends TableLayoutTab {
  className: string
  actions: TableAction[]
  table: DataTable
}
declare class FormTableLayoutBase {
  namespace: String // 唯一标识，用于触发表格更新
  fields: TableLayoutField[]
  table: DataTable
  actions: TableLayoutAction[]
  query: object
}

export declare class FormTableLayout extends FormTableLayoutBase {
  tables: TableLayoutTable[]
}

export declare class FormTableLayoutActions extends Vue {
  actions: TableLayoutAction[]
}

export declare class FormTableLayoutFields extends Vue {
  fields: TableLayoutField[]
}

export declare class FormTableLayoutSingle extends FormTableLayoutBase {
  tabs: TableLayoutTab[]
}
