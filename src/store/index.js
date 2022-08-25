import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    counter: 1
  },
  getters: {
      topSales(store){
        let arr = JSON.parse(JSON.stringify(store.list));
        return arr.splice(0, 4)
        // return store.list.filter(item => ((item.desc.indexOf(search) !== -1) && ((item.done == false && (store.picked1 == 1 || store.picked1 == 3)) || (item.done == true && (store.picked1 == 1 || store.picked1 == 2)) ) ) );
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
