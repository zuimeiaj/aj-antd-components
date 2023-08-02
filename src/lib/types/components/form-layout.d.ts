import { Form } from 'ant-design-vue'
import { FieldValue, ValidationRule, WrappedFormUtils } from 'ant-design-vue/types/form/form'
import { ColSpanType } from 'ant-design-vue/types/grid/col'
import Vue, { Component } from 'vue'
import { FormItem } from './formitem'

export declare type FormComponentType =
  | 'input'
  | 'textarea'
  | 'enum'
  | 'dictionary'
  | 'cascader'
  | 'date'
  | 'range'
  | 'numberRange'
  | 'numberStep'
  | 'upload'
  | 'nativeFile'
  | 'richtext'
  | 'password'
  | 'select'
  | 'time'
  | 'arrayList'

declare interface FormLayoutColumn {
  /**
   * 字段名称，form.getFieldDecorator 的第一个参数
   */
  field: string
  /**
   * 组件类型，通过 registerForm(name;component) 注册后可以使用
   */
  type: FormComponentType
  /**
   * Form.Item label 属性
   */
  label: string
  /**
   * 组件的初始值
   */
  initialValue?: string
  /**
   * 自定验证规则
   */
  rules?: ValidationRule[]
  /**
   * 是否必填，相当于 rules:[{required:true,message:"请输入"+label}]
   */
  required: boolean
  /**
   * 0 - 24 默认为8
   */
  span: number
  /**
   * getFieldDecorator 第二个参数对象的key
   */
  trigger: string
  /**
   * getFieldDecorator 第二个参数对象key
   */
  valuePropName: string
  /**
   * 组件自身的props
   */
  props: { [key: string]: any }
  /**
   *完全自定义组件内容，传了该值后除span其他所有属性都不用传
   * @param form antd form对象通过$form.createForm(this)创建
   * @param vm FormLayout 组件的实例
   * @returns
   */
  customRender: (form: WrappedFormUtils, vm: Component) => void
  /**
   *是否显示该组件
   * @param formdata 表单的值对象
   * @returns
   */
  show: (formdata: FieldValue) => boolean
  /**
   * 分组时使用,分组对象只需要传3个字段 {title:string;gutter:number;columns:FormLayoutColumn[]}
   */
  columns?: FormLayoutColumn[]
  /**
   * 分组表单名称
   */
  title?: string
  /**
   * 分组表单可以定义列的间距
   */
  gutter?: number
}

export declare class FormLayout extends Vue {
  /**
   * 注册组件
   * @param name 注解别名，用于 columns 中的type值
   * @param vm 组件
   */
  static registerFormComponent(name: string, vm: Component): void
  /**
   * 获取已注册组件
   */
  static getFormComponents(): { [key in FormComponentType]: FormItem<any> }
  /**
   *  唯一名称
   */
  name: String
  /**
   * 渲染大列表时，需要设置为true，避免卡顿。此时需要使用单项数据流配合immutable数据结构来控制交互
   * 当表单中的任意一个值变化时，所有表单项都会重新render一次，设置为true时只变化当前组件，其他组件无法感知，需要通过valuesChange来处理，
   * 如果要联动表单需要对columns进行重新构建，可以使用immutable来处理需要联动的组件，默认为false，无明显卡顿不用管
   */
  performance: boolean
  /**
   *  参考FormItem 的 labelCol
   */
  labelCol: ColSpanType
  /**
   * 参考FormItem 的 wrapperCol
   */
  wrapperCol: ColSpanType
  /**
   * 当表单输入项发生变化后执行回调
   */
  valuesChange(item: { value: string; field: string }, formdata: FieldValue, extra: any): Record<string, any>
  /**
   * label 对齐方式
   */
  labelAlign: 'right' | 'left'
  /**
   * label 相对于输入项的位置
   */
  labelPosition: 'left' | 'top'
  /**
   * 表单输入项
   */
  columns: FormLayoutColumn
  /**
   * 重置表单
   */
  resetFields(): void
  /**
   * 设置表单值
   * @param fields 表单值对象
   */
  setFieldsValue(fields: FieldValue): void
  /**
   * 提交表单
   */
  submit(): void
  /**
   * 验证表单
   * @param needScroll 验证失败时是否滚动到错误表单处
   */
  validate(needScroll: boolean): Promise<Error | void>
}
