import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    cartLength: 0, // для виджета кол-ва товаров в корзине
    cart_list: [],
  },
  getters: {
      topSales(store){
        let arr = JSON.parse(JSON.stringify(store.list));
        return arr.splice(0, 4)
      },
      goodsHomePage(store){
        let arr = JSON.parse(JSON.stringify(store.list));
        return arr.sort(()=>Math.random()-0.5).splice(0, 4)
      },
      returnCartList(store){
        return store.cart_list
      }
  },
  mutations: {
    updateTaskList(store, data){
      store.list = data
    },
    updateCartLength(store, length){
      store.cartLength = length
    },
    loadCart(store){
      // console.log(store)
      let object = localStorage.getItem('cart')
      let cart = new Map(Object.entries(JSON.parse(object) )); // достает из JSON object обратно map
      for(let i = 1; i <= 20; i++){
        if(cart.has(String(i))){
          store.cart_list.push({id: i, number: cart.get(String(i))} )
        }
      }
      console.log('loadCart: ', store.cart_list)
    },
    updateCart(store){
      // console.log(store)
      store.cart_list.length = 0
      let object = localStorage.getItem('cart')
      let cart = new Map(Object.entries(JSON.parse(object) )); // достает из JSON object обратно map
      for(let i = 1; i <= 20; i++){
        if(cart.has(String(i))){
          store.cart_list.push({id: i, number: cart.get(String(i))} )
        }
      }
      console.log('updateCart: ', store.cart_list)
    },
    countInc(store, id){
      let object = localStorage.getItem('cart')
      let cart = new Map(Object.entries(JSON.parse(object) )); // достает из JSON object обратно map
      for(let i = 1; i <= store.list.length; i++){
        if(i == id){
          for(let j = 0; j < store.cart_list.length; j++){
            if(store.cart_list[j].id == i){ 
              store.cart_list[j].number++
              if(store.cart_list[j].number > 99){
                store.cart_list[j].number = 99
              }
              cart.set(String(id), store.cart_list[j].number)
            }
          }
        }
      }
      const obj = Object.fromEntries(cart);
      localStorage.setItem('cart', JSON.stringify(obj));
      // console.log('cart will be updated')
      // store.commit('updateCart')
    },
    countDec(store, id){
      let object = localStorage.getItem('cart')
      let cart = new Map(Object.entries(JSON.parse(object) )); // достает из JSON object обратно map
      for(let i = 1; i <= store.list.length; i++){
        if(i == id){
          for(let j = 0; j < store.cart_list.length; j++){
            if(store.cart_list[j].id == i){
              store.cart_list[j].number--
              if(store.cart_list[j].number < 1){
                cart.delete(String(id))
                store.cart_list.splice(j, 1)
              } else {
                cart.set(String(id), store.cart_list[j].number)
              }
            }
          }
        }
      }
      const obj = Object.fromEntries(cart);
      localStorage.setItem('cart', JSON.stringify(obj));
      // store.commit('updateCartLength', cart.size)
      store.cartLength = cart.size
      // console.log('cart will be updated')
      // store.commit('updateCart')
    },
    deleteCart(store){
      store.cart_list = []
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
