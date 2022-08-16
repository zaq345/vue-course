<template>
  <div class="home">
    <h1>This is a home page</h1>
    <form action="" class="loginForm">
      <input class="loginForm__input" 
              type="text" 
              placeholder="Login"
              v-model="inputLogin">
      <input class="loginForm__input" 
              type="password" 
              name="" 
              id="" 
              placeholder="Password"
              v-model="inputPassword">
      <button type="submit" 
              class="loginForm__button btn btn-success" 
              v-on:click="loginFunction"
              v-bind:disabled="buttonDisabled"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script>

import router from '@/router';

export default {
  name: 'HomeComponent',
  data(){
    return{
      inputLogin: "",
      inputPassword: "",
    }
  },
  components: {
  },
  computed: {
    buttonDisabled(){
      return (this.inputLogin.trim().length == 0 || this.inputPassword.trim().length == 0)
    }
  },
  methods:{
    loginFunction(){

      if(this.inputLogin && this.inputPassword){

        localStorage.setItem('isАuthorized', '1');
        // console.log(localStorage.getItem('isАuthorized'));

        router.push({path: '/taskList'});
      }
      this.inputLogin = ""
      this.inputPassword = ""
    }
  },
  // beforeRouteLeave: (to, from, next) => {
  //   if (to.name == 'taskList') next(false)
  //   else next()
  //   console.log(to.name)
  // },

}
</script>

<style scoped>
.loginForm{
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 300px;
}
.loginForm__input{
  border: 1px solid grey;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
}
.loginForm__button{
  border: 1px solid grey;
  border-radius: 10px;
  padding: 10px;
}
</style>
