<template>
  <div class="categories">
    <h1 class="categories__header">Товары</h1>

    <div class="categories__cards-wrapper">
      <v-card
        class="categories__card"
        elevation="5"
        v-for="item in /*this.$store.state.list*/limitedList()"
        :key="item.id"
        v-on:click="itemPage(item.id)"
      >
        <div class="categories__card-up">
          <img class="categories__card-pic"
            :src="item.image" 
            alt="card-pic"
          >          
        </div>
        <div class="categories__card-down">
          <p class="categories__card-title">
            {{item.title}}
          </p>
          <div class="categories__card-down-bottom">
            <p class="categories__card-price">
              {{item.price}}
            </p>
            <button class="categories__card-button"
              v-on:click.stop="addItem(item.id)"
            >
              Купить
            </button>
          </div>
        </div>

      </v-card>
    </div>

    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="countPages"
        circle
      ></v-pagination>
    </div>

    <!-- <button @click="limitedList">test</button> -->

    <TopSalesBlock/>
  </div>
</template>

<script>
import TopSalesBlock from '@/components/TopSalesBlock.vue';
import router from '@/router';
export default{
  components: { TopSalesBlock },
  data(){
    return{
      page: 1
    }
  },
  methods: {
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
    },

    limitedList(){
      let arr = JSON.parse(JSON.stringify(this.$store.state.list))
      // console.log(arr)
      // console.log(this.page)

      return arr.splice((this.page-1)*4, 4)
    }
  },
  computed:{
    countPages(){
      return Math.ceil(this.$store.state.list.length / 4)
    },    
  }
}
</script>

<style scoped>
.categories{
  padding: 16px;
}
.categories__header{
  margin-bottom: 20px;
}

.categories__cards-wrapper{
  display: flex;
  justify-content:space-around;
  flex-wrap: wrap;
}
.categories__card{
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  height: 500px;
  width: 400px;
  margin-right: 30px;
  margin-bottom: 40px;
}
.categories__card:nth-child(4n){
  margin-right: 0;
}

.categories__card-up{
  display: flex;
}

.categories__card-pic{
  border-radius: 10px 10px 0 0;
  height: 250px;
  margin: auto;
  max-width: 400px;
}

.categories__card-down{
  position: relative;
  background-color: lightgray;
  height: 250px;
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
}

.categories__card-down-bottom{
  position: absolute;
  bottom: 20px;
  display: flex;
  height: 50px;
  justify-content: space-between;
  width: 360px;
  align-items: center;
}

.categories__card-price{
  margin: auto 0;
}
.categories__card-button{
  margin: auto 0;
  width: 200px;
  height: 50px;
  background-color: lawngreen;
  border-radius: 10px;
}
</style>