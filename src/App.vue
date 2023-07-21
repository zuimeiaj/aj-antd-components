<script>
import { Layout, Menu } from 'ant-design-vue'
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
      <Layout id="app">
        <Layout.Header>
          <h1 style="color:#ffffff">aj-antd-components</h1>
        </Layout.Header>
        <Layout.Content>
          <Layout>
            <Layout.Sider>
              <Menu onClick={this.handleClick}>
                {this.menus.map((item) => {
                  return <Menu.Item key={item.toLowerCase()}>{item}</Menu.Item>
                })}
              </Menu>
            </Layout.Sider>
            <Layout.Content>
              <router-view></router-view>
            </Layout.Content>
          </Layout>
        </Layout.Content>
      </Layout>
    )
  },
}
</script>

<style lang="less">
.app-page {
  background: #f8f8f8;
  min-height: calc(100vh - 50px);
}
.gutter {
  padding: 15px;
}
</style>
