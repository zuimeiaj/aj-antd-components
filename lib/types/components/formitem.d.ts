import Vue from 'vue'

export declare class FormItem<T> extends Vue {
  // antd 所有表单都有的属性
  value: T
  // antd 所有的antd 表单都要实现
  onChange(value: T): void
  // 如果有v-model 的情况才需要抛出此事件
  onInput(value: T): void
}
