<script>
import { Layout, Menu } from 'ant-design-vue'
export default {
  methods: {
    handleClick(e) {
      this.$router.push({
        path: '/' + e.key,
      })
    },
  },
  render() {
    return (
      <Layout id="app">
        <Layout.Header>
          <h1 style="color:#ffffff">Yoo biz components</h1>
        </Layout.Header>
        <Layout.Content>
          <Layout>
            <Layout.Sider>
              <Menu onClick={this.handleClick}>
                <Menu.Item key="formlayout">Formlayout</Menu.Item>
                <Menu.Item key="input">Input</Menu.Item>
                <Menu.Item key="data-select">Data-select</Menu.Item>
                <Menu.Item key="data-dictionary">Data dictionary</Menu.Item>
                <Menu.Item key="data-cascader">Data cascader</Menu.Item>
                <Menu.Item key="date">Date picker</Menu.Item>
                <Menu.Item key="range">Date range picker</Menu.Item>
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
