Vue.component('statistics', {
  props: {
    done: Number,
    all: Number,
  },

  computed: {
    percentage(){
      return (this.done / this.all * 100).toFixed()  + '%'
    }
  },

  template: 
  `
    <div class="statisticsBlock">

      <div class="statisticsBlock__item completedTasks">
        Compleded Tasks {{done}}
      </div>

      <div class="statisticsBlock__item allTasks">
        All Tasks {{all}}
      </div>

      <div class="statisticsBlock__item percentageDoneTasks">
        Percent complete tasklist {{percentage}}
      </div>

    </div>
  `
});

Vue.component('tasklist', {
  // props: {
  //   list: Array
  // },
  props: ["list", "picked", "search"],

  computed: {
    todoSort() {
      return this.list.filter(item => item.text.indexOf(this.search) !== -1)
    },
  },

  methods: {
    show(done){

      if (done == false && (this.picked == 1 || this.picked == 3)){
        return true
      }
      if (done == true && (this.picked == 1 || this.picked == 2)){
        return true
      }
    },

    itemButtonText(id){
      return this.list[id-1].done ? 'completed' : 'in order';
    },
  },

  template: 
  `
    <ul class="taskList">

      <li class="zeroBlock" v-if="this.list.length == 0">
        <p class="zeroBlock__text">Please add new task</p>
      </li>
      
      <li class="task" 
            v-bind:id="item.id" 
            v-for="(item) in todoSort"
            v-if="show(item.done)"
      >

        <button class="task__button"
                v-bind:class="{done_true:item.done, done_false:!item.done}"
                v-on:click="item.done = !item.done"

        >
          {{itemButtonText(item.id)}}
        </button>
        <p class="task__text">{{item.text}}</p>
      
      </li>

    </ul>
  `
});


var app = new Vue({ 
  el: '#app',

  data: {
    message: "Hello from Vue App",
    todoItems: [
      {id: 1, text: 'task 1', done: false},
      {id: 2, text: 'task 2', done: false},
      {id: 3, text: 'task 3', done: true},
      {id: 4, text: 'task 4', done: false},
      {id: 5, text: 'task 5', done: false},
    ],
    task: "",
    search: "",
    picked: "1",
  },

  methods: {
    // itemButtonText(id){
    //   return this.todoItems[id-1].done ? 'completed' : 'in order';
    // },

    addTask(){
      this.todoItems.push({
        id: this.todoItems.length + 1,
        text: this.task,
        done: false
      });
      this.task = "";

    },

    // show(done){
    //   if (done == false && (this.picked == 1 || this.picked == 3)){
    //     return true
    //   }
    //   if (done == true && (this.picked == 1 || this.picked == 2)){
    //     return true
    //   }
    // }
  },

  computed: {
    buttonDisabled(){
      // return this.task.length == 0
      return this.task.trim().length == 0
    }, 

    comptededTasks(){
      let count = 0;
      for(let i = 0; i < this.todoItems.length; i++){
        if (this.todoItems[i].done){
          count++;
        }
      }
      return count;
    }, 

    percentageDoneTasks(){
      return (this.comptededTasks / this.todoItems.length).toFixed(2) * 100 + '%'
    },

    ////////////////////////////
    // todoSort() {
    //   return this.todoItems.filter(item => item.text.indexOf(this.search) !== -1)
    // },
  }
});
