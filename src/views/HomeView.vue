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

    <TopSalesBlock/>
    <NewsBlock/>

  </div>
</template>

<script>
import router from '@/router';
import NewsBlock from '@/components/NewsBlock.vue';
import TopSalesBlock from '@/components/TopSalesBlock.vue';

// import { mapGetters/*, mapMutations, mapActions*/ } from "vuex";


export default {
  name: 'HomeComponent',
  components:{
    NewsBlock,
    TopSalesBlock
  },

  computed:{
    // ...mapGetters([
    //   'topSales'
    // ])
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
</style>