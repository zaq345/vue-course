<template>
  <div class="task">
    <nav class="taskNav">
      <!-- <button v-on:click="randItem">test</button> -->

      <ul>
        <li class="taskNav__task"
            v-bind:id="item.id"
            v-bind:key="item.id"
            v-for="item in this.taskList"
        >
          {{item.desc}}
        </li>
      </ul>

    </nav>
    <div class="taskBlock">
      <h1 class="task__header">Task by Id {{ $route.params.id }}</h1>
      <!-- <p class="task__description">{{  }}</p> -->
      <!-- <h6>Title: {{returnTitle}}</h6> -->
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

  async mounted(){
    axios.get('http://localhost:3000/tasks')
    .then(response => {
      this.taskList = response.data
    })
  }, 
  computed: {
    // returnTitle(){
    //   // let id = this.$route.query.id;
    //   // return this.taskList[0].title
    //   // return console.log(this.$route.query.id)
    // }
  },

  methods: {
    returnFunction(){
      router.push({path: '/taskList'});
    },
    // returnTitle(id){
    //   // return this.taskList[id].title
    //   console.log(id)
    // }

    // randItem(){
    //   let num = Math.ceil(Math.random()*1000)
    //   router.push({path: '/task/'+num, query: { desc: 'Some description of task id ' + num }});
    //   axios.get('http://localhost:3000/tasks')
    //   .then(response => {
    //     // console.log(response.data.bpi)
    //     console.log(response.data[0])
    //   })
    // }
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
  min-width: 300px;
  border-right: 1px solid gray;
  justify-content: center;
}
.taskNav__task{
  position: relative;

  display: flex;
  margin: 0 auto 10px auto;
  /* margin-bottom: 10px; */
  padding: 10px;
  border: 1px solid gray;
  border-radius: 10px;
  width: 250px;
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