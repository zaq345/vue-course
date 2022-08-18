<template>
  <div class="taskList">

    <h1>This is a taskList page</h1>

    <!-- //////////////////////////////// -->
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
    <!-- //////////////////////////////// -->

    <StatisticsBlock v-bind:done="completedTasks" v-bind:all="allTasks"/>

    <input class="inputSearch" type="text" v-model="search" placeholder="Search something ...">

    <div class="selectors">

      <div class="selectors__first">
        <input type="radio" id="one" value="1" name="tasks" v-model="picked">
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


    <ul class="list">

      <li class="zeroBlock" v-if="zeroBlockVisibility">
        <p class="zeroBlock__text">Please add new task</p>
      </li>

      <li class="task"
          v-on:click="detail(item.id)" 
          v-bind:id="item.id"
          v-bind:key="item.id" 
          v-for="item in todoSort">

        <button class="task__button"
                v-bind:class="{done_true:item.done, done_false:!item.done}"
                v-on:click.stop="buttonDoneChange(item.id)"
        >        
          {{itemButtonText(item.id)}}
        </button>
        <p class="task__text">{{item.desc}}</p>

        <button class="delete__button" v-on:click.stop="deleteItem(item.id)">
          Удалить
        </button>

        <!-- /////////////////////// -->
        <!-- Кнопка-триггер модального окна -->
        <button type="button" class="btn btn-primary edit__button" data-bs-toggle="modal" v-bind:data-bs-target="'#exampleModal' + item.id"
                v-on:click.stop="editItemDescription(item.id)">
          Изменить
        </button>

        <!-- Модальное окно -->
        <div class="modal fade" v-bind:id="'exampleModal' + item.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
              v-on:click.stop
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Заголовок модального окна</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
              </div>
              <div class="modal-body editBody">
                <label for="task">Tell us your story:</label>
                <textarea name="task" v-bind:id="item.id + 'edit'" cols="30" rows="4"></textarea>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        
                >
                  Закрыть
                </button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                        v-on:click="changeDescription(item.id)">
                  Сохранить изменения
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- /////////////////////// -->

      </li>


    </ul>

  </div>
</template>

<script>

import isAuthorised from '@/mixins/isAuthorised.vue';

import axios from 'axios'

import StatisticsBlock from '@/components/StatisticsBlock.vue'

import router from '@/router';


export default {
  name: 'TaskListComponent',
  data(){
    return{
      taskList: [],
      task: "",
      search: "",
      picked: 1
    }
  },
  async mounted(){
    axios.get('http://localhost:3000/tasks')
    .then(response => {
      this.taskList = response.data
    })
  }, 
  mixins: [isAuthorised],
  components: {
    StatisticsBlock
  },
  computed: {
    zeroBlockVisibility(){
      return this.taskList.length == 0
    },
    buttonDisabled(){
      return this.task.trim().length == 0
    }, 
    completedTasks(){
      let count = 0;
      for(let i = 0; i < this.taskList.length; i++){
        if (this.taskList[i].done){
          count++;
        }
      }
      return count;
    }, 
    allTasks(){
      return this.taskList.length;
    }, 
    todoSort() {
      return this.taskList.filter(item => ((item.desc.indexOf(this.search) !== -1) && ((item.done == false && (this.picked == 1 || this.picked == 3)) || (item.done == true && (this.picked == 1 || this.picked == 2)))))
    },
  },
  methods:{
    detail(id){
      // console.log('some details')
      router.push({path: '/task/'+id});
    },
    itemButtonText(id){
      return this.taskList[id].done ? 'completed' : 'in order';
    },
    buttonDoneChange(id){
      this.taskList[id].done = !this.taskList[id].done;
      axios.patch('http://localhost:3000/tasks/' + id, {
        done: this.taskList[id].done,  
        updated: new Date(),
      })
      // this.$stopPropagation()
    },
    deleteItem(id){
      //////////////////////////
      // // это нужно точно
      // this.taskList.splice(id-1, 1);
      // for(let i = 0; i < this.taskList.length; i++){
      //   this.taskList[i].id = i+1;
      // }
      //////////////////////////

      if(id == this.taskList.length-1){
        axios.delete(`http://localhost:3000/tasks/${this.taskList.length-1}`)
        this.taskList.splice(id, 1);
      } 
      else{
        this.taskList.splice(id, 1);
        for(let i = 0; i < this.taskList.length; i++){
          this.taskList[i].id = i;
        }

        for(let i = id; i < this.taskList.length; i++){
          axios.patch('http://localhost:3000/tasks/' + i, {
            id: this.taskList[i].id,
            title: this.taskList[i].title,
            desc: this.taskList[i].desc,
            created: this.taskList[i].created,
            updated: this.taskList[i].updated,
            done: this.taskList[i].done
          })
        }

        setTimeout(() => { axios.delete(`http://localhost:3000/tasks/${this.taskList.length}`) }, 500);        
      }

      // axios.post('http://localhost:3000/tasks', this.taskList)
    },
    editItemDescription(id){
      let textarea = document.getElementById(id + "edit")
      textarea.value = this.taskList[id].desc;
    },
    changeDescription(id){
      this.taskList[id].desc = document.getElementById(id + "edit").value;
      axios.patch('http://localhost:3000/tasks/' + id, {
        desc: this.taskList[id].desc,
        updated: new Date(),
      })

      // localStorage.setItem('todoListLocal', JSON.stringify(this.todoItems));
    },
    addTask(){
      this.taskList.push({
        id: this.taskList.length,
        title: "title " + new Date(),
        desc: this.task,
        created: new Date(),
        updated: new Date(),
        done: false
      });  
      
      axios.post(`http://localhost:3000/tasks/` , {
        id: this.taskList.length-1,
        title: "title " + new Date(),
        desc: this.task,
        created: new Date(),
        updated: new Date(),
        done: false
      })
      // axios.post('http://localhost:3000/tasks/' + id, {
      //   done: this.taskList[id].done,  
      // })
      this.task = "";
    },
  },

}
</script>

<style scoped>
.taskList{
  display: flex;
  flex-direction: column;
}
.addingTasks{
  display: flex;
  margin: auto;
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
  margin: auto;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 22px;
  width: 750px;
}

.selectors{
  margin: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.list{
  margin: auto;
  list-style-type: none;
  padding: 0;
}

.task{
  position: relative;

  display: flex;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 10px;
  width: 750px;
}

.task__button{
  margin-right: 25px;
  border-radius: 10px;
  color: white;
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

.delete__button{
  position: absolute;
  right: 10px;
  border-radius: 10px;
  background-color: white;
  color: red;
  border: 1px solid red;
  padding: 10px;
}
.edit__button{
  position: absolute;
  right: 120px;
  border-radius: 10px;
  background-color: white;
  color: blue;
  border: 1px solid blue;
  padding: 10px;
}
</style>

