import { FormItem } from './formitem'

interface FileListItem {
  uid: string
  name: string
  status: 'success' | 'error' | 'pending'
  url: string
  percent: number
}

export declare class UploadFile extends FormItem<string> {
  layout: 'button' | 'dragger'
  limit: number
  text: string
  tips: string
  fileList: FileListItem[]
  buttonName: string
  listType: 'picture-card' | 'text' | 'picture'
  accept: string
  limitSize: number
}
