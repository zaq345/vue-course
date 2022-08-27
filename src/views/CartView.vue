<template>
  <div class="cart">
    <h1 class="cart__header">Ваша корзина</h1>

    <div class="cart__main">
      <div class="cart__cards">
        <v-card
          class="cart__card"
          elevation="5"
          v-for="item in cart_list"
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
                {{(list[item.id-1].price * item.number).toFixed(2)}}
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
        <button class="cart__confirm-btn">Оформить</button>
      </div>
    </div>

    <TopSalesBlock/>

  </div>
</template>

<script>
import TopSalesBlock from '@/components/TopSalesBlock.vue';
import router from '@/router';
// import { /*mapGetters,*/ mapMutations, /*mapActions*/ } from "vuex";

export default{
  components: { TopSalesBlock },
  data(){
    return{
      list: [],
      cart_list: []
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
    // console.log('updated hook')
    // this.list = []
    // this.cart_list = []
    // this.list = JSON.parse(JSON.stringify(this.$store.state.list));

    // let object = localStorage.getItem('cart')
    // let cart = new Map(Object.entries(JSON.parse(object) )); // достает из JSON object обратно map
    // for(let i = 1; i <= 20; i++){
    //   if(cart.has(String(i))){
    //     this.cart_list.push({id: i, number: cart.get(String(i))} )
    //   }
    // }
  },
  methods:{
    itemPage(id){
      router.push({path: '/item/'+id});
    },
    totalAmount(){
      let sum = 0;
      for(let i = 0; i < this.cart_list.length; i++){
        sum = sum + (this.list[this.cart_list[i].id-1].price * this.cart_list[i].number)
      }
      return Math.ceil(sum).toFixed(2)
    },

    countInc(id){
      let object = localStorage.getItem('cart')
      let cart = new Map(Object.entries(JSON.parse(object) )); // достает из JSON object обратно map
      for(let i = 1; i <= this.list.length; i++){
        if(i == id){
          for(let j = 0; j < this.cart_list.length; j++){
            if(this.cart_list[j].id == i){ 
              this.cart_list[j].number++
              if(this.cart_list[j].number > 99){
                this.cart_list[j].number = 99
              }
              cart.set(String(id), this.cart_list[j].number)
            }
          }
        }
      }
      const obj = Object.fromEntries(cart);
      localStorage.setItem('cart', JSON.stringify(obj));
    },
    countDec(id){
      let object = localStorage.getItem('cart')
      let cart = new Map(Object.entries(JSON.parse(object) )); // достает из JSON object обратно map
      for(let i = 1; i <= this.list.length; i++){
        if(i == id){
          for(let j = 0; j < this.cart_list.length; j++){
            if(this.cart_list[j].id == i){
              this.cart_list[j].number--
              if(this.cart_list[j].number < 1){
                cart.delete(String(id))
                this.cart_list.splice(j, 1)
              } else {
                cart.set(String(id), this.cart_list[j].number)
              }
            }
          }
        }
      }
      const obj = Object.fromEntries(cart);
      localStorage.setItem('cart', JSON.stringify(obj));
      this.$store.commit('updateCartLength', cart.size)
    }

  },
  computed:{

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
  /* justify-content: space-between; */
  flex-wrap: wrap;

}
/* //////////////////////////// */
.cart__card{
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  /* background-color: gray; */
  height: 500px;
  width: 400px;
  /* margin: auto; */
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
/* //////////////////////////// */
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
/* //////////////////////////// */

.cart__confirm{
  display: flex;
  flex-direction: column;
}
.cart__price{
  font-size: 40px;
  font-weight: bold;
}
.cart__confirm-btn{
  background-color: lawngreen;
  border-radius: 10px;
  height: 75px;
  width: 350px;
  font-size: 25px;
  font-weight: bold;
}
</style>