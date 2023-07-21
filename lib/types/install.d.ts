declare type FetchDataSourceHandler = {
  [string]: () => Promise<{ label: string; value: string; children?: FetchDataSource }>
}
interface UploadOptions {
  // 需要指定富文本上传的字段名称，默认为file
  fileFieldName: string
  // 富文本上传接口地址
  uploadUrl: string
  // 富文本上传时，需要指定一个header中的token字段名称，默认为token
  tokenField: string
  // 返回登录token，用于上传时设置到header的tokenField 中
  token(): string
  // 返回完整的文件地址，这里需要根据相对地址拼接完整的访问地址
  getImageUrl(path: string): string
  // 上传文件，返回文件的在服务器的相对地址
  uploadFile(file: File): Promise<string>
  // 富文本上传成功后，需要插入到编辑器重，res为上传后返回的对象,调用insertImg(url)即可
  // url 为完整的图片地址
  uploadSuccess(insertImg: (url: string) => void, res: object): void
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
  // <DataCascader handler="department"/> 需要实现 fetchDepartment函数并返回指定的数据结构
  cascader: FetchDataSourceHandler
  // 同上，select无children字段
  select: FetchDataSourceHandler
  // 上传文件时需要token和路径信息，可自定义实现上传接口
  upload: UploadOptions
  // 表格配置
  table: TableOptions
}

export declare function install(options: InstallOptions): void
