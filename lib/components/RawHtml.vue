<template>
  <span v-html="value"></span>
</template>

<script>
export default {
  name: 'RawHtml',
  props: ['value'],
}
</script>
