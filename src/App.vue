<template>
  <v-app>
    <v-app-bar
      app
      class="header blue lighten-4 black--text nav"
    >
      <div class="nav__wrapper d-flex justify-space-between">
        <div class="nav__left d-flex align-center">
          <router-link class="nav__link d-flex" to="/">
            <img class="nav__logo" src="@/assets/logo.png" alt="logo">
            <h2 class="align-self-center">VUE-SPA-SHOP</h2>
          </router-link>
          <router-link class="nav__link" to="/categories">Категории</router-link>
          <router-link class="nav__link" to="/news">Новости</router-link>
          <router-link class="nav__link" to="/about">О нас</router-link>
        </div>
        <div class="nav__right d-flex align-center">
          <a class="nav__phone" href="tel:+7 (495) 123-45-67">+7 (495) 123-45-67</a>
          <router-link class="nav__link" to="/cart">
            <v-icon x-large>mdi-cart</v-icon>
          </router-link>
        </div>
      </div>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

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

  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>


<style>
.nav__wrapper{
  width: 100%;
}
.nav__link, .nav__phone{
  font-weight: bold;
  font-size: 20px;
  color: black;  
  margin: 0 10px;
  text-decoration: none;
}
.nav__logo{
  height: 50px;
  margin: auto;
}

.nav__link.router-link-exact-active {
  color: black;
}

.v-application a {
  color: black !important;
}
</style>