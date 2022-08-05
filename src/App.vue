<template>
  <div id="app">

    <h2>
      {{message}}
    </h2>

    <div class="addingTasks">

      <input class="addingTasks__input" 
              type="text" 
              placeholder="Add a new task"
              v-model="task"
      >
      <button class="addingTasks__button"
              v-on:click="addTask"
              v-bind:disabled="buttonDisabled"
      >
        Add
      </button>

    </div>

    <StatisticsBlock v-bind:done="completedTasks" v-bind:all="allTasks"/>

    <input class="inputSearch" type="text" v-model="search" placeholder="Search something ...">

    <div class="selectors">

      <div class="selectors__first">
        <input type="radio" id="one" value="1" name="tasks" v-model="picked" checked="true">
        <label for="one">Отображать все задачи</label>          
      </div>

      <div class="selectors__second">
        <input type="radio" id="two" value="2" name="tasks" v-model="picked">
        <label for="two">Отображать выполненные</label>
      </div>

      <div class="selectors__third">
        <input type="radio" id="three" value="3" name="tasks" v-model="picked">
        <label for="three">Отображать невыполненные</label>
      </div>

    </div>

    <TaskList v-bind:list.sync="todoItems" 
              v-bind:picked="picked"
              v-bind:search="search"/>


  </div>
</template>

<script>
import StatisticsBlock from './components/StatisticsBlock.vue'
import TaskList from './components/TaskList.vue'

export default {
  name: 'App',
  components: {
    StatisticsBlock,
    TaskList
},
  data(){ 
    return {
      message: "Hello from Vue App",
      todoItems: [
        // {id: 1, text: 'task 1', done: false},
        // {id: 2, text: 'task 2', done: false},
        // {id: 3, text: 'task 3', done: true},
        // {id: 4, text: 'task 4', done: false},
        // {id: 5, text: 'task 5', done: false},
      ],
      task: "",
      search: "",
      picked: "1",
    }
  },
  computed: {
    completedTasks(){
      let todoListLocal = JSON.parse(localStorage.todoListLocal)
      let count = 0;
      for(let i = 0; i < todoListLocal.length; i++){
        if (todoListLocal[i].done){
          count++;
          console.log(count)
        }
      }
      return count;
    }, 
    allTasks(){
      let todoListLocal = JSON.parse(localStorage.todoListLocal)

      return todoListLocal.length;
    }, 
    buttonDisabled(){
      return this.task.trim().length == 0
    }, 
  },
  methods:{
    addTask(){
      this.todoItems.push({
        id: this.todoItems.length + 1,
        text: this.task,
        done: false
      });

      ////////////////
      let todoListLocal = JSON.parse(localStorage.todoListLocal)

      todoListLocal.push({
        id: todoListLocal.length + 1,
        text: this.task,
        done: false
      });
      
      localStorage.setItem('todoListLocal', JSON.stringify(todoListLocal));
      //////////////

      // localStorage.setItem('todoListLocal', JSON.stringify(this.todoItems));

      this.task = "";
    },
  }
}
</script>

<style>
body{
  padding: 10px;
  margin: 0;
}

.addingTasks{
  display: flex;
  margin-bottom: 10px;
  height: 75px;
  width: 750px;
}

.addingTasks__input{
  border: 1px solid gray;
  border-radius: 10px 0 0 10px;
  width: 650px;
  padding: 10px;
}

.addingTasks__button{
  border: 1px solid gray;
  border-radius: 0 10px 10px 0;
  width: 100px;
  background-color: white;
}

.inputSearch{
  border: 1px solid gray;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 22px;
  width: 704px;
}

.selectors{
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
</style>
