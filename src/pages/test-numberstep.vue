<script>
import NumberStepInputVue from '@/lib/components/NumberStepInput.vue'
export default {
  data() {
    return {
      value: undefined,
    }
  },
  render() {
    return (
      <div>
        <NumberStepInputVue v-model={this.value} />
      </div>
    )
  },
}
</script>
