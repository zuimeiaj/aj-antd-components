import Vue from 'vue'

interface ColumnButton {
  name: string
  icon: string
  show: boolean
  type: string
  click(e: any): void
}
export declare class TableColumnBtn extends Vue {
  buttons: ColumnButton[]
  type: 'dropdown' | 'inline'
}
