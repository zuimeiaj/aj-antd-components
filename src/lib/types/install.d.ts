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
