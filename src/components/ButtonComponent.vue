<script>
export default {
  name: 'ButtonComponent',
  render: function (createElement) {
    return createElement(
      // 'h' + this.level,   // имя тега
      // this.$slots.default // массив дочерних элементов
      this.tag,
      this.$slots.default
    )
  },
  props: {
    tag: {
      type: String,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
