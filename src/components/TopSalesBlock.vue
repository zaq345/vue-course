<template>
  <div class="topSalesBlock">
    <h2 class="topSalesBlock__header">Топ продаж</h2>
    <div class="topSalesBlock__cards-wrapper">
      <v-card
        class="topSalesBlock__card"
        elevation="5"
        v-for="item in topSales"
        :key="item.id"
        v-on:click="itemPage(item.id)"
      >
        <div class="topSalesBlock__card-up">
          <img class="topSalesBlock__card-pic"
            :src="item.image" 
            alt="card-pic"
          >          
        </div>
        <div class="topSalesBlock__card-down">
          <p class="topSalesBlock__card-title">
            {{item.title}}
          </p>
          <div class="topSalesBlock__card-down-bottom">
            <p class="topSalesBlock__card-price">
              {{item.price}}
            </p>
            <button class="topSalesBlock__card-button"
              v-on:click.stop="addItem(item.id)"
            >
              Купить
            </button>
          </div>
        </div>

      </v-card>
    </div>

  </div>
</template>

<script>
import { mapGetters/*, mapMutations, mapActions*/ } from "vuex";
import router from '@/router';

export default {
  name: 'topSalesBlock',
  computed:{
    ...mapGetters([
    'topSales'
    ])
  },
  methods:{
    itemPage(id){
      router.push({path: '/item/'+id});
    },
    addItem(id){
      console.log(id)
      let object = localStorage.getItem('cart')
      if(object){
        let cart = new Map(Object.entries(JSON.parse(object) )); // достает из JSON object обратно map

        if (cart.has(String(id))){
          let count = cart.get(String(id))
          count++;
          cart.set(String(id), count)

        } else {
          cart.set(String(id), 1)
        }

        const obj = Object.fromEntries(cart);
        localStorage.setItem('cart', JSON.stringify(obj));
        this.$store.commit('updateCartLength', cart.size)

      } else {
        let cart = new Map([[String(id), 1]]);

        const obj = Object.fromEntries(cart);
        localStorage.setItem('cart', JSON.stringify(obj));
        this.$store.commit('updateCartLength', cart.size)
      }

      let a = 0

      for(let i = 0; i < this.$store.state.cart_list.length; i++){
        if(id == this.$store.state.cart_list[i].id){
          this.$store.state.cart_list[i].number++
          a = 1
        }
      }

      if (a == 0){
        this.$store.state.cart_list.push({id: id, number: 1})
      }


    }
  }

}
</script>

<style scoped>
.topSalesBlock{
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
.topSalesBlock__header{
  /* margin: auto; */
  font-size: 30px;
  margin-bottom: 20px;
}
.topSalesBlock__cards-wrapper{
  display: flex;
  justify-content:space-around;
}
.topSalesBlock__card{
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  /* background-color: gray; */
  height: 500px;
  width: 400px;
}

.topSalesBlock__card-up{
  /* border-radius: 10px 10px 0 0; */
  display: flex;
}

.topSalesBlock__card-pic{
  /* width: 200px; */
  border-radius: 10px 10px 0 0;
  height: 250px;
  margin: auto;
}

.topSalesBlock__card-down{
  /* display: flex;
  flex-direction: column; */
  position: relative;
  background-color: lightgray;
  height: 250px;
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
}

.topSalesBlock__card-down-bottom{
  position: absolute;
  bottom: 20px;
  display: flex;
  height: 50px;
  justify-content: space-between;
  width: 360px;
  align-items: center;
}

.topSalesBlock__card-price{
  margin: auto 0;
}
.topSalesBlock__card-button{
  margin: auto 0;
  width: 200px;
  height: 50px;
  background-color: lawngreen;
  border-radius: 10px;
}
</style>