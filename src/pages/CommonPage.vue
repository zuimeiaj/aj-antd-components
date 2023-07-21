<script>
export default {
  props: ['title', 'description'],
  render() {
    return (
      <div class="app-page gutter common-page">
        <h3 class="app-page-title">{this.title}</h3>
        <div class="page-description">{this.description}</div>
        <div class="page-content">{this.$slots.default}</div>
      </div>
    )
  },
}
</script>

<style lang="less">
.common-page {
  .app-page-title {
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    padding: 0;
  }
  .page-description {
    font-size: 14px;
    color: #666;
    line-height: 1.5;
    margin-top: 10px;
  }
  .page-content {
    margin-top: 30px;
  }
}
</style>
