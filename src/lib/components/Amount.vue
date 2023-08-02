<script>
import OSREC from 'currencyformatter.js'

export default {
  name: 'Amount',
  props: ['value'],
  render() {
    return <span>{OSREC.format(this.value || 0, { currency: 'CNY' })}</span>
  },
}
</script>
