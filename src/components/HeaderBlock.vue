<template>
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
</template>

<script>


export default {
  name: 'HeaderBlock',

}
</script>

<style scoped>
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