<script>
import { Spin, Icon } from 'ant-design-vue'
import 'highlightjs-line-numbers.js'
import { CommonUtils } from 'aj-antd-components'
export default {
  props: {
    path: String,
    value: String,
    title: {
      type: String,
      default: '示例代码',
    },
  },
  data() {
    return {
      code: '',
      loading: true,
      show: false,
    }
  },
  watch: {
    value(e) {
      this.code = e
    },
  },
  methods: {
    copy() {
      let flag = CommonUtils.copyToClipboard(this.code)
      if (flag) {
        this.$message.success('复制成功')
      }
    },
  },
  async created() {
    let path = this.path
    if (this.path) {
      const res = await fetch(process.env.BASE_URL + 'docs/' + path).then((res) => res.text())
      this.code = res
    } else {
      this.code = this.value
    }
    this.loading = false
    this.$nextTick(() => {
      window.hljs.initLineNumbersOnLoad()
    })
  },
  render() {
    return (
      <Spin spinning={this.loading} class="preview-code">
        <div class={['wrapper', { show: this.show }]}>
          <h4 class="preview-code-title">{this.title}</h4>
          {this.code && (
            <pre v-highlightjs>
              <code class="tsx">{this.code}</code>
            </pre>
          )}
        </div>
        <div onClick={() => (this.show = !this.show)} class="trigger">
          <Icon type={'arrow-' + (this.show ? 'up' : 'down')} />
          <span>{this.show ? '收起' : '展开'}</span>
        </div>
      </Spin>
    )
  },
}
</script>

<style lang="less">
.preview-code {
  background: #ffffff;
  border-radius: 6px;
  .hljs-ln-numbers {
    text-align: center;
    color: #ccc;
    border-right: 1px solid #ececec;
    vertical-align: top;
    padding-right: 10px;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .hljs-ln-code {
    padding-left: 10px;
  }

  /* .hljs-ln-code,
    .hljs-ln-numbers {
      line-height: 14px;
    } */

  code {
    white-space: pre-wrap;
    overflow: auto;
  }
  .preview-code-title {
    font-size: 16px;
    color: #333333;
  }
  .trigger {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 8px 0;
    margin-top: 25px;
    &:hover {
      color: #2196f3;
      background: #fcfcfc;
    }
    span {
      margin-left: 10px;
    }
  }
  .wrapper {
    height: 140px;
    overflow: hidden;
    padding: 15px;

    &.show {
      height: auto;
    }
  }
}
</style>
