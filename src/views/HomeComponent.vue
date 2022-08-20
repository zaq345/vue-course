<template>
  <div class="home">
    <h1>This is a home page</h1>
    <form action="" class="loginForm" v-if="showForm">
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

    <button class="logOut__button btn btn-success" 
            v-else v-on:click="logOutFunction"
    >
      Log Out
    </button>

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
      key: 0
    }
  },
  components: {
  },
  computed: {
    buttonDisabled(){
      return (this.inputLogin.trim().length == 0 || this.inputPassword.trim().length == 0)
    },
    showForm(){
      return localStorage.getItem('isАuthorized') == 0
    }
  },
  methods:{
    loginFunction(){

      if(this.inputLogin && this.inputPassword){
        localStorage.setItem('isАuthorized', '1');
        router.push({path: '/taskList'});
        this.$store.dispatch('getTaskList')
        // setTimeout(() => { console.log(this.$store.state.taskList) }, 100); // работает)))
      }
      this.inputLogin = ""
      this.inputPassword = ""
    },
    logOutFunction(){
      localStorage.setItem('isАuthorized', '0');
      router.go() // не знаю можно ли и правильно ли так делать, но как по другому сделать выход я не знаю пока
    }
  },
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
.logOut__button{
  border: 1px solid grey;
  border-radius: 10px;
  padding: 10px;
}
</style>
