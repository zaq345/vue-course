<template>
  <div class="categories">
    <h1>This is a categories page</h1>
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
.categories{
  padding: 16px;
}
</style>