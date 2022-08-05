<template>
  <ul class="taskList">

    <li class="zeroBlock" v-if="zeroBlockVisibility">
      <p class="zeroBlock__text">Please add new task</p>
    </li>
    
    <li class="task" 
          v-bind:id="item.id"
          v-bind:key="item.id" 
          v-for="item in todoSort"
          
    >
      <button class="task__button"
              v-bind:class="{done_true:item.done, done_false:!item.done}"
              v-on:click="buttonDoneChange(item.id)"
      >
        {{itemButtonText(item.id)}}
      </button>
      <p class="task__text">{{item.text}}</p>

      <button class="delete__button" v-on:click="deleteItem(item.id)">
        Удалить
      </button>
    
    </li>

  </ul>
</template>

<script>
export default {
  name: 'TaskList',
  // props: {
  //   list: Array,
  //   picked: Number,
  //   search: String
  // },
  props: ["list", "picked", "search"],
  data() {
      return {
        // todoItems: this.list
      }
  },
  computed: {
    todoSort() {
      let todoListLocal = JSON.parse(localStorage.todoListLocal)

      return todoListLocal.filter(item => ((item.text.indexOf(this.search) !== -1) && ((item.done == false && (this.picked == 1 || this.picked == 3)) || (item.done == true && (this.picked == 1 || this.picked == 2)))))

      // return this.list.filter(item => ((item.text.indexOf(this.search) !== -1) && ((item.done == false && (this.picked == 1 || this.picked == 3)) || (item.done == true && (this.picked == 1 || this.picked == 2)))))
    },

    zeroBlockVisibility(){
      let todoListLocal = JSON.parse(localStorage.todoListLocal)

      return todoListLocal.length == 0
    },
  },

  methods: {
    itemButtonText(id){
      // console.log(id)

      let todoListLocal = JSON.parse(localStorage.todoListLocal)

      return todoListLocal[id-1].done ? 'completed' : 'in order';
    },

    buttonDoneChange(id){
      let todoListLocal = JSON.parse(localStorage.todoListLocal)

      todoListLocal[id-1].done = !todoListLocal[id-1].done

      localStorage.setItem('todoListLocal', JSON.stringify(todoListLocal));

      // this.$forceUpdate();

      // return todoListLocal[id-1].done

      // item.done = !item.done
    },

    deleteItem(id){

      console.log(id)

      // this.todoItems.splice(id-1, 1);


    },

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.taskList{
  list-style: none;
  padding-left: 0;
}

.task{
  position: relative;

  display: flex;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 10px;
  max-width: 750px;
}

.task__button{
  margin-right: 25px;
  border-radius: 10px;
  color: white;
  padding: 10px;
}

.delete__button{
  position: absolute;
  right: 10px;
  border-radius: 10px;
  background-color: white;
  color: red;
  border: 1px solid red;
  padding: 10px;
}

.done_true{
  background-color: green;
}

.done_false{
  background-color: gray;
}

.task__text{
  margin: auto 0;
}

.zeroBlock{
  width: 750px;
  display: flex;
}
.zeroBlock__text{
  margin: auto;
}
</style>
