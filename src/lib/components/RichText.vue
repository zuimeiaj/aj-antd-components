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
    value: String,
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
    const config = ComponentInterface.richtext()
    editor.customConfig = {
      uploadImgMaxSize: this.limitSize,
      zIndex: this.zIndex,
      customUploadImg: config.customUploadImg,
      fontNames: config.fontNames,
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
