<template>
  <div class="cart">
    <h1>This is a cart page</h1>
    <TopSalesBlock/>
  </div>
</template>

<script>
import TopSalesBlock from '@/components/TopSalesBlock.vue';
export default{
    components: { TopSalesBlock }
}
</script>

<style scoped>
.cart{
  padding: 16px;
}
</style>