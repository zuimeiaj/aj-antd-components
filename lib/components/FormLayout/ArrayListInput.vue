<script>
import FormLayout from './FormLayout.vue'
import { Button, Icon } from 'ant-design-vue'
import { generateuid, updateArrayItem } from '../../utils'
export default {
  props: {
    formField: String,
    addFormClass: String,
    addFormText: {
      type: String,
      default: '添加',
    },
    addFormStyle: {
      type: Object,
      default: () => ({ type: 'primary', icon: 'add' }),
    },
    value: {
      type: Array,
      default: () => [],
    },
    list: Function,
    uidkey: {
      type: String,
      default: 'id',
    },
  },
  data() {
    return {
      columns: [],
    }
  },
  computed: {
    forms() {
      return this.value.map((item) => {
        return {
          columns: this.list(item),
          key: item[this.uidkey] || this.getIdKey(),
        }
      })
    },
  },
  methods: {
    validate() {
      return Promise.all(
        this.forms.map((item) => {
          return this.$refs[item.key].validate()
        })
      )
    },
    handleChange(index, { form }) {
      let value = updateArrayItem(this.value, index, (item) => ({ ...item, ...form }))
      this.$emit('change', value)
    },
    getIdKey() {
      return generateuid()
    },
    addForm() {
      let data = this.list().reduce((a, b) => {
        a[b.field] = ''
        return a
      }, {})
      data[this.uidkey] = this.getIdKey()
      this.$emit('change', this.value.concat(data))
    },
    removeForm(index) {
      let value = updateArrayItem(this.value, index, () => null).filter(Boolean)
      this.$emit('change', value)
    },
  },
  render() {
    return (
      <div class="array-list-forms">
        {this.forms.map((item, index) => {
          return (
            <div class="array-list-item" key={item.key}>
              <FormLayout
                ref={item.key}
                name={'array-form-' + item.key}
                onChange={(formdata) => this.handleChange(index, formdata)}
                columns={item.columns}
              ></FormLayout>
              <Icon class="remove-form-icon" type="close-circle" nativeOnClick={() => this.removeForm(index)} />
            </div>
          )
        })}
        <div class={this.addFormClass}>
          <Button class="gutter-top" onClick={() => this.addForm()} props={this.addFormStyle}>
            {this.addFormText}
          </Button>
        </div>
      </div>
    )
  },
}
</script>

<style lang="less"></style>
