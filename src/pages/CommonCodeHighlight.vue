<script>
import { Spin, Icon } from 'ant-design-vue'
export default {
  props: {
    path: String,
    value: String,
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
  async created() {
    if (this.path) {
      const res = await fetch(this.path).then((res) => res.text())
      this.code = res
    } else {
      this.code = this.value
    }
    this.loading = false
  },
  render() {
    return (
      <Spin spinning={this.loading} class="preview-code">
        <div class={['wrapper', { show: this.show }]}>
          <h4 class="preview-code-title">示例代码</h4>
          {this.code && (
            <pre v-highlightjs>
              <code class="js">{this.code}</code>
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
    height: 100px;
    overflow: hidden;
    padding: 15px;

    &.show {
      height: auto;
    }
  }
}
</style>
