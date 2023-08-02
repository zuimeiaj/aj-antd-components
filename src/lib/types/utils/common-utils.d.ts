import { ValidationRule, WrappedFormUtils } from 'ant-design-vue/types/form/form'

export declare class CommonUtils {
  /**
   * 返回一个required的 rules
   * @param msg
   * @param rule
   * @returns {rules:ValidationRule[]}
   */
  static requiredMsg(msg: string, rule: ValidationRule[]): { rules: ValidationRule[] }

  /**
   * @param s 等待时长，单位秒
   * @returns Promise
   */
  static waitForSeconds(s: number): Promise<any>

  /**
   * 遍历数组，树，对象
   * @param {object|array} item 数据结构 树、数组、对象
   * @param {function<item,index>} callback 回调函数
   * @param {string} [childName] 树形结构中的字段名称
   */
  static forEach<T>(item: T | T[], callback: (item: keyof T | T, index: number) => void, childName: keyof T): void
  /**
   *
   * @param obj 去掉对象中空字符串
   */
  static removeEmptyProp<T>(obj: T): T
  /**
   * 随机生成一个给定长度的字符串
   * @param len
   */
  static getPwdWithRandom(len: number): string
  /**
   * 复制
   * @param text
   */
  static copyToClipboard(text: string): boolean
  /**
   * 下载文件
   * @param buffer
   * @param fileName
   */
  static downloadByBuffer(buffer: Buffer, fileName: string): void
  /**
   * 修改数组中的某个对象，
   * @param array 要修改的数组
   * @param index 要修改的对象index
   * @param callback 回调函数中需要返回新的对象
   */
  static updateArrayItem<T>(array: T[], index: number, callback: (item: T) => T): T[]
  /**
   *  验证表单
   * @param form
   */
  static validateFormFields(form: WrappedFormUtils): Promise<any>
  /**
   * 是否为空
   * @param object
   */
  static isEmpty(object: any): boolean
  /**
   * 获取年的下拉列表数据
   */
  static getYearsSelect(): { label: string; value: string }[]

  /**
   * 过滤数组中show为false的对象
   * @param array
   */
  static displayByCondition<T>(array: T[]): T[]
  /**
   * 获取月的下拉列表数据
   */
  static getMonthSelect(): { label: string; value: string }[]
  /**
   * 生成一个随机数
   */
  static generateuid(): string
  /**
   * 带loading的下载文件
   * @param taskCallback  下载函数，需要返回promise
   */
  static downloadFiles(taskCallback: () => Promise<any>): void
}
