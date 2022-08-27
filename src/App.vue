<template>
  <v-app>

    <HeaderBlock/>

    <v-main>
      <router-view/>
    </v-main>

    <FooterBlock/>

  </v-app>
</template>

<script>
import FooterBlock from './components/FooterBlock.vue';
import HeaderBlock from './components/HeaderBlock.vue';

export default {
  name: "App",
  data: () => ({
  //
  }),
  mounted() {
    this.$store.dispatch("getTaskList");
    /////////////////////////////////////
    let obj = localStorage.getItem('cart')
    if(obj){
      const cart = new Map(Object.entries(JSON.parse(obj) )); // достает из JSON object обратно map

      this.$store.commit('updateCartLength', cart.size)
      // console.log('App Mounted, Now cart: ', cart)
    } else{
      this.$store.commit('updateCartLength', 0)
    }
    
  },
  updated() {
    this.$store.dispatch("getTaskList");
    /////////////////////////////////////
    let obj = localStorage.getItem('cart')
    if(obj){
      const cart = new Map(Object.entries(JSON.parse(obj) )); // достает из JSON object обратно map

      this.$store.commit('updateCartLength', cart.size)
      // console.log('App Updated, Now cart: ', cart)
    } else{
      this.$store.commit('updateCartLength', 0)
    }
  },
  components: { FooterBlock, HeaderBlock }
};
</script>
