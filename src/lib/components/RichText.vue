<template>
  <div ref="editor"></div>
</template>

<script>
import Editor from 'wangeditor'
import debounce from 'debounce'
import ComponentInterface from './Interface'

export default {
  name: 'RichText',
  props: {
    limitSize: {
      type: Number,
      default: 10 * 1024 * 1024, // 10M,
    },
    zIndex: {
      type: Number,
      default: 10,
    },
  },
  watch: {
    value(text) {
      if (text !== this.initialValue) {
        this.editor.txt.html(text || '')
      }
      this.initialValue = text
    },
  },
  mounted() {
    const editor = new Editor(this.$refs.editor)
    const { value } = this.$props
    editor.customConfig = {
      uploadImgServer: ComponentInterface.upload.uploadUrl,
      uploadImgMaxSize: this.limitSize,
      zIndex: this.zIndex,
      uploadFileName: ComponentInterface.upload.fileFieldName || 'file',
      uploadImgHeaders: {
        [ComponentInterface.upload.tokenField || 'token']: ComponentInterface.upload.toke(),
      },
      uploadImgHooks: {
        customInsert: (insertImg, result) => {
          ComponentInterface.upload.uploadSuccess(insertImg, result)
        },
      },
      fontNames: ['宋体', '微软雅黑', 'Arial', 'Tahoma', 'Verdana'],
      onchange: debounce((html) => {
        this.initialValue = html
        this.$emit('change', html)
      }, 200),
    }
    editor.create()
    editor.txt.html(value)
    this.editor = editor
    this.initialValue = value
  },
}
</script>
