import ButtonComponent from '../components/ButtonComponent.vue'

export default {
  install: (Vue) => {

    Vue.component('ButtonComponent', ButtonComponent)

    Vue.directive('color', function (el, binding) {
        el.style.backgroundColor = binding.value
    })
    Vue.directive('blur', function (el) {
      el.onblur = function(){
        console.log(el + ' this element has lost focus')
      }
    })

    Vue.filter('convert', 
      value => value.toLocaleString() + ' руб'
      // return value.toLocaleString() + ' руб'
    )

  }
}