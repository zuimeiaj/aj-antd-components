<template>
  <Button class="count-down" type="primary" @click.stop.prevent="sendCode">{{ isStart ? sText : normalText }} </Button>
</template>
<script>
import { Button } from 'ant-design-vue'

export default {
  name: 'CountDown',
  components: { Button },
  data() {
    return {
      isStart: false,
      s: this.$props.senconds,
    }
  },
  props: {
    send: Function,
    senconds: {
      type: Number,
      default: 59,
    },
    text: {
      type: String,
      default: '{s}秒',
    },
    normalText: {
      type: String,
      default: '获取验证码',
    },
  },
  computed: {
    sText() {
      return this.text.replace('{s}', this.s)
    },
  },
  methods: {
    sendCode() {
      if (this.isStart === false) {
        let result = this.send()
        if (result && result.then && result.catch) {
          result.then(() => {
            this.startTimer()
            this.isStart = true
          })
        }
      }
    },
    startTimer() {
      setTimeout(() => {
        if (this.s > 0) {
          this.startTimer()
        } else {
          this.isStart = false
          this.s = this.senconds
        }
        this.s -= 1
      }, 1000)
    },
  },
}
</script>
