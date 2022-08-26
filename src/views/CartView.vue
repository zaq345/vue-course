<template>
  <div class="cart">
    <h1>This is a cart page</h1>

    <!-- ////////////////////////////// -->
    <button @click="testAdd()">add new item to cart</button>
    <!-- ////////////////////////////// -->


    <TopSalesBlock/>



  </div>
</template>

<script>
import TopSalesBlock from '@/components/TopSalesBlock.vue';
// import { /*mapGetters,*/ mapMutations, /*mapActions*/ } from "vuex";

export default{
  components: { TopSalesBlock },
  methods:{
    // ...mapMutations([
    //   'updateCartLength'
    // ]),
    testAdd(){
      let arr = new Map([['1', 5]])
      // console.log(arr)
      // console.log(arr.get('1'))

      const obj = Object.fromEntries(arr); // превращает map  в object
      // console.log(obj)
      // console.log(JSON.stringify(obj))

      localStorage.setItem('cart', JSON.stringify(obj));

      this.$store.commit('updateCartLength', arr.size)



      // let obj1 = localStorage.getItem('cart')

      // const arr1 = new Map(Object.entries(JSON.parse(obj1) )); // достает из JSON object обрано map
      // console.log(arr1)
      // console.log(arr1.get('1'))


      // const arr1 = new Map(Object.entries(obj));  // достает из JSON object обрано map
      // console.log(arr1)
      // console.log(arr1.get('1'))


      // localStorage.setItem('cart', JSON.stringify(obj));
    }
  },
}
</script>

<style scoped>
.cart{
  padding: 16px;
}
</style>