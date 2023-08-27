<script>
import DataCascaderVue from '@/lib/components/DataCascader.vue'
import ComponentInterface from '@/lib/components/Interface'
import DataSelectVue from '@/lib/components/DataSelect.vue'
export default {
  data() {
    return {
      value: [],
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
      return Promise.resolve(
        new Array(100).fill(0).map((item, index) => {
          return { label: 'label-' + index, value: index }
        })
      )
    }
  },
  render() {
    return (
      <div>
        {this.value}
        <DataSelectVue params={{ mode: 'multiple' }} v-model={this.value} handler="department" />
      </div>
    )
  },
}
</script>
