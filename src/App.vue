<script>
import { Layout, Menu, BackTop, LocaleProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/lib/locale/zh_CN'
import { ComponentList } from './components'
export default {
  data() {
    return {
      menus: ComponentList.slice(),
    }
  },
  methods: {
    handleClick(e) {
      if (this.$route.path.slice(1) == e.key) return
      this.$router.push({
        path: '/' + e.key,
      })
    },
  },
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Layout id="app" class="app-layout">
          <Layout.Header class="app-header" style={{ background: '#ffffff', padding: '0 15px' }}>
            <h1>
              <img height="40px" class="appicon" src="/favicon.ico" />
              <span class="gutter-left"> 一套基于Ant-design-vue（v1.7.8）的组件库(vue2 JSX版，json配置)</span>
            </h1>
          </Layout.Header>
          <Layout>
            <Layout.Sider class="app-sider" theme="light">
              <Menu theme="light" onClick={this.handleClick}>
                {this.menus.map((item) => {
                  return <Menu.Item key={item.toLowerCase()}>{item}</Menu.Item>
                })}
              </Menu>
            </Layout.Sider>
            <Layout.Content class="app-page-views">
              <router-view></router-view>
              <BackTop target={() => document.querySelector('.app-page-views')} />
            </Layout.Content>
          </Layout>
          <BackTop />
        </Layout>
      </LocaleProvider>
    )
  },
}
</script>

<style lang="less">
.ant-layout {
  background: #f8f8f8 !important;
}
.app-layout {
  height: 100vh;
  overflow-y: auto;
  .app-sider,
  .app-page-views {
    overflow-y: auto;
  }
}
.app-header {
  top: 0;
  width: 100%;
  z-index: 10;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
}

div.ant-card-bordered {
  margin-top: 15px;
}

.app-page {
  background: #f8f8f8;
  min-height: calc(100vh - 50px);
}
.gutter {
  padding: 15px;
}
.gutter-v {
  margin: 25px 0;
}
</style>
