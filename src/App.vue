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
  },
  updated() {
      this.$store.dispatch("getTaskList");
  },
  components: { FooterBlock, HeaderBlock }
};
</script>
