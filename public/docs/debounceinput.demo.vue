<script>
import { DebounceInput } from 'aj-antd-components'
import { Card } from 'ant-design-vue'

export default {
  data() {
    return {
      number: 1,
      amount: 100, // 单位 分
      percent: 0.76, // 0 - 1
      text: '123',
    }
  },
  render() {
    return (
      <div>
        <Card title="Number">
          <DebounceInput
            v-model={this.number}
            trimStartZero={true}
            type="number"
            min={0}
            decimal={4}
            maxlength={11}
            showLimit={true}
          />
        </Card>
        <Card title="Percentage">
          <DebounceInput v-model={this.percent} suffix="%" type="percentage" max={100} min={0} />
        </Card>
        <Card title="Amount">
          <DebounceInput v-model={this.amount} suffix="元" type="amount" max={1000} min={0} />
        </Card>
        <Card title="Text">
          <DebounceInput trimOnPaste={true} trim={false} v-model={this.text} maxlength={20} showLimit={true} min={0} />
        </Card>
      </div>
    )
  },
}
</script>
