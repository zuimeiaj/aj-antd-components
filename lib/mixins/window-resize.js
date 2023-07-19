import debounce from 'debounce'

export default {
  mounted() {
    this._onWindowResize = debounce((e) => {
      this.onWindowResize(e)
    }, 300)
    window.addEventListener('resize', this._onWindowResize, false)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this._onWindowResize, false)
  },
}
