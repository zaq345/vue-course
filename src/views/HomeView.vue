<template>
  <div class="home">
    <h1>This is a home page</h1>

    <v-carousel 
      hide-delimiters 
      class="home__carousel"
      cycle
    >
      <v-carousel-item
        class="home__carousel-item"
        v-for="item in this.$store.state.list"
        :key="item.id"
        v-on:click="itemPage(item.id)"
        transition="fade-transition"
        reverse-transition="fade-transition"
      >
        <img class="home__carousel-image" :src="item.image" alt="item-pic">
      </v-carousel-item>
    </v-carousel>

    <!-- //////////////////////////////////////////////////// -->
    <div class="home__goodsBlock">
      <h2 class="home__goodsBlock-header">Товары</h2>
      <div class="home__goodsBlock-cards-wrapper">
        <v-card
          class="home__goodsBlock-card"
          elevation="5"
          v-for="item in goodsHomePage"
          :key="item.id"
          v-on:click="itemPage(item.id)"
        >
          <div class="home__goodsBlock-card-up">
            <img class="home__goodsBlock-card-pic"
              :src="item.image" 
              alt="card-pic"
            >          
          </div>
          <div class="home__goodsBlock-card-down">
            <p class="home__goodsBlock-card-title">
              {{item.title}}
            </p>
            <div class="home__goodsBlock-card-down-bottom">
              <p class="home__goodsBlock-card-price">
                {{item.price}}
              </p>
              <button class="home__goodsBlock-card-button"
                v-on:click.stop
              >
                Купить
              </button>
            </div>
          </div>

        </v-card>
      </div>

    </div>
    <!-- //////////////////////////////////////////////////// -->

    <TopSalesBlock/>
    <NewsBlock/>

  </div>
</template>

<script>
import router from '@/router';
import NewsBlock from '@/components/NewsBlock.vue';
import TopSalesBlock from '@/components/TopSalesBlock.vue';
import { mapGetters/*, mapMutations, mapActions*/ } from "vuex";

export default {
  name: 'HomeComponent',
  components:{
    NewsBlock,
    TopSalesBlock
  },

  computed:{
    ...mapGetters([
      'goodsHomePage'
    ])
  },

  methods:{
    itemPage(id){
      router.push({path: '/item/'+id});
    }
  }
}
</script>

<style scoped>
.home{
  padding: 16px;
}
.home__carousel-item{
  margin: auto;
}
.home__carousel-image{
  max-height: 500px;
}
/* ////////////////////////////// */
.home__goodsBlock{
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
.home__goodsBlock-header{
  font-size: 30px;
  margin-bottom: 20px;
}
.home__goodsBlock-cards-wrapper{
  display: flex;
  justify-content:space-around;
}
.home__goodsBlock-card{
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  height: 500px;
  width: 400px;
}

.home__goodsBlock-card-up{
  display: flex;
}

.home__goodsBlock-card-pic{
  border-radius: 10px 10px 0 0;
  height: 250px;
  max-width: 400px;
  margin: auto;
}

.home__goodsBlock-card-down{
  position: relative;
  background-color: lightgray;
  height: 250px;
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
}

.home__goodsBlock-card-down-bottom{
  position: absolute;
  bottom: 20px;
  display: flex;
  height: 50px;
  justify-content: space-between;
  width: 360px;
  align-items: center;
}

.home__goodsBlock-card-price{
  margin: auto 0;
}
.home__goodsBlock-card-button{
  margin: auto 0;
  width: 200px;
  height: 50px;
  background-color: lawngreen;
  border-radius: 10px;
}
</style>