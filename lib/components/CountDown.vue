<template>
  <Button class="count-down" type="primary" @click.stop.prevent="sendCode"
    >{{ isStart ? senconds + '秒' : '获取验证码' }}
  </Button>
</template>
<script>
import { Button } from 'ant-design-vue'

export default {
  name: 'CountDown',
  components: { Button },
  data() {
    return {
      isStart: false,
      senconds: 59,
    }
  },
  props: ['send'],
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
        if (this.senconds > 0) {
          this.startTimer()
        } else {
          this.isStart = false
          this.senconds = 59
        }
        this.senconds -= 1
      }, 1000)
    },
  },
}
</script>

<style scoped></style>
