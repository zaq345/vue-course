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
    task: ""
  },

  methods: {
    itemButtonText(id){
      return this.todoItems[id-1].done ? 'completed' : 'in order';
    },

    addTask(){
      this.todoItems.push({
        id: this.todoItems.length + 1,
        text: this.task,
        done: false
      });
      this.task = "";
    }
  },

  computed: {
    buttonDisabled(){
      return this.task.length == 0
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
      return ((this.comptededTasks / this.todoItems.length) * 100).toFixed(2) + '%'
    }
  }
});


