import Vue from 'vue'

export declare class LoadingButton extends Vue {
  type: 'primary' | 'default' | 'danger'
  icon: String
  size: 'default' | 'large' | 'small'
  click(e: any): Promise<any>
  disabled: boolean
}
