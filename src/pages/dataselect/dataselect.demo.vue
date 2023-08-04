<script>
import { DataSelect } from 'aj-antd-components'
import { Card } from 'ant-design-vue'
export default {
  data() {
    return {
      data: [],
      array: [],
      normal: '',
    }
  },
  render() {
    return (
      <div>
        <Card title="实现handler函数返回含有label和value 数组对象（多选）">
          <DataSelect params={{ mode: 'multiple' }} v-model={this.data} handler="department" />
        </Card>
        <Card title="result=array,返回值是一个数组,[value,label],当后端接口需要选中的值和label时设置result=array即可">
          <DataSelect result="array" v-model={this.array} handler="department" />
        </Card>
        <Card title="普通使用">
          <DataSelect v-model={this.normal} handler="department" />
        </Card>
      </div>
    )
  },
}
</script>
