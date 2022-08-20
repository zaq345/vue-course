<template>
  <div class="task">
    <nav class="taskNav">
      <ul class="taskNav__taskList">
        <li class="taskNav__task"
            v-bind:id="item.id"
            v-bind:key="item.id"
            v-for="item in this.$store.state.taskList1"
            v-on:click="anotherTask(item.id)"
        >
          {{item.desc}}
        </li>
      </ul>

    </nav>
    <div class="taskBlock">
      <h1 class="task__header">Task by Id {{ $route.params.id }}</h1>
      <h6>id: {{this.$store.state.taskList1[this.id].id}}</h6>
      <h6>title: {{this.$store.state.taskList1[this.id].title}}</h6>
      <h6>desc: {{this.$store.state.taskList1[this.id].desc}}</h6>
      <h6>created: {{this.$store.state.taskList1[this.id].created}}</h6>
      <h6>updated: {{this.$store.state.taskList1[this.id].updated}}</h6>
      <h6>done: {{this.$store.state.taskList1[this.id].done}}</h6>
      <button class="returnButton" v-on:click="returnFunction">Return to TaskList</button>  
    </div>

  </div>
</template>

<script>
import isAuthorised from '@/mixins/isAuthorised.vue';
import router from '@/router';
// import axios from 'axios'


export default{
  name: 'TaskListComponent',

  mixins: [isAuthorised],

  data(){
    return{
      // taskList: [],
    }
  },

  props: ['id'],

  // async mounted(){
  //   axios.get('http://localhost:3000/tasks')
  //   .then(response => {
  //     this.taskList = response.data
  //   })
  // }, 
  computed: {

  },

  methods: {
    returnFunction(){
      router.push({path: '/taskList'});
    },
    anotherTask(id){
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