<script>
export default {
  name: 'HookMixin',
  // created - выводит в консоль “component created {{name}}”
  // mounted - выводит в консоль “component mounted {{name}}”
  // updated - выводит в консоль “component updated {{name}}”
  // this.$vnode.tag
  created(){
    console.log('component created ', this.$vnode.tag)
  },
  mounted(){
    console.log('component mounted ', this.$vnode.tag)
  },
  updated(){
    console.log('component updated ', this.$vnode.tag)
  }

}
</script>