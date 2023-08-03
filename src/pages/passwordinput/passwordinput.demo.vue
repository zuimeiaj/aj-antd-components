<script>
import { FormTableLayoutFields } from 'aj-antd-components'

export default {
  render() {
    const handleSearch = (value) => {
      console.log(value)
    }
    const fields = [
      { label: '条件', field: 'a' },
      { label: '条件1', field: 'a1' },
      { label: '条件2', field: 'a2' },
      { label: '条件3', field: 'a3' },
    ]
    return <FormTableLayoutFields fields={fields} onSearch={handleSearch} onReset={handleSearch} />
  },
}
</script>
