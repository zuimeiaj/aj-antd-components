import Vue from 'vue'

export declare class CountDown extends Vue {
  // 发送验证码，promiseresove后开始倒计时
  send(): Promise<any>
  // 倒计时长，默认为 59
  senconds: number
  //倒计时文案： {s}秒后重新获取
  text: string
  // 获取验证码文案
  normalText: string
}
