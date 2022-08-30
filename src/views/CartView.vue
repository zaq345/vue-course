<template>
  <div class="cart">
    <h1 class="cart__header">Ваша корзина</h1>

    <div class="cart__main">
      <p v-if="cart_list.length == 0">Ваша корзина пуста</p>
      <div class="cart__cards">
        <v-card
          class="cart__card"
          elevation="5"
          v-for="item in /*returnCartList*/ this.$store.state.cart_list /*cart_list*/"
          :key="item.id"
          v-on:click="itemPage(item.id)"
        >
          <div class="cart__card-up">
            <img class="cart__card-pic"
              :src="list[item.id-1].image" 
              alt="card-pic"
            >          
          </div>
          <div class="cart__card-down">
            <p class="cart__card-title">
              {{list[item.id-1].title}}
            </p>
            <div class="cart__card-down-bottom">
              <p class="cart__card-price">
                {{currentPrice(list[item.id-1].price, item.number)}}
              </p>
              <div class="cart__card-counter" v-on:click.stop>
                <button class="item__counter counter-minus" v-on:click="countDec(item.id)">-</button>
                <input  class="item__counter counter-num" type="number" v-model="item.number" disabled>
                <button class="item__counter counter-plus" v-on:click="countInc(item.id)">+</button>
              </div>
            </div>
          </div>

        </v-card>
      </div>

      <div class="cart__confirm">
        <p class="cart__price">Сумма: {{totalAmount()}}</p>
        <!-- <button class="cart__confirm-btn">Оформить</button> -->

        <!-- ///////////////////////////////////////////////////////////// -->
        <div class="text-center">
          <v-dialog
            v-model="dialog"
            width="600"
            persistent
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="cart__confirm-btn"
                v-bind="attrs"
                v-on="on"
                :disabled="cart_list.length == 0"
              >
                Оформить
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Оформить заказ
              </v-card-title>

              <v-card-text class="cart__order-form" v-if="order">
                <input class="cart__order-input" type="text" placeholder="Имя" v-model="name">
                <input class="cart__order-input" type="text" placeholder="Номер телефона" v-model="phone" @keypress="onlyNumbers">
                <input class="cart__order-input" type="text" placeholder="Адрес" v-model="addres">
                <input class="cart__order-input" type="text" placeholder="Город" v-model="city">
              </v-card-text>

              <v-card-text class="cart__order-form" v-if="!order">
                <p class="cart__order-form-thanks align-self-center">Спасибо за заказ!</p>
                <p class="cart__order-form-thanks align-self-center">Номер вашего заказа №1234</p>
                <p class="cart__order-form-thanks align-self-center">Наш менеджер свяжется с вами в ближайшее время</p>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  @click="dialog = false"
                  v-if="order"
                >
                  Отмена
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="changeOrder(), confrimOrder()"
                  v-bind:disabled="buttonDisabled"
                  v-if="order"
                >
                  Оформить
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="dialog = false"
                  v-if="!order"
                >
                  Ок
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
    <!-- ///////////////////////////////////////////////////////////// -->

    <TopSalesBlock/>

  </div>
</template>

<script>
import TopSalesBlock from '@/components/TopSalesBlock.vue';
import router from '@/router';
import axios from 'axios';
import { mapGetters/*, mapMutations, mapActions*/ } from "vuex";

export default{
  components: { TopSalesBlock },
  data(){
    return{
      list: [],
      cart_list: [],

      dialog: false,
      name: '',
      city: '',
      phone: '',
      addres: '',
      order: true
    }
  },
  mounted(){
    this.list = JSON.parse(JSON.stringify(this.$store.state.list));

    let object = localStorage.getItem('cart')
    let cart = new Map(Object.entries(JSON.parse(object) )); // достает из JSON object обратно map
    for(let i = 1; i <= 20; i++){
      if(cart.has(String(i))){
        this.cart_list.push({id: i, number: cart.get(String(i))} )
      }
    }
  },
  updated(){
    if(this.phone.length>=12){
      this.phone = this.phone.slice(0, 11)
    }
    // this.cart_list = []
  },
  methods:{
    itemPage(id){
      router.push({path: '/item/'+id});
    },
    totalAmount(){
      let sum = 0;
      for(let i = 0; i < this.$store.state.cart_list.length; i++){
        sum = sum + (this.list[this.$store.state.cart_list[i].id-1].price * this.$store.state.cart_list[i].number)
      }
      return Math.ceil(sum).toFixed(2)
    },

    countInc(id){
      // let object = localStorage.getItem('cart')
      // let cart = new Map(Object.entries(JSON.parse(object) )); // достает из JSON object обратно map
      // for(let i = 1; i <= this.list.length; i++){
      //   if(i == id){
      //     for(let j = 0; j < this.cart_list.length; j++){
      //       if(this.cart_list[j].id == i){ 
      //         this.cart_list[j].number++
      //         if(this.cart_list[j].number > 99){
      //           this.cart_list[j].number = 99
      //         }
      //         cart.set(String(id), this.cart_list[j].number)
      //       }
      //     }
      //   }
      // }
      // const obj = Object.fromEntries(cart);
      // localStorage.setItem('cart', JSON.stringify(obj));
      this.$store.commit('countInc', id)
    },
    countDec(id){
      this.$store.commit('countDec', id)
      // let object = localStorage.getItem('cart')
      // let cart = new Map(Object.entries(JSON.parse(object) )); // достает из JSON object обратно map
      // for(let i = 1; i <= this.list.length; i++){
      //   if(i == id){
      //     for(let j = 0; j < this.cart_list.length; j++){
      //       if(this.cart_list[j].id == i){
      //         this.cart_list[j].number--
      //         if(this.cart_list[j].number < 1){
      //           cart.delete(String(id))
      //           this.cart_list.splice(j, 1)
      //         } else {
      //           cart.set(String(id), this.cart_list[j].number)
      //         }
      //       }
      //     }
      //   }
      // }
      // const obj = Object.fromEntries(cart);
      // localStorage.setItem('cart', JSON.stringify(obj));
      // this.$store.commit('updateCartLength', cart.size)
    },
    currentPrice(cost, value){
      return (cost * value).toFixed(2)
    },
    confrimOrder(){
      axios.post('http://localhost:3000/orders', {
        id: Date.now(),
        name: this.name,
        phone: this.phone,
        city: this.city,
        addres: this.addres,
        items: this.cart_list
      })
      this.cart_list = []
      this.$store.commit('updateCartLength', 0)
      this.$store.commit('deleteCart')
      localStorage.removeItem('cart')
      this.name = ''
      this.phone = ''
      this.city = ''
      this.addres = ''
    },
    changeOrder(){
      this.order = !this.order
    },
    onlyNumbers(event) {
        let keyCode = event.keyCode ? event.keyCode : event.which;
         if (keyCode < 48 || keyCode > 57) {
            event.preventDefault();
        }
    }

  },
  computed:{
    buttonDisabled(){
      return (this.name.trim().length == 0) || (this.city.trim().length == 0) || (this.phone.trim().length == 0) || (this.addres.trim().length == 0) 
    },
    ...mapGetters([
    'returnCartList'
    ])
  }

}
</script>

<style scoped>
.cart{
  padding: 16px;
}
.cart__header{
  margin-bottom: 20px;
}
.cart__main{
  display: flex;
  justify-content: space-between;
}
.cart__cards{
  display: flex;
  width: 1400px;
  flex-wrap: wrap;

}
.cart__card{
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  height: 500px;
  width: 400px;
  margin-right: 100px;
  margin-bottom: 50px;
}
.cart__card:nth-child(3n){
  margin-right: 0;
}
.cart__card-up{
  /* border-radius: 10px 10px 0 0; */
  display: flex;
}
.cart__card-pic{
  max-width: 400px;
  border-radius: 10px 10px 0 0;
  height: 250px;
  margin: auto;
}
.cart__card-down{
  /* display: flex;
  flex-direction: column; */
  position: relative;
  background-color: lightgray;
  height: 250px;
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
}
.cart__card-down-bottom{
  position: absolute;
  bottom: 20px;
  display: flex;
  height: 50px;
  justify-content: space-between;
  width: 360px;
  align-items: center;
}
.cart__card-price{
  margin: auto 0;
}
.cart__card-counter{
  display: flex;
}
.counter-plus, .counter-minus{
  font-size: 30px;
  width: 75px;
  border: 2px solid gray;
  background-color: white;
}
.counter-minus{
  border-radius: 10px 0 0 10px;
  border-right: 0;
}
.counter-plus{
  border-radius: 0 10px 10px 0;
  border-left: 0;
}
.counter-num{
  background-color: white;
  font-size: 40px;
  padding-left: 17px;
  width: 75px;
  border-top: 2px solid gray;
  border-bottom: 2px solid gray;
}
.cart__confirm{
  display: flex;
  flex-direction: column;
}
.cart__price{
  font-size: 40px;
  font-weight: bold;
}
.cart__confirm-btn{
  background-color: lawngreen !important;
  border-radius: 10px;
  height: 75px !important;
  width: 350px;
  font-size: 25px;
  font-weight: bold;
}
.cart__order-form{
  display: flex;
  flex-direction: column;
}
.cart__order-input{
  width: 95%;
  margin: auto;
  margin-top: 10px;
  border: 1px solid gray;
  border-radius: 10px;
  height: 50px;
  padding: 10px;
}
.cart__order-form-thanks{
  margin-top: 20px;
  font-size: 20px;
}
.cart__order-form-thanks:nth-child(2n){
  font-size: 30px;
  font-weight: bold;
}
</style>