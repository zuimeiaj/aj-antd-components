import Vue, { VNode } from 'vue'

export declare class ImageViewer extends Vue {
  src: String
  width: number
  height: number
  multiple: boolean
  customRender(url: string, index: number): VNode
}
