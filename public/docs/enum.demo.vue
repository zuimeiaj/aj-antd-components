<script>
import { Enum } from 'aj-antd-components'
import CommonCodeHighlightVue from '../CommonCodeHighlight.vue'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['dictionaries']),
  },
  render() {
    return (
      <div>
        a= <Enum value="a" code="demo_enum" />
        <br />
        b= <Enum value="b" code="demo_enum" />
        <br />
        c= <Enum value="c" code="demo_enum" />
        <CommonCodeHighlightVue title="Dictionaries" value={JSON.stringify(this.dictionaries, null, 4)} />
      </div>
    )
  },
}
</script>
