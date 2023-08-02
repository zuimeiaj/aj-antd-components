import Vue from 'vue'
import { VNode } from 'vue/types/umd'

interface FileItem {
  name: string
  url: string
  path: string
}

export declare class FileFormatter extends Vue {
  renderContent(item: string | FileItem, index: number): VNode
  src: string | string[]
  preview: boolean
  block: boolean
  width: number
  height: number
  multiple: boolean
}
