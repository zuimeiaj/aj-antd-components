<template>
  <div ref="editor"></div>
</template>

<script>
import Editor from 'wangeditor'
import debounce from 'debounce'
import ComponentInterface from './Interface'

export default {
  name: 'RichText',
  props: ['value'],
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
      uploadImgMaxSize: 10 * 1024 * 1024, // 10M,
      zIndex: 10,
      uploadFileName: 'file',
      uploadImgHeaders: {
        token: ComponentInterface.upload.toke(),
      },
      uploadImgHooks: {
        customInsert: (insertImg, result) => {
          if (result.data.url) {
            insertImg(result.data.url)
          }
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
