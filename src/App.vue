<template>
  <div id="app">
    <nav class="nav">
      <router-link class="nav__link" to="/">Home</router-link> |
      <router-link class="nav__link" to="/about">About</router-link> |
      <router-link class="nav__link" to="/taskList">TaskList</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav {
  margin: auto;
  padding: 30px;
  display: flex;
  justify-content: center;

}

.nav__link {
  font-weight: bold;
  color: #2c3e50;  
  margin: 0 10px;
}

.nav__link.router-link-exact-active {
  color: #42b983;
}
</style>
