import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    cartLength: 0 // для виджета кол-ва товаров в корзине
  },
  getters: {
      topSales(store){
        let arr = JSON.parse(JSON.stringify(store.list));
        return arr.splice(0, 4)
      },
      goodsHomePage(store){
        let arr = JSON.parse(JSON.stringify(store.list));
        return arr.sort(()=>Math.random()-0.5).splice(0, 4)
      }
  },
  mutations: {
    updateTaskList(store, data){
      store.list = data
    },
    updateCartLength(store, length){
      store.cartLength = length
    }
  },
  actions: {
    async getTaskList(store){
      const response = await axios.get("https://fakestoreapi.com/products");
      store.commit("updateTaskList", response.data);
    },
  },
  modules: {
  }
})
