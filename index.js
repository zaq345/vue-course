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
    ]
  },

  methods: {
    itemButtonText(id){
      return this.todoItems[id-1].done ? 'completed' : 'in order';
    }
  },

  computed: {

  }
});


