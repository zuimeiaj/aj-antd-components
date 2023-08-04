<script>
import { DataDictionary } from 'aj-antd-components'
import { Card } from 'ant-design-vue'

/****************************************
 * @example
 * store.getters:{
 *
 *  dictionaries:{
 *    demo_enum:{},
 *    demo_enum_array:[]
 *  }
 * }
 **************************************/

export default {
  data() {
    return {
      array: [],
      value: '',
      mult: [],
    }
  },
  render() {
    return (
      <div>
        <Card title="返回路径的最后一个值">
          <DataDictionary v-model={this.value} code="demo_enum" />
        </Card>

        <Card title="返回值为 [value,label]">
          <DataDictionary array={true} v-model={this.array} code="demo_enum" />
        </Card>

        <Card title="多选">
          <DataDictionary v-model={this.mult} mode="multiple" code="demo_enum" />
        </Card>

        <Card title="radio样式">
          <DataDictionary displayStyle="radio" v-model={this.value} code="demo_enum" />
        </Card>
      </div>
    )
  },
}
</script>
