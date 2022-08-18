<template>
  <div class="task">
    <nav class="taskNav">
      <!-- <button v-on:click="randItem">test</button> -->

      <ul class="taskNav__taskList">
        <li class="taskNav__task"
            v-bind:id="item.id"
            v-bind:key="item.id"
            v-for="item in this.taskList"
            v-on:click="anotherTask(item.id)"
        >
          {{item.desc}}
        </li>
      </ul>

    </nav>
    <div class="taskBlock">
      <h1 class="task__header">Task by Id {{ $route.params.id }}</h1>
      <!-- <p class="task__description">{{  }}</p> -->
      <!-- <h6>Title: {{returnTitle}}</h6> -->
      <h6 v-on:click="idlog">id: {{this.taskList[this.id].id}}</h6>
      <h6>title: {{this.taskList[this.id].title}}</h6>
      <h6>desc: {{this.taskList[this.id].desc}}</h6>
      <h6>created: {{this.taskList[this.id].created}}</h6>
      <h6>updated: {{this.taskList[this.id].updated}}</h6>
      <h6>done: {{this.taskList[this.id].done}}</h6>
      <!-- <h6>{{this.taskList[$route.params.id].desc}}</h6> -->
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

  data(){
    return{
      taskList: [],
    }
  },

  props: ['id'],

  async mounted(){
    axios.get('http://localhost:3000/tasks')
    .then(response => {
      this.taskList = response.data
    })
  }, 
  computed: {

  },

  methods: {
    returnFunction(){
      router.push({path: '/taskList'});
    },
    idlog(){
      console.log(this.id)
    },
    anotherTask(id){
      // console.log('some details' + id)
      router.push({path: '/task/'+id});
    },

  }
}
</script>

<style scoped>
.task{
  display: flex;
}
.taskNav{
  display: flex;
  flex-direction: column;
  width: 300px;
  border-right: 1px solid gray;
}
.taskNav__taskList{
  margin: auto;
  padding: 0;
}
.taskNav__task{
  display: flex;
  margin: 0 auto 10px auto;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 10px;
  width: 250px;
}
.taskBlock{
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: auto;
  /* justify-content: left; */
}
.returnButton{
  border: 1px solid grey;
  border-radius: 10px;
  padding: 10px;
}
</style>