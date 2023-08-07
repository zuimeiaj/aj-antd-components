<script>
import DataCascaderVue from '@/lib/components/DataCascader.vue'
import ComponentInterface from '@/lib/components/Interface'
import DataSelectVue from '@/lib/components/DataSelect.vue'
export default {
  data() {
    return {
      value: '',
      value1: '',
      value2: '',
      value3: [],
      value4: [],
      value5: [],
      value6: [],
      range: null,
    }
  },
  created() {
    ComponentInterface.select.department = () => {
      return Promise.resolve([
        {
          label: 'label-1',
          value: 1,
        },
        {
          label: 'label-2',
          value: 2,
        },
        {
          label: 'label-3',
          value: 3,
        },
        {
          label: 'label-4',
          value: 4,
        },
      ])
    }
  },
  render() {
    return (
      <div>
        <div>
          {JSON.stringify(this.value)};{JSON.stringify(this.value2)};{JSON.stringify(this.value3)}
        </div>
        <DataSelectVue placeholder="请选择" handler="department" v-model={this.value} />
        <DataSelectVue handler="department" result={'array'} v-model={this.value2} />
        <DataSelectVue handler="department" params={{ mode: 'multiple' }} result={'array'} v-model={this.value3} />

        <DataSelectVue handler="department" displayStyle="checkbox" v-model={this.value4} />
        <DataSelectVue handler="department" displayStyle="radio" result={'array'} v-model={this.value5} />
        <DataSelectVue
          handler="department"
          enum="demo_enum"
          params={{ mode: 'multiple' }}
          result={'array'}
          v-model={this.value6}
        />
      </div>
    )
  },
}
</script>
