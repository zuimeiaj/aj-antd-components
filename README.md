基于 vue2 ant-design-vue v1.7.8 的管理系统后台组件库。json 配置，简单易用

# Install

```js
npm install aj-antd-components --save
```

# Usage

```js
import Vue from 'vue'
import AComponents from 'aj-antd-components'
import 'aj-antd-components/dist/index.css'
import 'ant-design-vue/dist/antd.min.css'

Vue.use(AComponents, {
  // 日期默认
  time: {},
  // 级联组件配置
  cascader: {},
  // 下拉选择组件
  select: {},
  // 文件上传组件配置
  upload: {},
  // 富文本配置
  ricttext: () => ({}),
})
```

# install.d.ts

```ts
declare type FetchDataSourceHandler = {
  [string]: () => Promise<{ label: string; value: string; children?: FetchDataSource }>
}
interface UploadOptions {
  // 返回完整的文件地址，这里需要根据相对地址拼接完整的访问地址
  getImageUrl(path: string): string
  // 上传文件，返回文件的在服务器的相对地址
  uploadFile(file: File): Promise<string>
  // 富文本上传成功后，需要插入到编辑器重，res为上传后返回的对象,调用insertImg(url)即可
  // url 为完整的图片地址
  uploadSuccess(insertImg: (url: string) => void, res: object): void
}

interface RictextOptions {
  richtext: () => {
    // 自定上传，传入图片，上传成功后调用insertFn传入完整地址
    customUploadImg: (files: File[], insertFu: (fullPath: string) => void) => void
    // 支持的字体
    fontNames: string[]
  }
}

interface PageData {
  data:
    | object[]
    | {
        list: object[]
        total: number
      }
}
interface TableOptions {
  page: { page: number; limit: number }
  get(data: object): Promise<PageData>
  post(data: object): Promise<PageData>
  orderBy(sorter: { order: string; columnKey: string }): string
}
interface InstallOptions {
  // <DataCascader handler="department"/> 需要实现 department 函数并返回指定的数据结构
  cascader: FetchDataSourceHandler
  // 同上，select无children字段
  select: FetchDataSourceHandler
  // 上传组件，需要实现具体的文件上传请求
  upload: UploadOptions
  // 表格配置
  table: TableOptions
  // 富文本配置
  richtext: RictextOptions
  // 时间组件
  time: { iso: boolean }
}

export declare function install(options: InstallOptions): void
```

# Features

- 表单和列表使用 json 配置，大大降低代码量，使代码更简洁，更容易维护
- 表单组件：使用 json 配置，也支持自定义代码，支持值联动，显示隐藏联动，复杂对象嵌套、数组
- 搜索页面组件：使用 json 配置查询表单、操作按钮集合、数据接口配置、勾选操作、多状态页签展示方式

# Components

- `FormLayout` 表单
- `FormTableLayout` 查询列表，和 single 不同的时，每个 tabs 都有个 datatable 组件
- `FormTableLayoutFields` 查询表单，不会做校验
- `FormTableLayoutActions` 按钮集合
- `FormTableLayoutSingle` 查询列表，多状态 tabs 展示，多个 tabs 也只有一个 datatable 组件
- `DataTable` 分页列表
- `DataSelect` 下拉选，支持 select checkbox radio 展示
- `DataCascader` 级联
- `DataDictionary` 字典，也可以使用 DataSelect
- `DateFormatPicker` 日期，封装了一些默认操作：值的格式化处理
- `DateRangeFormatPicker` 日期范围
- `DebounceInput` 输入框，支持 number,text,amount,percentage 格式的强校验，支持输入字符数显示
- `Description` 使用 json 配置方式
- `Enum` 枚举映射
- `LoadingButton` click 事件返回 promise 有 loading 效果
- `UploadFile` 文件上传，对输出值进行了处理，返回上传文件的相对路径
- `NumberStepInput` 数字加 减
- `PasswordInput` 密码输入，支持显示隐藏
- `FormLayout` 表单
- `TableColumnBtn` table 的操作列按钮集合
