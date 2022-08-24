<template>
  <div class="news">
    <h1>This is a news page</h1>
    <NewsBlock/>
  </div>
</template>


<script>
import NewsBlock from '@/components/NewsBlock.vue';
export default {
  name: 'NewsView',
  components:{
    NewsBlock
  }
}
</script>

<style scoped>
.news{
  padding: 16px;
}
</style>