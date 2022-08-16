<template>
  <div class="task">
    <nav class="taskNav">
      <button v-on:click="randItem">test</button>

    </nav>
    <div class="taskBlock">
      <h1 class="task__header">Task by Id {{ $route.params.id }}</h1>
      <p class="task__description">{{ $route.query.desc }}</p>
      <button class="returnButton" v-on:click="returnFunction">Return to TaskList</button>  
    </div>

  </div>
</template>

<script>
import isAuthorised from '@/mixins/isAuthorised.vue';
import router from '@/router';
import axios from 'axios'


export default{
  name: 'TaskListComponent',

  mixins: [isAuthorised],

  methods: {
    returnFunction(){
      router.push({path: '/taskList'});
    },
    randItem(){
      let num = Math.ceil(Math.random()*1000)

      router.push({path: '/task/'+num, query: { desc: 'Some description of task id ' + num }});

      axios
      // .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .get('http://localhost:3000/tasks')
      .then(response => {
        // console.log(response.data.bpi)
        console.log(response.data[0])
      })
    }
  }
}
</script>

<style scoped>
.task{
  display: flex;
}
.taskNav{
  min-width: 300px;
  border-right: 1px solid gray;
}
.taskBlock{
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: center;
}
.returnButton{
  border: 1px solid grey;
  border-radius: 10px;
  padding: 10px;
}
</style>