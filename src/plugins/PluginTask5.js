export default {
  install: (Vue, options) => {

    Vue.directive('color', function (el, binding) {
        el.style.backgroundColor = binding.value
    })
    Vue.directive('blur', function (el) {
      el.onblur = function(){
        console.log(el + ' this element has lost focus')
      }
    })

    Vue.filters('convert', function(value){
      return value.toLocaleString() + ' руб'
    })


    Vue.mixin({
      name: 'HookMixin',

      created(){
        console.log('component created ', this.$vnode.tag)
      },
      mounted(){
        console.log('component mounted ', this.$vnode.tag)
      },
      updated(){
        console.log('component updated ', this.$vnode.tag)
      }

    })
  }
}