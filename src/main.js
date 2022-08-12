import Vue from 'vue'
import App from './App.vue'
import PluginTask5 from './plugins/PluginTask5'

Vue.config.productionTip = false

Vue.use(PluginTask5)

new Vue({
  render: h => h(App),
}).$mount('#app')
