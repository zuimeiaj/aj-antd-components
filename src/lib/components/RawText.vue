<script>
export default {
  name: 'RawText',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  render() {
    let texts = this.value?.split(/\n/) || []

    return (
      <div>
        {texts.map((item) => (
          <div class="raw-text-line">{item}</div>
        ))}
      </div>
    )
  },
}
</script>
