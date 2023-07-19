<template>
  <a v-clipboard:success="onSuccess" v-clipboard:copy="value">
    <slot></slot>
  </a>
</template>

<script>
import { message } from 'ant-design-vue'
import Clipboard from 'vue-clipboard2'
import Vue from 'vue'

Vue.use(Clipboard)
export default {
  name: 'Clipboard',
  props: ['value'],
  methods: {
    onSuccess() {
      message.success('复制成功')
    },
  },
}
</script>
