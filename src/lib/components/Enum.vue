<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Enum',
  props: {
    type: String,
    value: String,
    code: String,
  },
  computed: {
    ...mapGetters(['dictionaries']),
    enum() {
      return this.dictionaries[this.type || this.code] || {}
    },
  },
  render() {
    let items = this.value?.split(',') || []
    return <span>{items.map((item) => this.enum[item]).join(',')}</span>
  },
}
</script>
