<template>
  <v-footer
    :padless=true
  >
    <v-card
      flat
      tile
      width="100%"
      class="blue lighten-4"
    >

      <v-card-text class="black--text d-flex justify-space-between">

        <div>Saransk</div>
        <div>{{ new Date().getFullYear() }} — All rights reserved</div>
        
      </v-card-text>
      
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterBlock',
}
</script>

<style scoped>

</style>