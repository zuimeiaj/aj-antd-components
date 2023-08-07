<script>
import DataCascaderVue from '@/lib/components/DataCascader.vue'
import ComponentInterface from '@/lib/components/Interface'
export default {
  data() {
    return {
      value: '',
      value1: '',
      value2: '',
      value3: '',
      range: null,
    }
  },
  created() {
    ComponentInterface.cascader.department = () => {
      return Promise.resolve([
        {
          label: '1',
          value: 1,
          children: [
            { label: '1-1', value: 11 },
            { label: '1-2', value: 12 },
          ],
        },
        {
          label: '2',
          value: 2,
          children: [
            { label: '2-1', value: 21 },
            { label: '3-2', value: 22 },
          ],
        },
      ])
    }
  },
  render() {
    return (
      <div>
        <div>
          {JSON.stringify(this.value)};{JSON.stringify(this.value1)};{JSON.stringify(this.value2)};
          {JSON.stringify(this.value3)}
        </div>
        <DataCascaderVue handler="department" v-model={this.value} />
        <DataCascaderVue handler="department" array={true} v-model={this.value1} />
        <DataCascaderVue handler="department" result={'array'} v-model={this.value2} />
        <DataCascaderVue handler="department" array={true} result={'array'} v-model={this.value3} />
      </div>
    )
  },
}
</script>
